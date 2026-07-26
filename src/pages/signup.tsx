import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthActions } from '@convex-dev/auth/react';
import { useNavigate } from 'router';
import { createSignupSchema, type SignupValues } from 'validations/signup';
import { FormInput } from 'components/form/FormInput';
import { FormError } from 'components/form/FormError';
import { Button } from 'components/Button';
import { useAuthBounce } from 'hooks/useAuthBounce';

export default function SignUp() {
  const { t } = useTranslation();
  const { signIn } = useAuthActions();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({
    resolver: yupResolver(createSignupSchema(t)),
    defaultValues: { name: '', email: '', password: '' },
  });

  useAuthBounce();

  const onSubmit = handleSubmit(async ({ email, name, password }) => {
    setServerError(null);
    try {
      await signIn('password', {
        email,
        password,
        ...(name ? { name } : {}),
        flow: 'signUp',
      });
      navigate('/', { replace: true });
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : t('signup.errors.signUpFailed'),
      );
    }
  });

  return (
    <main className="mx-auto mt-16 max-w-sm px-4">
      <h1 className="mb-6 text-2xl font-semibold">{t('signup.title')}</h1>
      <form className="flex flex-col gap-4" noValidate onSubmit={onSubmit}>
        <FormInput
          label={t('signup.fields.name')}
          type="text"
          autoComplete="name"
          registration={register('name')}
        />
        <FormInput
          label={t('signup.fields.email')}
          type="email"
          autoComplete="email"
          registration={register('email')}
          error={errors.email?.message}
        />
        <FormInput
          label={t('signup.fields.password')}
          type="password"
          autoComplete="new-password"
          registration={register('password')}
          error={errors.password?.message}
        />
        <FormError message={serverError} />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t('signup.submitting') : t('signup.submit')}
        </Button>
      </form>
    </main>
  );
}
