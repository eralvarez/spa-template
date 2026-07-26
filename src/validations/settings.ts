import * as yup from 'yup';
import type { TFunction } from 'i18next';

export const createChangePasswordSchema = (t: TFunction) =>
  yup.object({
    currentPassword: yup
      .string()
      .required(t('settings.changePassword.errors.currentPasswordRequired')),
    newPassword: yup
      .string()
      .required(t('settings.changePassword.errors.newPasswordRequired'))
      .min(8, t('settings.changePassword.errors.newPasswordTooShort')),
    confirmPassword: yup
      .string()
      .required(t('settings.changePassword.errors.confirmPasswordRequired'))
      .oneOf(
        [yup.ref('newPassword')],
        t('settings.changePassword.errors.passwordsDontMatch'),
      ),
  });

export type ChangePasswordValues = yup.InferType<
  ReturnType<typeof createChangePasswordSchema>
>;
