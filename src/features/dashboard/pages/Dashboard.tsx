import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";
import { useAuthStore } from "../../auth/store/authStore";
import DashboardLayout from "../layouts/DashboardLayout";
import LoginAlert from "../components/LoginAlert";
import StatsCards from "../components/StatsCards";
import { useBackButtonGuard } from "../hooks/useBackButtonGuard";
import { useLoginAlert } from "../hooks/useLoginAlert";

const Dashboard: React.FC = () => {
  const { setUser, user } = useAuthStore();
  const [activeNav, setActiveNav] = React.useState("dashboard");

  useBackButtonGuard();
  const { showAlert, dismissAlert } = useLoginAlert();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await api.get("/auth/me");
      return response.data;
    },
    retry: 1,
  });

  React.useEffect(() => {
    if (data?.data) {
      setUser(data.data);
    }
  }, [data, setUser]);

  const profileData = data?.data || user;

  if (isLoading) {
    return (
      <div className="bg-surface min-h-screen flex items-center justify-center">
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

  if (isError) {
    return (
      <div className="bg-surface min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-14 h-14 rounded-full bg-error-container/20 flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-error text-3xl">
              error
            </span>
          </div>
          <h2 className="font-headline text-lg font-bold text-on-surface mb-2">
            Gagal Memuat Profil
          </h2>
          <p className="text-on-surface-variant text-sm mb-6">
            Sesi Anda mungkin sudah berakhir. Silakan login kembali.
          </p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout activeNav={activeNav} onNavChange={setActiveNav}>
      <LoginAlert visible={showAlert} onDismiss={dismissAlert} />

      {/* Welcome Header */}
      <div className="mb-6">
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight mb-1">
          Halo, {profileData?.fullName || "Investigator"} 👋
        </h1>
        <p className="text-on-surface-variant text-sm">
          Selamat datang di dashboard NutriScan MBG
        </p>
      </div>

      <StatsCards />
    </DashboardLayout>
  );
};

export default Dashboard;
