import React, { type ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  isLoading,
  disabled,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`w-full bg-primary text-on-primary py-2.5 px-4 rounded-lg font-headline font-bold text-sm shadow-md hover:bg-surface-tint hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:pointer-events-none cursor-pointer ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {children}
    </button>
  );
};
