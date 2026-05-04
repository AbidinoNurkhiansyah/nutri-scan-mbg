import React from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import BottomNav from "../components/BottomNav";
import LogoutDialog from "../components/LogoutDialog";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../auth/store/authStore";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeNav: string;
  onNavChange: (id: string) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeNav,
  onNavChange,
}) => {
  const navigate = useNavigate();
  const { clearAuth, user } = useAuthStore();
  const [showLogoutDialog, setShowLogoutDialog] = React.useState(false);

  const handleLogout = () => {
    clearAuth();
    navigate("/login", { replace: true });
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex relative overflow-hidden">
      {/* Background decorations */}
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary-container/10 blur-[140px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-secondary-container/15 blur-[120px] pointer-events-none"></div>

      {/* Sidebar — desktop only */}
      <Sidebar
        activeNav={activeNav}
        onNavChange={onNavChange}
        onLogout={() => setShowLogoutDialog(true)}
        user={user}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen lg:min-w-0">
        <TopBar activeNav={activeNav} />

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-6 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Bottom Navigation — mobile only */}
      <BottomNav activeNav={activeNav} onNavChange={onNavChange} />

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
