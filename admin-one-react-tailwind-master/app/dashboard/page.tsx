// app/dashboard/page.tsx
'use client';

import React from "react";
import Image from "next/image";
import { matchData } from "./sampleData";
import StatCard from "./_components/statcard";
import DonutChart from "./_components/DonutChart";

// Define TypeScript interfaces for players and match data
interface Player {
  id: number;
  name: string;
  team: string;
  goals: number;
  assists: number;
  mins: number;
  rating: number;
}

interface MatchData {
  teamA: { logo: string; name: string; score: number };
  teamB: { logo: string; name: string; score: number };
  stats: { goals: number; assists: number; fouls: number; possession: number };
  players: Player[];
}

export default function DashboardPage() {
  const { teamA, teamB, stats, players }: MatchData = matchData;

  return (
    <div className="p-6 space-y-8">
      {/* Match Header */}
<div className="flex items-center justify-between text-center">
  <div className="flex flex-col items-center">
    <Image src="/team-logos/default.png" alt="Team A Logo" width={80} height={80} className="object-contain" />
    <h2 className="text-lg font-semibold">{teamA.name}</h2>
  </div>
  <div className="text-3xl font-bold">
    {teamA.score} - {teamB.score}
  </div>
  <div className="flex flex-col items-center">
    <Image src="/team-logos/default.png" alt="Team B Logo" width={80} height={80} className="object-contain" />
    <h2 className="text-lg font-semibold">{teamB.name}</h2>
  </div>
</div>


      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Goals" value={stats.goals} />
        <StatCard label="Assists" value={stats.assists} />
        <StatCard label="Fouls" value={stats.fouls} />
        <StatCard label="Possession" value={stats.possession} />
      </div>

      {/* Player Table */}
      <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-xl shadow p-4">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b dark:border-slate-700">
              <th className="py-2 px-4">Player</th>
              <th>Team</th>
              <th>Goals</th>
              <th>Assists</th>
              <th>Minutes</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {players.map((p) => (
              <tr key={p.id} className="border-t border-gray-200 dark:border-slate-700">
                <td className="py-2 px-4">{p.name}</td>
                <td className="text-center">{p.team}</td>
                <td className="text-center">{p.goals}</td>
                <td className="text-center">{p.assists}</td>
                <td className="text-center">{p.mins}</td>
                <td className="text-center font-medium">{p.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Donut Charts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
        <div className="text-center">
          <DonutChart label="Goals" value={60} />
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Goal Contribution</p>
        </div>
        <div className="text-center">
          <DonutChart label="Assists" value={40} />
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Assist Rate</p>
        </div>
        <div className="text-center">
          <DonutChart label="Passes" value={75} />
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Pass Accuracy</p>
        </div>
      </div>

      {/* Upload Button */}
      <div className="flex justify-center mt-8">
        <a
          href="/upload"
          className="inline-block bg-violet-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-violet-700 transition"
        >
          📤 Upload New Match
        </a>
      </div>
    </div>
  );
}
