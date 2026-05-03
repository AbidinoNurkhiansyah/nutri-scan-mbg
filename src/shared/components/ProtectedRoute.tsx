import React from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // We use lazy import to avoid circular deps - check token directly from localStorage
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

  if (!isAuthenticated) {
    // Use window.location for redirect to avoid hook dependency issues
    window.location.href = "/login";
    return null;
  }

  return <>{children}</>;
};
