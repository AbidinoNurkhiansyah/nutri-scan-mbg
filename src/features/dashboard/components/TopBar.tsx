import React from "react";
import { navItems } from "../config/navigation";

interface TopBarProps {
  activeNav: string;
  onLogout: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ activeNav, onLogout }) => {
  return (
    <header className="sticky top-0 z-20 bg-surface/80 backdrop-blur-lg border-b border-outline-variant/10 px-4 sm:px-6 py-3 flex items-center gap-3 lg:px-8">
      {/* Brand for mobile */}
      <div className="flex items-center gap-2 lg:hidden">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-sm">
          <span
            className="material-symbols-outlined text-white text-sm"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            biotech
          </span>
        </div>
      </div>
      <div className="flex-1">
        <h2 className="font-headline font-bold text-base text-on-surface capitalize">
          {navItems.find((n) => n.id === activeNav)?.label || "Dashboard"}
        </h2>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onLogout}
          className="w-9 h-9 rounded-lg bg-surface-container-high/50 text-error flex items-center justify-center hover:bg-error-container/20 transition-colors cursor-pointer"
          title="Logout"
        >
          <span className="material-symbols-outlined text-xl">logout</span>
        </button>
      </div>
    </header>
  );
};

export default TopBar;
