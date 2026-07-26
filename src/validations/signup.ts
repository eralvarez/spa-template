import * as yup from 'yup';

export const signupSchema = yup.object({
  name: yup.string().optional(),
  email: yup
    .string()
    .required('Email is required')
    .email('Enter a valid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'At least 8 characters'),
});

export type SignupValues = yup.InferType<typeof signupSchema>;
