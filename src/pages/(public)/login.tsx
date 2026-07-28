import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthActions } from '@convex-dev/auth/react';
import { Link, useNavigate } from 'router';
import { createLoginSchema, type LoginValues } from 'validations/login';
import { FormInput } from 'components/form/FormInput';
import { FormError } from 'components/form/FormError';
import { Button } from 'components/Button';
import { useAuthBounce } from 'hooks/useAuthBounce';

export default function Login() {
  const { t } = useTranslation();
  const { signIn } = useAuthActions();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: yupResolver(createLoginSchema(t)),
    defaultValues: { email: '', password: '' },
  });

  useAuthBounce();

  const onSubmit = handleSubmit(async ({ email, password }) => {
    setServerError(null);
    try {
      await signIn('password', { email, password, flow: 'signIn' });
      navigate('/', { replace: true });
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : t('login.errors.signInFailed'),
      );
    }
  });

  return (
    <main className="mx-auto mt-16 max-w-sm px-4">
      <h1 className="mb-6 text-2xl font-semibold">{t('login.title')}</h1>
      <form className="flex flex-col gap-4" noValidate onSubmit={onSubmit}>
        <FormInput
          label={t('login.fields.email')}
          type="email"
          autoComplete="email"
          registration={register('email')}
          error={errors.email?.message}
        />
        <FormInput
          label={t('login.fields.password')}
          type="password"
          autoComplete="current-password"
          registration={register('password')}
          error={errors.password?.message}
        />
        <FormError message={serverError} />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t('login.submitting') : t('login.submit')}
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        {t('login.noAccount')}{' '}
        <Link to="/signup" className="text-blue-600 hover:underline">
          {t('login.signUp')}
        </Link>
      </p>
    </main>
  );
}
