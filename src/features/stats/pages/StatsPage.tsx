import React from "react";
import { useQuery } from "@tanstack/react-query";
import { historyApi, type HistoryItem } from "../../../services/historyApi";
import { LoadingSpinner } from "../../../shared/components/ui/LoadingSpinner";
import { EmptyState } from "../../../shared/components/ui/EmptyState";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import { calculateStats } from "../utils/statsCalculator";
import { chartOptions, doughnutOptions } from "../utils/chartConfig";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const StatsPage: React.FC = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["histories", { page: 1, limit: 100 }],
    queryFn: () => historyApi.getHistories({ page: 1, limit: 100 }),
  });

  if (isLoading) return <LoadingSpinner text="Memuat statistik..." />;

  if (isError) {
    return (
      <div className="text-center py-12">
        <div className="w-14 h-14 rounded-full bg-error-container/20 flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined text-error text-2xl">
            cloud_off
          </span>
        </div>
        <p className="text-sm text-on-surface-variant">
          Gagal memuat statistik.
        </p>
      </div>
    );
  }

  const histories: HistoryItem[] = data?.data?.histories || [];

  if (histories.length === 0) {
    return (
      <div className="animate-[fadeIn_0.3s_ease-out]">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-extrabold tracking-tight mb-1">
            Statistik
          </h1>
          <p className="text-on-surface-variant text-sm">
            Ringkasan data analisis nutrisi Anda
          </p>
        </div>
        <EmptyState
          icon="bar_chart"
          title="Belum Ada Data"
          description="Lakukan scan makanan terlebih dahulu untuk melihat statistik nutrisi."
          action={
            <button
              onClick={() => navigate("/scan")}
              className="px-5 py-2.5 bg-primary text-on-primary rounded-xl font-headline font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">
                photo_camera
              </span>
              Scan Makanan
            </button>
          }
        />
      </div>
    );
  }

  // ─── Calculate Statistics ─────────────────
  const {
    totalScan,
    balanced,
    unbalanced,
    avgScore,
    scoreDistribution,
    dayLabels,
    dayValues,
  } = calculateStats(histories);

  // ─── Chart Data ─────────────────
  const statusChartData = {
    labels: ["Seimbang", "Tidak Seimbang"],
    datasets: [
      {
        data: [balanced, unbalanced],
        backgroundColor: ["#006c49", "#ff7e2d"],
        borderWidth: 0,
        hoverOffset: 6,
      },
    ],
  };

  const scoreChartData = {
    labels: Object.keys(scoreDistribution),
    datasets: [
      {
        label: "Jumlah Scan",
        data: Object.values(scoreDistribution),
        backgroundColor: [
          "#ba1a1a",
          "#ff7e2d",
          "#4059aa",
          "#10b981",
          "#006c49",
        ],
        borderRadius: 6,
        borderSkipped: false as const,
      },
    ],
  };

  const weeklyChartData = {
    labels: dayLabels,
    datasets: [
      {
        label: "Scan per Hari",
        data: dayValues,
        backgroundColor: "#006c4933",
        borderColor: "#006c49",
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false as const,
      },
    ],
  };

  const avgScoreColor =
    avgScore >= 70
      ? "text-primary"
      : avgScore >= 40
      ? "text-secondary"
      : "text-tertiary";

  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-extrabold tracking-tight mb-1">
          Statistik
        </h1>
        <p className="text-on-surface-variant text-sm">
          Ringkasan data analisis nutrisi dari {totalScan} scan
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-surface-container-lowest rounded-xl clinical-shadow p-4 border border-outline-variant/10 text-center">
          <p className="font-display text-2xl font-extrabold text-on-surface">
            {totalScan}
          </p>
          <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
            Total Scan
          </p>
        </div>
        <div className="bg-surface-container-lowest rounded-xl clinical-shadow p-4 border border-outline-variant/10 text-center">
          <p className={`font-display text-2xl font-extrabold ${avgScoreColor}`}>
            {avgScore.toFixed(0)}
          </p>
          <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
            Rata-rata Skor
          </p>
        </div>
        <div className="bg-surface-container-lowest rounded-xl clinical-shadow p-4 border border-outline-variant/10 text-center">
          <p className="font-display text-2xl font-extrabold text-primary">
            {totalScan > 0 ? ((balanced / totalScan) * 100).toFixed(0) : 0}%
          </p>
          <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
            Seimbang
          </p>
        </div>
      </div>

      {/* Status Distribution */}
      <div className="bg-surface-container-lowest rounded-xl clinical-shadow p-5 border border-outline-variant/10 mb-5">
        <h3 className="font-headline font-bold text-sm text-on-surface mb-4">
          Distribusi Status
        </h3>
        <div className="flex items-center gap-6">
          <div className="w-32 h-32 shrink-0">
            <Doughnut data={statusChartData} options={doughnutOptions} />
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary shrink-0" />
              <span className="text-sm text-on-surface-variant flex-1">
                Seimbang
              </span>
              <span className="text-sm font-bold text-on-surface">
                {balanced}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-tertiary-container shrink-0" />
              <span className="text-sm text-on-surface-variant flex-1">
                Tidak Seimbang
              </span>
              <span className="text-sm font-bold text-on-surface">
                {unbalanced}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Score Distribution */}
      <div className="bg-surface-container-lowest rounded-xl clinical-shadow p-5 border border-outline-variant/10 mb-5">
        <h3 className="font-headline font-bold text-sm text-on-surface mb-4">
          Distribusi Skor Kesehatan
        </h3>
        <div className="h-48">
          <Bar data={scoreChartData} options={chartOptions} />
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="bg-surface-container-lowest rounded-xl clinical-shadow p-5 border border-outline-variant/10 mb-5">
        <h3 className="font-headline font-bold text-sm text-on-surface mb-4">
          Aktivitas 7 Hari Terakhir
        </h3>
        <div className="h-48">
          <Bar data={weeklyChartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
