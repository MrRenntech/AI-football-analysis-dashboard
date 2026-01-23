export default function StatsPanel({ analytics }: { analytics: any }) {
    if (!analytics) return <div>No analytics data available</div>;

    return (
        <div className="space-y-12">
            {/* Team Stats */}
            <div className="space-y-4">
                <div className="flex items-center space-x-2 border-b border-audi-red pb-2 mb-6">
                    <div className="w-2 h-2 bg-audi-red"></div>
                    <h2 className="text-xl font-bold uppercase tracking-widest text-audi-black">Team Metrics</h2>
                </div>

                <div className="grid grid-cols-2 gap-8">
                    {analytics.teams && Object.entries(analytics.teams).map(([id, team]: any) => (
                        <div key={id} className="bg-audi-grey-100 p-6 shadow-sm border-l-4 border-audi-black transition-transform hover:translate-x-1">
                            <div className="text-xs font-bold uppercase tracking-widest text-audi-grey-600 mb-2">Team {Number(id) + 1}</div>
                            <div className="flex justify-between items-baseline mb-2">
                                <span className="text-sm font-medium uppercase text-audi-grey-900">Possession</span>
                                <span className="text-3xl font-bold text-audi-black">{team.possession_pct}<span className="text-sm font-normal text-audi-grey-600">%</span></span>
                            </div>
                            <div className="flex justify-between items-baseline border-t border-audi-grey-300 pt-2">
                                <span className="text-sm font-medium uppercase text-audi-grey-900">Coverage</span>
                                <span className="text-xl font-bold text-audi-black">{team.distance_px}<span className="text-xs font-normal text-audi-grey-600 ml-1">px</span></span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Player Stats */}
            <div className="space-y-4 pt-4">
                <div className="flex items-center space-x-2 border-b border-audi-grey-300 pb-2 mb-6">
                    <div className="w-2 h-2 bg-audi-black"></div>
                    <h2 className="text-xl font-bold uppercase tracking-widest text-audi-black">Player Telemetry</h2>
                </div>

                <div className="overflow-hidden border border-audi-grey-300 shadow-sm">
                    <div className="grid grid-cols-4 bg-audi-black text-audi-white text-[10px] uppercase tracking-widest font-bold p-3">
                        <div>ID</div>
                        <div>Affiliation</div>
                        <div>Distance</div>
                        <div>Velocity (Avg)</div>
                    </div>
                    <div className="divide-y divide-audi-grey-300 bg-white">
                        {analytics.players && Object.entries(analytics.players).map(([id, p]: any) => (
                            <div key={id} className="grid grid-cols-4 p-3 text-sm hover:bg-audi-grey-100 transition-colors duration-200">
                                <div className="font-bold text-audi-red">#{id}</div>
                                <div className="text-audi-grey-900 font-medium">Team {p.team + 1}</div>
                                <div className="font-mono text-audi-grey-600">{p.total_distance_px} <span className="text-[10px]">px</span></div>
                                <div className="font-mono text-audi-grey-600">{p.avg_speed_px_s} <span className="text-[10px]">px/s</span></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
