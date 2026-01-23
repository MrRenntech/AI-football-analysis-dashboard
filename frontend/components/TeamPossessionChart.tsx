"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from "recharts";

const COLORS = {
    black: "#000000",
    grey: "#7a7a7a",
};

export default function TeamPossessionChart({ teams }: any) {
    const data = Object.entries(teams).map(([id, t]: any) => ({
        team: `Team ${Number(id) + 1}`,
        possession: t.possession_pct,
    }));

    return (
        <div>
            <div className="flex items-center space-x-2 border-b border-audi-red pb-2 mb-4">
                <div className="w-2 h-2 bg-audi-red"></div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-audi-black">
                    Team Possession (%)
                </h3>
            </div>

            <ResponsiveContainer width="100%" height={180}>
                <BarChart data={data}>
                    <XAxis
                        dataKey="team"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: COLORS.grey, fontSize: 12 }}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: COLORS.grey, fontSize: 12 }}
                        domain={[0, 100]}
                    />
                    <Bar
                        dataKey="possession"
                        fill={COLORS.black}
                        barSize={20}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
