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

      <main className="w-full max-w-[480px] relative z-10">
        {/* Brand Context */}
        <div className="flex flex-col items-center text-center mb-5">
          <img
            src="/logo.png"
            alt="NutriScan Logo"
            className="w-14 h-14 mb-3"
          />
          <p className="font-label text-xs uppercase tracking-[0.2em] text-primary mb-1.5 font-semibold">
            NutriScan MBG
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            {title}
          </h1>
          <p className="font-body text-on-surface-variant mt-1.5 text-sm leading-relaxed max-w-[90%] mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Card */}
        <div className="bg-surface-container-lowest rounded-3xl clinical-shadow p-6 sm:p-8 border border-outline-variant/10">
          {children}
        </div>
      </main>
    </div>
  );
};
