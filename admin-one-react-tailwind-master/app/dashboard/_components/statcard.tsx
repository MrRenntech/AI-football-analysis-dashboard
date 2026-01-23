// app/dashboard/_components/StatCard.tsx

import React from "react";

type Props = {
  label: string;
  value: number | string;
  icon?: React.ReactNode;
};

export default function StatCard({ label, value, icon }: Props) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 flex items-center gap-4">
      {icon && <div className="text-2xl text-primary">{icon}</div>}
      <div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
        <div className="text-xl font-semibold text-gray-900 dark:text-white">{value}</div>
      </div>
    </div>
  );
}
