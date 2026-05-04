import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Shows a dismissible login success alert when navigated with { state: { loginSuccess: true } }.
 * Auto-dismisses after the specified duration.
 */
export function useLoginAlert(duration = 4000) {
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if ((location.state as any)?.loginSuccess) {
      setShowAlert(true);
      window.history.replaceState({}, "");
      const timer = setTimeout(() => setShowAlert(false), duration);
      return () => clearTimeout(timer);
    }
  }, [location.state, duration]);

  return { showAlert, dismissAlert: () => setShowAlert(false) };
}
