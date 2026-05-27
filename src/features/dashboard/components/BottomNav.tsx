import React from "react";
import { navItems } from "../config/navigation";

interface BottomNavProps {
  activeNav: string;
  onNavChange: (id: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeNav, onNavChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-surface-container-lowest/95 backdrop-blur-xl border-t border-outline-variant/10 safe-area-bottom">
      <div className="grid grid-cols-5 items-end px-1 py-1.5">
        {navItems.map((item) => {
          const isActive = activeNav === item.id;
          const isScan = item.id === "scan";

          // Scan button gets a special FAB-like style
          if (isScan) {
            return (
              <button
                key={item.id}
                onClick={() => onNavChange(item.id)}
                className={`flex flex-col items-center justify-self-center -mt-5 cursor-pointer transition-all ${
                  isActive ? "scale-105" : ""
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
                    isActive
                      ? "bg-primary shadow-primary/30"
                      : "bg-primary/90 shadow-primary/20"
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-white text-2xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {item.icon}
                  </span>
                </div>
                <span
                  className={`text-[10px] mt-1 font-semibold transition-colors ${
                    isActive ? "text-primary" : "text-on-surface-variant"
                  }`}
                >
                  Scan
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => onNavChange(item.id)}
              className="flex flex-col items-center justify-self-center py-1 px-2 min-w-[56px] cursor-pointer group transition-all"
            >
              <div
                className={`w-10 h-7 rounded-full flex items-center justify-center mb-0.5 transition-all ${
                  isActive ? "bg-primary/12" : "group-hover:bg-surface-container-high/50"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-xl transition-all ${
                    isActive ? "text-primary" : "text-on-surface-variant"
                  }`}
                  style={{
                    fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                  }}
                >
                  {item.icon}
                </span>
              </div>
              <span
                className={`text-[10px] font-medium transition-colors ${
                  isActive ? "text-primary font-semibold" : "text-on-surface-variant"
                }`}
              >
                {item.id === "history" ? "Riwayat" : item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
