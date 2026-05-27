export interface NavItem {
  icon: string;
  label: string;
  id: string;
  path: string;
}

export const navItems: NavItem[] = [
  { icon: "dashboard", label: "Dashboard", id: "dashboard", path: "/dashboard" },
  { icon: "history", label: "Riwayat Scan", id: "history", path: "/history" },
  { icon: "photo_camera", label: "Scan Menu MBG", id: "scan", path: "/scan" },
  { icon: "bar_chart", label: "Statistik", id: "stats", path: "/stats" },
  { icon: "person", label: "Profil", id: "profile", path: "/profile" },
];
