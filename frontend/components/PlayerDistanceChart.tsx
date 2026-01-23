"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from "recharts";

const COLORS = {
    red: "#bb0a30",
    grey: "#7a7a7a",
};

export default function PlayerDistanceChart({ players }: any) {
    const data = Object.entries(players)
        .map(([id, p]: any) => ({
            player: `#${id}`,
            distance: p.total_distance_px,
        }))
        .sort((a, b) => b.distance - a.distance)
        .slice(0, 8); // top 8 only (Audi restraint)

    return (
        <div>
            <div className="flex items-center space-x-2 border-b border-audi-grey-300 pb-2 mb-4">
                <div className="w-2 h-2 bg-audi-black"></div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-audi-black">
                    Player Distance (px)
                </h3>
            </div>

            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data}>
                    <XAxis
                        dataKey="player"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: COLORS.grey, fontSize: 12 }}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: COLORS.grey, fontSize: 12 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="distance"
                        stroke={COLORS.red}
                        strokeWidth={1.5}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
