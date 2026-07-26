import * as yup from 'yup';
import type { TFunction } from 'i18next';

export const createSignupSchema = (t: TFunction) =>
  yup.object({
    name: yup.string().optional(),
    email: yup
      .string()
      .required(t('signup.errors.emailRequired'))
      .email(t('signup.errors.emailInvalid')),
    password: yup
      .string()
      .required(t('signup.errors.passwordRequired'))
      .min(8, t('signup.errors.passwordTooShort')),
  });

export type SignupValues = yup.InferType<ReturnType<typeof createSignupSchema>>;
