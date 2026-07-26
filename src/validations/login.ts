import * as yup from 'yup';
import type { TFunction } from 'i18next';

export const createLoginSchema = (t: TFunction) =>
  yup.object({
    email: yup
      .string()
      .required(t('login.errors.emailRequired'))
      .email(t('login.errors.emailInvalid')),
    password: yup.string().required(t('login.errors.passwordRequired')),
  });

export type LoginValues = yup.InferType<ReturnType<typeof createLoginSchema>>;
