import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CHART_COLORS = [
  "#006c49", // primary
  "#10b981", // primary-container
  "#4059aa", // secondary
  "#ff7e2d", // tertiary-container
  "#9d4300", // tertiary
  "#8fa7fe", // secondary-container
  "#4edea3", // inverse-primary
];

const chartOptions = {
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
      callbacks: {
        label: (context: any) => ` ${context.raw}%`,
      },
    },
  },
};

interface NutritionChartProps {
  nutritionData?: Record<string, number> | null;
}

export const NutritionChart: React.FC<NutritionChartProps> = ({
  nutritionData,
}) => {
  const data = nutritionData || {};
  const labels = Object.keys(data);
  const values = Object.values(data);
  const hasData = labels.length > 0;

  if (!hasData) return null;

  const chartData = {
    labels: labels.map((l) => l.charAt(0).toUpperCase() + l.slice(1)),
    datasets: [
      {
        data: values,
        backgroundColor: CHART_COLORS.slice(0, labels.length),
        borderWidth: 0,
        hoverOffset: 6,
      },
    ],
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl clinical-shadow p-5 border border-outline-variant/10 mb-5">
      <h3 className="font-headline font-bold text-sm text-on-surface mb-4">
        Proporsi Nutrisi
      </h3>
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="w-40 h-40 sm:w-36 sm:h-36 shrink-0">
          <Doughnut data={chartData} options={chartOptions} />
        </div>
        <div className="flex-1 w-full space-y-2">
          {labels.map((label, i) => (
            <div
              key={label}
              className="flex items-center gap-3 p-2.5 rounded-xl border border-outline-variant/20 bg-surface-container-low/50"
            >
              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{
                  backgroundColor: CHART_COLORS[i % CHART_COLORS.length],
                }}
              />
              <span className="text-xs text-on-surface-variant flex-1 capitalize font-medium">
                {label}
              </span>
              <span className="text-xs font-bold text-on-surface">
                {values[i]}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
