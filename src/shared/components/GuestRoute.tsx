import React from "react";
import { Navigate } from "react-router-dom";

interface GuestRouteProps {
  children: React.ReactNode;
}

export const GuestRoute: React.FC<GuestRouteProps> = ({ children }) => {
  const authStorage = localStorage.getItem("auth-storage");
  let isAuthenticated = false;

  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage);
      isAuthenticated = !!parsed.state?.accessToken;
    } catch {
      isAuthenticated = false;
    }
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
