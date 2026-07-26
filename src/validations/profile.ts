import * as yup from 'yup';
import type { TFunction } from 'i18next';

export const createProfileSchema = (t: TFunction) =>
  yup.object({
    name: yup.string().required(t('profile.errors.nameRequired')),
  });

export type ProfileValues = yup.InferType<
  ReturnType<typeof createProfileSchema>
>;
