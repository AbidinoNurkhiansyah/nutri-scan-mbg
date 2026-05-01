import React, { forwardRef, useState, type InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: string;
  error?: string;
  rightElement?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon, error, id, rightElement, type, className = "", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordType = type === "password";
    const currentType = isPasswordType ? (showPassword ? "text" : "password") : type;

    return (
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <label
            className="block font-label text-sm font-medium text-on-surface-variant"
            htmlFor={id}
          >
            {label}
          </label>
          {rightElement}
        </div>
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-outline text-lg">
                {icon}
              </span>
            </div>
          )}
          <input
            ref={ref}
            id={id}
            type={currentType}
            className={`block w-full ${
              icon ? "pl-10" : "pl-3"
            } ${isPasswordType ? "pr-10" : "pr-3"} py-2 bg-surface-container-highest border rounded-lg text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/40 focus:border-primary/30 focus:bg-surface-container-lowest transition-all font-body text-sm shadow-sm disabled:opacity-50 ${
              error
                ? "border-error focus:border-error focus:ring-error/40"
                : "border-transparent"
            } ${className}`}
            {...props}
          />
          {isPasswordType && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-on-surface-variant transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              <span className="material-symbols-outlined text-lg">
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          )}
        </div>
        {error && <p className="text-xs text-error mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
