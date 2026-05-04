import React from "react";

const StatsCards: React.FC = () => {
  const stats = [
    { icon: "restaurant", label: "Total Scan", value: "0", color: "primary" },
    { icon: "check_circle", label: "Seimbang", value: "0", color: "primary" },
    { icon: "warning", label: "Tidak Seimbang", value: "0", color: "tertiary" },
    { icon: "trending_up", label: "Minggu Ini", value: "0", color: "secondary" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-surface-container-lowest rounded-xl clinical-shadow p-4 border border-outline-variant/10"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-8 h-8 rounded-lg bg-${stat.color}-container/20 flex items-center justify-center`}>
              <span
                className={`material-symbols-outlined text-${stat.color} text-base`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {stat.icon}
              </span>
            </div>
          </div>
          <p className="font-display text-2xl font-extrabold text-on-surface">{stat.value}</p>
          <p className="text-xs text-on-surface-variant mt-0.5">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
