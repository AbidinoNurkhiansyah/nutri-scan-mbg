import { useEffect } from "react";

/**
 * Prevents the browser back button from navigating away from the current page.
 * Pushes an extra history entry and re-pushes on every popstate event.
 */
export function useBackButtonGuard() {
  useEffect(() => {
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.pathname);
    };
    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);
}
