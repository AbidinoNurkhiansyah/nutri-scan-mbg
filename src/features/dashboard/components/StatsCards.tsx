import React from "react";

interface StatsCardsProps {
  totalScan: number;
  balanced: number;
  unbalanced: number;
  thisWeek: number;
}

const StatsCards: React.FC<StatsCardsProps> = ({
  totalScan,
  balanced,
  unbalanced,
  thisWeek,
}) => {
  const stats = [
    { icon: "restaurant", label: "Total Scan", value: totalScan, color: "primary" },
    { icon: "check_circle", label: "Seimbang", value: balanced, color: "primary" },
    { icon: "warning", label: "Tidak Seimbang", value: unbalanced, color: "tertiary" },
    { icon: "trending_up", label: "Minggu Ini", value: thisWeek, color: "secondary" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-surface-container-lowest rounded-xl clinical-shadow p-4 border border-outline-variant/10"
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                stat.color === "primary"
                  ? "bg-primary-container/20"
                  : stat.color === "tertiary"
                  ? "bg-tertiary-container/20"
                  : "bg-secondary-container/20"
              }`}
            >
              <span
                className={`material-symbols-outlined text-base ${
                  stat.color === "primary"
                    ? "text-primary"
                    : stat.color === "tertiary"
                    ? "text-tertiary"
                    : "text-secondary"
                }`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {stat.icon}
              </span>
            </div>
          </div>
          <p className="font-display text-2xl font-extrabold text-on-surface">
            {stat.value}
          </p>
          <p className="text-xs text-on-surface-variant mt-0.5">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
