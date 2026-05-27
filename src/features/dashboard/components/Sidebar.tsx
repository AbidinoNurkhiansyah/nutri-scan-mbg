import React from "react";
import { navItems } from "../config/navigation";

interface SidebarProps {
  activeNav: string;
  onNavChange: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeNav,
  onNavChange,
}) => {
  return (
    <aside
      className="hidden lg:flex sticky top-0 left-0 z-40 h-screen w-[260px] bg-surface-container-lowest border-r border-outline-variant/10 flex-col"
    >
      {/* Brand */}
      <div className="px-5 py-5 flex items-center gap-3 border-b border-outline-variant/10">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-md">
          <span
            className="material-symbols-outlined text-white text-lg"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            biotech
          </span>
        </div>
        <div>
          <p className="font-headline font-bold text-sm text-on-surface leading-tight">NutriScan</p>
          <p className="text-[10px] uppercase tracking-[0.15em] text-primary font-semibold">MBG Platform</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="px-3 mb-2 text-[10px] uppercase tracking-[0.2em] text-outline font-semibold">Menu</p>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavChange(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer group ${
              activeNav === item.id
                ? "bg-primary/10 text-primary font-semibold"
                : "text-on-surface-variant hover:bg-surface-container-high/60 hover:text-on-surface"
            }`}
          >
            <span
              className={`material-symbols-outlined text-xl transition-all ${
                activeNav === item.id ? "text-primary" : "text-outline group-hover:text-on-surface-variant"
              }`}
              style={{
                fontVariationSettings: activeNav === item.id ? "'FILL' 1" : "'FILL' 0",
              }}
            >
              {item.icon}
            </span>
            {item.label}
            {activeNav === item.id && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
            )}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
