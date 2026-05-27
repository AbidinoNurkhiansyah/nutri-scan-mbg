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
    <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-5">
      <div className="bg-surface-container-lowest rounded-xl clinical-shadow p-3 sm:p-4 border border-outline-variant/10 text-center flex flex-col items-center justify-center min-w-0">
        <p className="text-[10px] uppercase tracking-wider text-outline font-semibold mb-1 truncate w-full">
          Skor Kesehatan
        </p>
        <p className={`font-display text-3xl sm:text-4xl font-extrabold ${scoreColor}`}>
          {score?.toFixed(0) ?? "-"}
        </p>
        <p className="text-[10px] text-on-surface-variant mt-1">dari 100</p>
      </div>
      <div className="bg-surface-container-lowest rounded-xl clinical-shadow p-3 sm:p-4 border border-outline-variant/10 text-center flex flex-col items-center justify-center min-w-0">
        <p className="text-[10px] uppercase tracking-wider text-outline font-semibold mb-2 truncate w-full">
          Status Nutrisi
        </p>
        <span
          className={`flex flex-col xl:flex-row items-center justify-center gap-1 sm:gap-1.5 w-full sm:w-auto px-1 sm:px-3 py-1.5 rounded-lg sm:rounded-full text-[10px] sm:text-xs font-bold leading-tight ${statusBadge}`}
        >
          <span
            className="material-symbols-outlined text-[14px] sm:text-[16px] shrink-0"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {status?.toLowerCase() === "seimbang" ? "check_circle" : "warning"}
          </span>
          <span className="text-center break-words max-w-full">
            {status || "N/A"}
          </span>
        </span>
      </div>
    </div>
  );
};
