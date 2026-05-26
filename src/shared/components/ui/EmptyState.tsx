import React from "react";

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-[fadeIn_0.4s_ease-out]">
      <div className="w-16 h-16 rounded-2xl bg-surface-container-high/60 flex items-center justify-center mb-4">
        <span className="material-symbols-outlined text-3xl text-outline">
          {icon}
        </span>
      </div>
      <h3 className="font-headline text-lg font-bold text-on-surface mb-1">
        {title}
      </h3>
      <p className="text-sm text-on-surface-variant max-w-xs mb-5">
        {description}
      </p>
      {action}
    </div>
  );
};
