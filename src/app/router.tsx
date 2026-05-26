import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Activation from "../features/auth/pages/Activation";
import ForgotPassword from "../features/auth/pages/ForgotPassword";
import VerifyOtp from "../features/auth/pages/VerifyOtp";
import ChangePassword from "../features/auth/pages/ChangePassword";
import Dashboard from "../features/dashboard/pages/Dashboard";
import DashboardLayout from "../features/dashboard/layouts/DashboardLayout";
import ScanPage from "../features/scan/pages/ScanPage";
import ScanResultPage from "../features/scan/pages/ScanResultPage";
import HistoryPage from "../features/history/pages/HistoryPage";
import StatsPage from "../features/stats/pages/StatsPage";
import ProfilePage from "../features/profile/pages/ProfilePage";
import { ProtectedRoute } from "../shared/components/ProtectedRoute";
import { GuestRoute } from "../shared/components/GuestRoute";

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Guest Routes — redirect to dashboard if already logged in */}
        <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
        <Route path="/forgot-password" element={<GuestRoute><ForgotPassword /></GuestRoute>} />
        <Route path="/verify-otp" element={<GuestRoute><VerifyOtp /></GuestRoute>} />
        <Route path="/change-password" element={<GuestRoute><ChangePassword /></GuestRoute>} />

        {/* Public Routes — accessible regardless of auth */}
        <Route path="/activation" element={<Activation />} />

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
    </BrowserRouter>
  );
};
