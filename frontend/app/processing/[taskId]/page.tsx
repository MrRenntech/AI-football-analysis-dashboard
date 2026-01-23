"use client";

import { useEffect, useState } from "react";
import { getStatus } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function ProcessingPage() {
    const params = useParams();
    const taskId = params.taskId as string;
    const router = useRouter();
    const [status, setStatus] = useState("pending");

    useEffect(() => {
        const interval = setInterval(async () => {
            const res = await getStatus(taskId);
            setStatus(res.status);
            if (res.status === "completed") {
                clearInterval(interval);
                router.push(`/results/${taskId}`);
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [taskId, router]);

    return (
        <div className="max-w-xl">
            <h1 className="text-2xl font-semibold mb-2">
                Processing Match Footage
            </h1>
            <p className="text-gray-600">
                Status: <span className="text-black">{status}</span>
            </p>

            <div className="mt-6 h-1 w-full bg-gray-200">
                <div className="h-1 bg-black animate-pulse w-1/2" />
            </div>
        </div>
    );
}
