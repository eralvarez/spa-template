import type { InputHTMLAttributes } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { FormError } from './FormError';

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  registration: UseFormRegisterReturn;
  error?: string;
};

const baseInputClasses =
  'mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50';

export function FormInput({
  label,
  registration,
  error,
  className,
  ...rest
}: FormInputProps) {
  const inputClassName = className
    ? `${baseInputClasses} ${className}`
    : baseInputClasses;

  return (
    <label className="flex flex-col text-sm">
      <span className="font-medium">{label}</span>
      <div className="flex flex-col gap-1">
        <input className={inputClassName} {...registration} {...rest} />
        <FormError message={error} />
      </div>
    </label>
  );
}
