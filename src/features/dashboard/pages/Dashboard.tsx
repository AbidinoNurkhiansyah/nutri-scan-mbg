import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../auth/store/authStore";
import LoginAlert from "../components/LoginAlert";
import StatsCards from "../components/StatsCards";
import { useBackButtonGuard } from "../hooks/useBackButtonGuard";
import { useLoginAlert } from "../hooks/useLoginAlert";
import { useNavigate } from "react-router-dom";
import { historyApi } from "../../../services/historyApi";

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useBackButtonGuard();
  const { showAlert, dismissAlert } = useLoginAlert();

  // Note: Current user is now fetched globally in DashboardLayout

  // Fetch recent histories for stats & recent scans
  const { data: historiesData } = useQuery({
    queryKey: ["histories", { page: 1, limit: 100 }],
    queryFn: () => historyApi.getHistories({ page: 1, limit: 100 }),
  });

  const profileData = user;
  const histories = historiesData?.data?.histories || [];

  // Calculate real stats
  const totalScan = histories.length;
  const balanced = histories.filter(
    (h) => h.status?.toLowerCase() === "seimbang",
  ).length;
  const unbalanced = histories.filter(
    (h) => h.status?.toLowerCase() !== "seimbang",
  ).length;

  // This week's scans
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const thisWeek = histories.filter(
    (h) => new Date(h.createdAt) >= startOfWeek,
  ).length;

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="material-symbols-outlined text-primary text-2xl">
              person
            </span>
          </div>
          <p className="text-on-surface-variant text-sm">
            Memuat data profil...
          </p>
        </div>
      </div>
    );
  }

  // Recent scans (last 5)
  const recentScans = histories.slice(0, 5);

  return (
    <>
      <LoginAlert visible={showAlert} onDismiss={dismissAlert} />

      {/* Welcome Header */}
      <div className="mb-6">
        <h1 className="font-display text-xl sm:text-2xl font-extrabold tracking-tight mb-1">
          Halo, {profileData?.fullName || "Investigator"} 👋
        </h1>
        <p className="text-on-surface-variant text-sm">
          Selamat datang di dashboard NutriScan MBG
        </p>
      </div>

      <StatsCards
        totalScan={totalScan}
        balanced={balanced}
        unbalanced={unbalanced}
        thisWeek={thisWeek}
      />

      {/* Quick Action */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/scan")}
          className="w-full bg-gradient-to-r from-primary to-primary-container/80 text-white rounded-2xl p-5 flex items-center gap-4 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.99] transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
            <span
              className="material-symbols-outlined text-2xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              photo_camera
            </span>
          </div>
          <div className="text-left flex-1">
            <p className="font-headline font-bold text-base">
              Scan Makanan Sekarang
            </p>
            <p className="text-white/70 text-xs mt-0.5">
              Ambil foto atau upload gambar untuk analisis nutrisi
            </p>
          </div>
          <span className="material-symbols-outlined text-xl text-white/60 group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </button>
      </div>

      {/* Recent Scans */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-headline font-bold text-base text-on-surface">
            Scan Terbaru
          </h2>
          {recentScans.length > 0 && (
            <button
              onClick={() => navigate("/history")}
              className="text-primary text-xs font-semibold hover:underline cursor-pointer"
            >
              Lihat Semua
            </button>
          )}
        </div>

        {recentScans.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-xl clinical-shadow p-6 border border-outline-variant/10 text-center">
            <span className="material-symbols-outlined text-3xl text-outline mb-2 block">
              no_food
            </span>
            <p className="text-sm text-on-surface-variant">
              Belum ada scan. Mulai scan makananmu sekarang!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {recentScans.map((scan) => (
              <button
                key={scan.id}
                onClick={() => navigate(`/history/${scan.id}`)}
                className="w-full bg-surface-container-lowest rounded-xl clinical-shadow p-3 border border-outline-variant/10 flex items-center gap-3 hover:bg-surface-container-low transition-all cursor-pointer group text-left"
              >
                <img
                  src={scan.rawImageUrl}
                  alt="Scan"
                  className="w-12 h-12 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        scan.status?.toLowerCase() === "seimbang"
                          ? "bg-primary-container/20 text-primary"
                          : "bg-tertiary-container/20 text-tertiary"
                      }`}
                    >
                      {scan.status || "N/A"}
                    </span>
                    <span className="text-[10px] text-on-surface-variant">
                      Skor: {scan.healthyScore?.toFixed(0) ?? "-"}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant truncate">
                    {new Date(scan.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <span className="material-symbols-outlined text-lg text-outline group-hover:text-primary transition-colors">
                  chevron_right
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
