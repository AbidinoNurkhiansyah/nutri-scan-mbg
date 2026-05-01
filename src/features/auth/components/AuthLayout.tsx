import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <div className="bg-surface text-on-surface selection:bg-primary-container/30 min-h-screen relative flex items-center justify-center py-8 px-4 overflow-x-hidden">
      {/* Abstract Bio-tech background elements - Fixed positioning to prevent scrolling layout issues */}
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary-container/10 blur-[140px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-secondary-container/15 blur-[120px] pointer-events-none"></div>

      <main className="w-full max-w-[420px] relative z-10">
          {/* Brand Context */}
          <div className="flex flex-col items-center text-center mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center mb-2 shadow-md">
              <span
                className="material-symbols-outlined text-white text-xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                biotech
              </span>
            </div>
            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-primary mb-1 font-semibold">
              NutriScan MBG
            </p>
            <h1 className="font-display text-xl sm:text-2xl font-extrabold text-on-surface tracking-tight">
              {title}
            </h1>
            <p className="font-body text-on-surface-variant mt-1 text-xs">
              {subtitle}
            </p>
          </div>

          {/* Card */}
          <div className="bg-surface-container-lowest rounded-2xl clinical-shadow p-5 sm:p-6 border border-outline-variant/10">
            {children}
          </div>

          {/* Trust Indicator */}
          <div className="mt-4 flex items-center justify-center gap-5 opacity-40 grayscale contrast-125">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">
                verified_user
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest">
                AES-256 Encrypted
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">
                security
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest">
                ISO 27001
              </span>
            </div>
          </div>
      </main>
    </div>
  );
};
