import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAction } from 'convex/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { api } from 'convex/_generated/api';
import { FormInput } from 'components/form/FormInput';
import { FormError } from 'components/form/FormError';
import { Button } from 'components/Button';
import {
  createChangePasswordSchema,
  type ChangePasswordValues,
} from 'validations/settings';

export default function Settings() {
  const { t } = useTranslation();
  const changePassword = useAction(api.users.changePassword);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordValues>({
    resolver: yupResolver(createChangePasswordSchema(t)),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = handleSubmit(async ({ currentPassword, newPassword }) => {
    setServerError(null);
    setSuccess(false);
    try {
      await changePassword({ currentPassword, newPassword });
      reset();
      setSuccess(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : '';
      if (message === 'InvalidSecret') {
        setServerError(
          t('settings.changePassword.errors.currentPasswordWrong'),
        );
      } else {
        setServerError(t('settings.changePassword.errors.changeFailed'));
      }
    }
  });

  return (
    <form
      className="flex max-w-sm flex-col gap-4"
      noValidate
      onSubmit={onSubmit}
    >
      <h2 className="text-xl font-semibold text-gray-900">
        {t('settings.changePassword.title')}
      </h2>
      <FormInput
        label={t('settings.changePassword.fields.currentPassword')}
        type="password"
        autoComplete="current-password"
        registration={register('currentPassword')}
        error={errors.currentPassword?.message}
      />
      <FormInput
        label={t('settings.changePassword.fields.newPassword')}
        type="password"
        autoComplete="new-password"
        registration={register('newPassword')}
        error={errors.newPassword?.message}
      />
      <FormInput
        label={t('settings.changePassword.fields.confirmPassword')}
        type="password"
        autoComplete="new-password"
        registration={register('confirmPassword')}
        error={errors.confirmPassword?.message}
      />
      <FormError message={serverError} />
      {success ? (
        <p role="status" className="text-sm text-green-600">
          {t('settings.changePassword.success')}
        </p>
      ) : null}
      <Button type="submit" variant="solid" disabled={isSubmitting}>
        {isSubmitting
          ? t('settings.changePassword.submitting')
          : t('settings.changePassword.submit')}
      </Button>
    </form>
  );
}
