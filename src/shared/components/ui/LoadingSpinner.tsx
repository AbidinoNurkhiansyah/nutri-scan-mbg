import React from "react";

interface LoadingSpinnerProps {
  text?: string;
  size?: "sm" | "md" | "lg";
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  text = "Memuat...",
  size = "md",
}) => {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-3",
    lg: "w-14 h-14 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4 animate-[fadeIn_0.3s_ease-out]">
      <div
        className={`${sizeClasses[size]} border-surface-container-highest border-t-primary rounded-full animate-spin`}
      />
      {text && (
        <p className="text-sm text-on-surface-variant font-medium">{text}</p>
      )}
    </div>
  );
};
