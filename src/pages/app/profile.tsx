import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'convex/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { api } from 'convex/_generated/api';
import type { Id } from 'convex/_generated/dataModel';
import { FormInput } from 'components/form/FormInput';
import { FormError } from 'components/form/FormError';
import { Button } from 'components/Button';
import { useQueryState } from 'hooks/useQueryState';
import { createProfileSchema, type ProfileValues } from 'validations/profile';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function Profile() {
  const { t } = useTranslation();
  const me = useQueryState(api.users.getMe);
  const generateUploadUrl = useMutation(api.users.generateUploadUrl);
  const updateProfile = useMutation(api.users.updateProfile);

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const previewUrlRef = useRef<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileValues>({
    resolver: yupResolver(createProfileSchema(t)),
    defaultValues: { name: '' },
  });

  // Once the user loads, seed the form with their current name.
  useEffect(() => {
    if (me.status === 'success' && me.data) {
      reset({ name: (me.data.name as string | undefined) ?? '' });
    }
  }, [me, reset]);

  // Revoke object URLs when the preview changes / unmounts.
  useEffect(() => {
    previewUrlRef.current = previewUrl;
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    };
  }, [previewUrl]);

  function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    if (!file) {
      setPhotoFile(null);
      setPreviewUrl(null);
      setFileError(null);
      return;
    }
    if (!file.type.startsWith('image/')) {
      setPhotoFile(null);
      setPreviewUrl(null);
      setFileError(t('profile.errors.invalidType'));
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setPhotoFile(null);
      setPreviewUrl(null);
      setFileError(t('profile.errors.tooLarge'));
      return;
    }
    setPhotoFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setFileError(null);
  }

  const onSubmit = handleSubmit(async ({ name }) => {
    setServerError(null);
    try {
      let storageId: Id<'_storage'> | undefined;
      if (photoFile) {
        const uploadUrl = await generateUploadUrl();
        const result = await fetch(uploadUrl, {
          method: 'POST',
          headers: { 'Content-Type': photoFile.type },
          body: photoFile,
        });
        if (!result.ok) throw new Error('upload-failed');
        const json = (await result.json()) as { storageId: Id<'_storage'> };
        storageId = json.storageId;
      }
      await updateProfile({
        name,
        ...(storageId ? { storageId } : {}),
      });
      setPhotoFile(null);
      setPreviewUrl(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : '';
      if (message === 'upload-failed') {
        setServerError(t('profile.errors.uploadFailed'));
      } else {
        setServerError(t('profile.errors.saveFailed'));
      }
    }
  });

  if (me.status === 'loading') {
    return (
      <div>
        <p>{t('app.loading')}</p>
      </div>
    );
  }

  if (me.status === 'error') {
    return <FormError message={me.error.message} />;
  }

  const currentPhoto = me.data?.image as string | undefined;
  const displayUrl = previewUrl ?? currentPhoto;

  return (
    <form className="flex flex-col gap-4" noValidate onSubmit={onSubmit}>
      <div className="flex items-center gap-4">
        {displayUrl ? (
          <img
            alt={t('profile.currentPhoto')}
            src={displayUrl}
            className="size-24 rounded-full object-cover"
          />
        ) : (
          <div
            aria-hidden
            className="size-24 rounded-full bg-gray-300"
            title={t('profile.noPhoto')}
          />
        )}
        <div className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-gray-700">
            {photoFile ? t('profile.newPhoto') : t('profile.currentPhoto')}
          </span>
          <label className="cursor-pointer rounded border border-gray-300 px-3 py-1.5 hover:bg-gray-50">
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="hidden"
            />
            {t('profile.fields.photo')}
          </label>
          {fileError ? (
            <p role="alert" className="text-sm text-red-500">
              {fileError}
            </p>
          ) : null}
        </div>
      </div>

      <FormInput
        label={t('profile.fields.name')}
        type="text"
        autoComplete="name"
        registration={register('name')}
        error={errors.name?.message}
      />

      <FormError message={serverError} />

      <Button
        type="submit"
        variant="solid"
        disabled={isSubmitting || (!isDirty && !photoFile)}
      >
        {isSubmitting ? t('profile.submitting') : t('profile.submit')}
      </Button>
    </form>
  );
}
