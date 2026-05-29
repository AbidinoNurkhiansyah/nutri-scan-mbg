import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoadingSpinner } from "../shared/components/ui/LoadingSpinner";

// Lazy Loaded Pages
const Login = React.lazy(() => import("../features/auth/pages/Login"));
const Register = React.lazy(() => import("../features/auth/pages/Register"));
const Activation = React.lazy(() => import("../features/auth/pages/Activation"));
const ForgotPassword = React.lazy(() => import("../features/auth/pages/ForgotPassword"));
const VerifyOtp = React.lazy(() => import("../features/auth/pages/VerifyOtp"));
const ChangePassword = React.lazy(() => import("../features/auth/pages/ChangePassword"));
const SetupProfilePage = React.lazy(() => import("../features/auth/pages/SetupProfilePage"));
const Dashboard = React.lazy(() => import("../features/dashboard/pages/Dashboard"));
const DashboardLayout = React.lazy(() => import("../features/dashboard/layouts/DashboardLayout"));
const ScanPage = React.lazy(() => import("../features/scan/pages/ScanPage"));
const ScanResultPage = React.lazy(() => import("../features/scan/pages/ScanResultPage"));
const HistoryPage = React.lazy(() => import("../features/history/pages/HistoryPage"));
const StatsPage = React.lazy(() => import("../features/stats/pages/StatsPage"));
const ProfilePage = React.lazy(() => import("../features/profile/pages/ProfilePage"));
import { ProtectedRoute } from "../shared/components/ProtectedRoute";
import { GuestRoute } from "../shared/components/GuestRoute";

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<LoadingSpinner text="Memuat Halaman..." />}>
        <Routes>
          {/* Guest Routes — redirect to dashboard if already logged in */}
          <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
          <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
          <Route path="/forgot-password" element={<GuestRoute><ForgotPassword /></GuestRoute>} />
          <Route path="/verify-otp" element={<GuestRoute><VerifyOtp /></GuestRoute>} />
          <Route path="/change-password" element={<GuestRoute><ChangePassword /></GuestRoute>} />

          {/* Public Routes — accessible regardless of auth */}
          <Route path="/activation" element={<Activation />} />

          {/* Protected Routes — Standalone */}
          <Route path="/setup-profile" element={<ProtectedRoute><SetupProfilePage /></ProtectedRoute>} />

          {/* Protected Routes — nested under DashboardLayout */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/scan" element={<ScanPage />} />
            <Route path="/scan/result/:id" element={<ScanResultPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/history/:id" element={<ScanResultPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* Default Redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};
