import React from "react";

interface LoginAlertProps {
  visible: boolean;
  onDismiss: () => void;
}

const LoginAlert: React.FC<LoginAlertProps> = ({ visible, onDismiss }) => {
  if (!visible) return null;

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-4 animate-[slideDown_0.3s_ease-out]">
      <div className="flex items-center gap-3 bg-primary-container/15 border border-primary/20 rounded-xl px-4 py-3">
        <span
          className="material-symbols-outlined text-primary text-xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          check_circle
        </span>
        <p className="text-sm font-medium text-primary flex-1">
          Login berhasil! Selamat datang kembali.
        </p>
        <button
          onClick={onDismiss}
          className="text-primary/60 hover:text-primary transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>
    </div>
  );
};

export default LoginAlert;
