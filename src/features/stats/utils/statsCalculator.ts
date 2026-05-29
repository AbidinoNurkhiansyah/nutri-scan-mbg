import type { HistoryItem } from "../../../services/historyApi";

export const calculateStats = (histories: HistoryItem[]) => {
  const totalScan = histories.length;
  const balanced = histories.filter(
    (h) => h.status?.toLowerCase() === "seimbang"
  ).length;
  const lessBalanced = histories.filter(
    (h) => h.status?.toLowerCase() === "kurang_seimbang"
  ).length;
  const unbalanced = histories.filter(
    (h) => h.status?.toLowerCase() === "tidak_seimbang"
  ).length;

  const avgScore =
    totalScan > 0
      ? histories.reduce((sum, h) => sum + (h.healthyScore ?? 0), 0) / totalScan
      : 0;

  // Score distribution
  const scoreDistribution = {
    "0-20": histories.filter(
      (h) => (h.healthyScore ?? 0) >= 0 && (h.healthyScore ?? 0) < 20
    ).length,
    "20-40": histories.filter(
      (h) => (h.healthyScore ?? 0) >= 20 && (h.healthyScore ?? 0) < 40
    ).length,
    "40-60": histories.filter(
      (h) => (h.healthyScore ?? 0) >= 40 && (h.healthyScore ?? 0) < 60
    ).length,
    "60-80": histories.filter(
      (h) => (h.healthyScore ?? 0) >= 60 && (h.healthyScore ?? 0) < 80
    ).length,
    "80-100": histories.filter(
      (h) => (h.healthyScore ?? 0) >= 80 && (h.healthyScore ?? 0) <= 100
    ).length,
  };

  // Weekly scans (last 7 days)
  const now = new Date();
  const dayLabels: string[] = [];
  const dayValues: number[] = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    const dayStr = date.toLocaleDateString("id-ID", { weekday: "short" });
    dayLabels.push(dayStr);
    const count = histories.filter((h) => {
      const hDate = new Date(h.createdAt);
      return hDate.toDateString() === date.toDateString();
    }).length;
    dayValues.push(count);
  }

  return {
    totalScan,
    balanced,
    lessBalanced,
    unbalanced,
    avgScore,
    scoreDistribution,
    dayLabels,
    dayValues,
  };
};
