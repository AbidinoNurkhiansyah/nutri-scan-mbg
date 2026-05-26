import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useHistoryDetail } from "../../history/hooks/useHistories";
import { LoadingSpinner } from "../../../shared/components/ui/LoadingSpinner";
import { NutritionChart } from "../components/NutritionChart";
import { ImageComparison } from "../components/ImageComparison";
import { ScoreStatus } from "../components/ScoreStatus";

const ScanResultPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useHistoryDetail(id);

  if (isLoading) {
    return <LoadingSpinner text="Memuat hasil scan..." />;
  }

  if (isError || !data?.data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 animate-[fadeIn_0.3s_ease-out]">
        <div className="w-14 h-14 rounded-full bg-error-container/20 flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-error text-3xl">
            error
          </span>
        </div>
        <h2 className="font-headline text-lg font-bold text-on-surface mb-2">
          Data Tidak Ditemukan
        </h2>
        <p className="text-sm text-on-surface-variant mb-4">
          Hasil scan tidak dapat dimuat.
        </p>
        <button
          onClick={() => navigate("/history")}
          className="px-5 py-2.5 bg-primary text-on-primary rounded-xl font-semibold text-sm cursor-pointer hover:bg-primary/90 transition-colors"
        >
          Kembali ke Riwayat
        </button>
      </div>
    );
  }

  const history = data.data;

  return (
    <div className="animate-[scaleIn_0.3s_ease-out]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-lg bg-surface-container-high/50 flex items-center justify-center hover:bg-surface-container-highest transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-on-surface-variant text-xl">
            arrow_back
          </span>
        </button>
        <div>
          <h1 className="font-display text-xl font-extrabold tracking-tight">
            Hasil Analisis
          </h1>
          <p className="text-xs text-on-surface-variant">
            {new Date(history.createdAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>

      <ImageComparison
        rawImageUrl={history.rawImageUrl}
        augmentationImageUrl={history.augmentationImageUrl}
      />

      <ScoreStatus score={history.healthyScore} status={history.status} />

      <NutritionChart nutritionData={history.nutritionProportion} />

      {/* Detail */}
      {history.detail && (
        <div className="bg-surface-container-lowest rounded-xl clinical-shadow p-5 border border-outline-variant/10 mb-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-primary text-lg">
              description
            </span>
            <h3 className="font-headline font-bold text-sm text-on-surface">
              Detail Analisis
            </h3>
          </div>
          <p className="text-sm text-on-surface-variant leading-relaxed whitespace-pre-line">
            {history.detail}
          </p>
        </div>
      )}

      {/* Recommendation */}
      {history.recommendation && (
        <div className="bg-primary-container/10 rounded-xl p-5 border border-primary/15 mb-5">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="material-symbols-outlined text-primary text-lg"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              tips_and_updates
            </span>
            <h3 className="font-headline font-bold text-sm text-primary">
              Rekomendasi AI
            </h3>
          </div>
          <p className="text-sm text-on-surface leading-relaxed whitespace-pre-line">
            {history.recommendation}
          </p>
        </div>
      )}

      {/* Action */}
      <div className="flex gap-3 pb-4">
        <button
          onClick={() => navigate("/history")}
          className="flex-1 py-3 rounded-xl border border-outline-variant/20 font-headline font-bold text-sm text-on-surface hover:bg-surface-container-high transition-all cursor-pointer"
        >
          Lihat Riwayat
        </button>
        <button
          onClick={() => navigate("/scan")}
          className="flex-1 py-3 rounded-xl bg-primary text-on-primary font-headline font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">
            photo_camera
          </span>
          Scan Lagi
        </button>
      </div>
    </div>
  );
};

export default ScanResultPage;

