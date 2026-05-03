import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../../services/api";
import { useAuthStore } from "../../auth/store/authStore";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearAuth, setUser, user } = useAuthStore();
  const [showAlert, setShowAlert] = React.useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = React.useState(false);

  // Show login success alert
  React.useEffect(() => {
    if ((location.state as any)?.loginSuccess) {
      setShowAlert(true);
      // Clear the state so alert doesn't re-show on refresh
      window.history.replaceState({}, "");
      const timer = setTimeout(() => setShowAlert(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await api.get("/auth/me");
      return response.data;
    },
    retry: 1,
  });

  // Store user data when fetched
  React.useEffect(() => {
    if (data?.data) {
      setUser(data.data);
    }
  }, [data, setUser]);

  const handleLogout = () => {
    clearAuth();
    navigate("/login", { replace: true });
  };

  const confirmLogout = () => {
    setShowLogoutDialog(true);
  };

  const profileData = data?.data || user;

  if (isLoading) {
    return (
      <div className="bg-surface min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="material-symbols-outlined text-primary text-2xl">person</span>
          </div>
          <p className="text-on-surface-variant text-sm">Memuat data profil...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-surface min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-14 h-14 rounded-full bg-error-container/20 flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-error text-3xl">error</span>
          </div>
          <h2 className="font-headline text-lg font-bold text-on-surface mb-2">
            Gagal Memuat Profil
          </h2>
          <p className="text-on-surface-variant text-sm mb-6">
            Sesi Anda mungkin sudah berakhir. Silakan login kembali.
          </p>
          <button
            onClick={handleLogout}
            className="bg-primary text-on-primary py-2.5 px-6 rounded-lg font-headline font-bold text-sm shadow-md hover:bg-surface-tint transition-all cursor-pointer"
          >
            Login Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen relative overflow-x-hidden">
      {/* Background decorations */}
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary-container/10 blur-[140px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-secondary-container/15 blur-[120px] pointer-events-none"></div>

      {/* Top Navigation */}
      <nav className="sticky top-0 z-20 bg-surface/80 backdrop-blur-lg border-b border-outline-variant/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-sm">
              <span
                className="material-symbols-outlined text-white text-base"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                biotech
              </span>
            </div>
            <span className="font-headline font-bold text-sm text-on-surface">
              NutriScan MBG
            </span>
          </div>
          <button
            onClick={confirmLogout}
            className="flex items-center gap-1.5 text-on-surface-variant hover:text-error text-sm font-medium transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </nav>

      {/* Login Success Alert */}
      {showAlert && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-4 animate-[slideDown_0.3s_ease-out]">
          <div className="flex items-center gap-3 bg-primary-container/15 border border-primary/20 rounded-xl px-4 py-3">
            <span
              className="material-symbols-outlined text-primary text-xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
            <p className="text-sm font-medium text-primary flex-1">
              Login berhasil! Selamat datang kembali.
            </p>
            <button
              onClick={() => setShowAlert(false)}
              className="text-primary/60 hover:text-primary transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 relative z-10">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight mb-1">
            Halo, {profileData?.fullName || "Investigator"} 👋
          </h1>
          <p className="text-on-surface-variant text-sm">
            Selamat datang di dashboard NutriScan MBG
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-surface-container-lowest rounded-2xl clinical-shadow p-6 border border-outline-variant/10 mb-6">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-md">
              <span
                className="material-symbols-outlined text-white text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                person
              </span>
            </div>
            <div>
              <h2 className="font-headline text-lg font-bold">{profileData?.fullName}</h2>
              <p className="text-on-surface-variant text-sm">{profileData?.email}</p>
            </div>
            <div className="ml-auto">
              <span
                className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
                  profileData?.isActive
                    ? "bg-primary-container/20 text-primary"
                    : "bg-error-container/20 text-error"
                }`}
              >
                <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {profileData?.isActive ? "verified" : "cancel"}
                </span>
                {profileData?.isActive ? "Aktif" : "Nonaktif"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-surface-container-high/50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-primary text-base">school</span>
                <span className="text-xs font-label font-medium text-on-surface-variant uppercase tracking-wider">
                  Sekolah
                </span>
              </div>
              <p className="font-body text-sm font-semibold text-on-surface">
                {profileData?.schoolName || "Belum diisi"}
              </p>
            </div>
            <div className="bg-surface-container-high/50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-primary text-base">groups</span>
                <span className="text-xs font-label font-medium text-on-surface-variant uppercase tracking-wider">
                  Kelas
                </span>
              </div>
              <p className="font-body text-sm font-semibold text-on-surface">
                {profileData?.className || "Belum diisi"}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: "photo_camera", label: "Scan Makanan", color: "primary" },
            { icon: "history", label: "Riwayat Scan", color: "secondary" },
            { icon: "bar_chart", label: "Statistik", color: "tertiary" },
            { icon: "settings", label: "Pengaturan", color: "primary" },
          ].map((action) => (
            <button
              key={action.label}
              className="bg-surface-container-lowest rounded-xl clinical-shadow p-4 border border-outline-variant/10 hover:shadow-lg hover:-translate-y-0.5 transition-all text-center group cursor-pointer"
            >
              <div
                className={`w-10 h-10 rounded-lg bg-${action.color}-container/20 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}
              >
                <span
                  className={`material-symbols-outlined text-${action.color} text-xl`}
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {action.icon}
                </span>
              </div>
              <span className="text-xs font-label font-semibold text-on-surface">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </main>

      {/* Logout Confirm Dialog */}
      {showLogoutDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm animate-[fadeIn_0.15s_ease-out]"
            onClick={() => setShowLogoutDialog(false)}
          ></div>

          {/* Dialog */}
          <div className="relative bg-surface-container-lowest rounded-2xl clinical-shadow p-6 w-full max-w-sm border border-outline-variant/10 animate-[slideDown_0.2s_ease-out]">
            <div className="text-center mb-5">
              <div className="w-12 h-12 rounded-full bg-error-container/20 flex items-center justify-center mx-auto mb-3">
                <span
                  className="material-symbols-outlined text-error text-2xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  logout
                </span>
              </div>
              <h3 className="font-headline text-lg font-bold text-on-surface mb-1">
                Konfirmasi Logout
              </h3>
              <p className="text-sm text-on-surface-variant">
                Apakah Anda yakin ingin keluar dari akun ini?
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutDialog(false)}
                className="flex-1 py-2.5 px-4 rounded-lg border border-outline-variant/20 text-on-surface font-headline font-bold text-sm hover:bg-surface-container-high transition-all cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-2.5 px-4 rounded-lg bg-error text-on-error font-headline font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer"
              >
                Ya, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
