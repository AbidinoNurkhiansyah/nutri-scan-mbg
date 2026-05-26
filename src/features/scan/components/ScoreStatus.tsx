import React from "react";

interface ScoreStatusProps {
  score?: number;
  status?: string;
}

export const ScoreStatus: React.FC<ScoreStatusProps> = ({ score, status }) => {
  const scoreColor =
    (score ?? 0) >= 70
      ? "text-primary"
      : (score ?? 0) >= 40
      ? "text-secondary"
      : "text-tertiary";

  const statusBadge =
    status?.toLowerCase() === "seimbang"
      ? "bg-primary-container/20 text-primary"
      : "bg-tertiary-container/20 text-tertiary";

  return (
    <div className="grid grid-cols-2 gap-3 mb-5">
      <div className="bg-surface-container-lowest rounded-xl clinical-shadow p-4 border border-outline-variant/10 text-center">
        <p className="text-[10px] uppercase tracking-wider text-outline font-semibold mb-1">
          Skor Kesehatan
        </p>
        <p className={`font-display text-4xl font-extrabold ${scoreColor}`}>
          {score?.toFixed(0) ?? "-"}
        </p>
        <p className="text-[10px] text-on-surface-variant">dari 100</p>
      </div>
      <div className="bg-surface-container-lowest rounded-xl clinical-shadow p-4 border border-outline-variant/10 text-center flex flex-col items-center justify-center">
        <p className="text-[10px] uppercase tracking-wider text-outline font-semibold mb-2">
          Status Nutrisi
        </p>
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${statusBadge}`}
        >
          <span
            className="material-symbols-outlined text-sm"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {status?.toLowerCase() === "seimbang" ? "check_circle" : "warning"}
          </span>
          {status || "N/A"}
        </span>
      </div>
    </div>
  );
};
