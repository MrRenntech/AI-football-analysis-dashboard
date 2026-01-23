"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadarController,
  RadialLinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Radar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadarController,
  RadialLinearScale,
  Tooltip,
  Legend
);

type Props = {
  type: "bar" | "line" | "radar";
  data: any;
  options?: any;
};

export default function ChartBox({ type, data, options }: Props) {
  const chartMap = {
    bar: <Bar data={data} options={options} />,
    line: <Line data={data} options={options} />,
    radar: <Radar data={data} options={options} />,
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-md hover:shadow-lg transition">
      {chartMap[type]}
    </div>
  );
}
