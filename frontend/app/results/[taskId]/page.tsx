"use client";

import { useEffect, useState } from "react";
import { getResult } from "@/lib/api";
import VideoPlayer from "@/components/VideoPlayer";
import StatsPanel from "@/components/StatsPanel";
import TeamPossessionChart from "@/components/TeamPossessionChart";
import PlayerDistanceChart from "@/components/PlayerDistanceChart";
import { useParams } from "next/navigation";

export default function ResultsPage() {
    const params = useParams();
    const taskId = params.taskId as string;
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        async function loadData() {
            try {
                const res = await getResult(taskId);
                if (res.analytics) {
                    // Fetch result data including analytics JSON
                    const jsonRes = await fetch(`http://localhost:8000/${res.analytics}`);
                    const jsonData = await jsonRes.json();

                    setData({
                        video: res.video,
                        analytics: jsonData
                    });
                }
            } catch (err) {
                console.error("Failed to load data", err);
            }
        }
        loadData();
    }, [taskId]);

    if (!data) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-audi-red text-xl font-bold uppercase tracking-widest animate-pulse">
                Processing Telemetry...
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-2 gap-10">
            {/* LEFT: VIDEO */}
            <VideoPlayer videoPath={data.video} />

            {/* RIGHT: ANALYTICS */}
            <div className="space-y-8">
                <StatsPanel analytics={data.analytics} />

                <TeamPossessionChart teams={data.analytics.teams} />

                <PlayerDistanceChart players={data.analytics.players} />
            </div>
        </div>
    );
}
