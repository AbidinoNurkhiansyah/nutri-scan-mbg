import React from "react";

export const ScanTips: React.FC = () => {
  return (
    <div className="mt-6 space-y-2">
      <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
        Tips Scan Terbaik
      </p>
      {[
        {
          icon: "light_mode",
          text: "Pastikan pencahayaan cukup terang",
        },
        {
          icon: "center_focus_strong",
          text: "Ambil foto dari atas makanan (bird's eye view)",
        },
        {
          icon: "crop_free",
          text: "Pastikan seluruh makanan terlihat dalam frame",
        },
      ].map((tip) => (
        <div
          key={tip.icon}
          className="flex items-center gap-3 py-2 px-3 rounded-lg bg-surface-container-low/50"
        >
          <span className="material-symbols-outlined text-primary text-lg">
            {tip.icon}
          </span>
          <p className="text-xs text-on-surface-variant">{tip.text}</p>
        </div>
      ))}
    </div>
  );
};
