export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#171c1f",
      titleFont: { family: "Manrope", weight: 700 as const },
      bodyFont: { family: "Inter" },
      padding: 10,
      cornerRadius: 10,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        font: { family: "Inter", size: 11 },
        color: "#6c7a71",
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
        font: { family: "Inter", size: 11 },
        color: "#6c7a71",
      },
      grid: { color: "#bbcabf22" },
    },
  },
};

export const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "65%",
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#171c1f",
      titleFont: { family: "Manrope", weight: 700 as const },
      bodyFont: { family: "Inter" },
      padding: 10,
      cornerRadius: 10,
    },
  },
};
