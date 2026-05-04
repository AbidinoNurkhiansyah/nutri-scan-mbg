export interface NavItem {
  icon: string;
  label: string;
  id: string;
}

export const navItems: NavItem[] = [
  { icon: "dashboard", label: "Dashboard", id: "dashboard" },
  { icon: "history", label: "Riwayat Scan", id: "history" },
  { icon: "photo_camera", label: "Scan Makanan", id: "scan" },
  { icon: "bar_chart", label: "Statistik", id: "stats" },
  { icon: "person", label: "Profil", id: "profile" },
];
