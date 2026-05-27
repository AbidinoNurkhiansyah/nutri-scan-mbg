import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import BottomNav from "../components/BottomNav";
import LogoutDialog from "../components/LogoutDialog";
import { useAuthStore } from "../../auth/store/authStore";
import { navItems } from "../config/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";

const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearAuth, setUser } = useAuthStore();
  const [showLogoutDialog, setShowLogoutDialog] = React.useState(false);

  // Fetch current user globally for the dashboard
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await api.get("/auth/me");
      return response.data;
    },
  });

  React.useEffect(() => {
    if (isSuccess && data?.data) {
      const serverUser = data.data;
      // Gunakan local state sebagai fallback jika backend lambat mensinkronisasi data setelah PUT
      const localUser = useAuthStore.getState().user;
      const schoolName = serverUser.schoolName || localUser?.schoolName;
      const className = serverUser.className || localUser?.className;

      setUser({
        ...serverUser,
        schoolName,
        className,
      });

      // Check if profile is complete (needs school data)
      if (!schoolName || !className) {
        navigate("/setup-profile", { replace: true });
      }
    }
  }, [isSuccess, data, navigate, setUser]);

  // Detect active nav from current pathname
  const activeNav =
    navItems.find((item) => location.pathname.startsWith(item.path))?.id ||
    "dashboard";

  const handleNavChange = (id: string) => {
    const item = navItems.find((n) => n.id === id);
    if (item) {
      navigate(item.path);
    }
  };

  const handleLogout = () => {
    clearAuth();
    navigate("/login", { replace: true });
  };

  const serverUser = data?.data;
  const localUser = useAuthStore.getState().user;
  const isProfileComplete =
    (serverUser?.schoolName || localUser?.schoolName) &&
    (serverUser?.className || localUser?.className);

  if (isLoading || (isSuccess && !isProfileComplete)) {
    return (
      <div className="bg-surface text-on-surface h-screen flex relative overflow-hidden items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="material-symbols-outlined text-primary text-2xl">
              person
            </span>
          </div>
          <p className="text-on-surface-variant text-sm">Memuat profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface text-on-surface h-screen flex relative overflow-hidden">
      {/* Background decorations */}
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary-container/10 blur-[140px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-secondary-container/15 blur-[120px] pointer-events-none"></div>

      {/* Sidebar — desktop only */}
      <Sidebar activeNav={activeNav} onNavChange={handleNavChange} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen min-w-0">
        <TopBar
          activeNav={activeNav}
          onLogout={() => setShowLogoutDialog(true)}
        />

        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-6 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      {/* Bottom Navigation — mobile only */}
      <BottomNav activeNav={activeNav} onNavChange={handleNavChange} />

      {/* Logout Dialog */}
      <LogoutDialog
        isOpen={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default DashboardLayout;
