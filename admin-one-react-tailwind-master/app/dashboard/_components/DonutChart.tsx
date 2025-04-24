"use client";

import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type DonutChartProps = {
  label: string;
  value: number;
};

export default function DonutChart({ label, value }: DonutChartProps) {
  const data = {
    labels: [label, "Remaining"],
    datasets: [
      {
        data: [value, 100 - value],
        backgroundColor: ["#8b5cf6", "#e5e7eb"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="w-40 h-40 mx-auto relative">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-violet-600 dark:text-violet-400">
        {value}%
      </div>
    </div>
  );
}
