import React from "react";

interface LogoutConfirmDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const LogoutConfirmDialog: React.FC<LogoutConfirmDialogProps> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm animate-[fadeIn_0.15s_ease-out]"
        onClick={onCancel}
      />
      <div className="relative bg-surface-container-lowest rounded-2xl clinical-shadow p-6 w-full max-w-sm border border-outline-variant/10 animate-[slideDown_0.2s_ease-out]">
        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-full bg-error-container/20 flex items-center justify-center mx-auto mb-3">
            <span
              className="material-symbols-outlined text-error text-2xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              logout
            </span>
          </div>
          <h3 className="font-headline text-lg font-bold text-on-surface mb-1">
            Konfirmasi Logout
          </h3>
          <p className="text-sm text-on-surface-variant">
            Apakah Anda yakin ingin keluar?
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 px-4 rounded-lg border border-outline-variant/20 text-on-surface font-headline font-bold text-sm hover:bg-surface-container-high transition-all cursor-pointer"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 px-4 rounded-lg bg-error text-on-error font-headline font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer"
          >
            Ya, Logout
          </button>
        </div>
      </div>
    </div>
  );
};
