import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Activation from "../features/auth/pages/Activation";
import ForgotPassword from "../features/auth/pages/ForgotPassword";
import VerifyOtp from "../features/auth/pages/VerifyOtp";
import ChangePassword from "../features/auth/pages/ChangePassword";
import Dashboard from "../features/dashboard/pages/Dashboard";
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

        {/* Protected Routes — redirect to login if not logged in */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
