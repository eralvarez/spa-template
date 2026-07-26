import type { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'solid' | 'outlined' | 'text';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  solid:
    'cursor-pointer rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-60',
  outlined:
    'cursor-pointer rounded border border-blue-600 px-3 py-2 text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-60',
  text: 'cursor-pointer rounded px-3 py-2 text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-60',
};

export function Button({
  variant = 'solid',
  type = 'button',
  className,
  ...rest
}: ButtonProps) {
  const baseClasses = variantClasses[variant];
  const finalClassName = className
    ? `${baseClasses} ${className}`
    : baseClasses;
  return <button type={type} className={finalClassName} {...rest} />;
}
