"use client";

import { useState } from "react";
import { uploadVideo } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const router = useRouter();

    async function handleUpload() {
        if (!file) return;
        const res = await uploadVideo(file);
        router.push(`/processing/${res.task_id}`);
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-12 animate-fade-in-up">
            <div className="text-center space-y-2">
                <div className="text-xs font-bold text-audi-red uppercase tracking-[0.2em] mb-4">
                    Step 01
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-audi-black uppercase">
                    Select Footage
                </h1>
                <p className="text-audi-grey-600 font-light text-lg">
                    Upload your match video. Our engine handles the rest.
                </p>
            </div>

            <div className="relative">
                <input
                    type="file"
                    accept="video/mp4"
                    id="file-upload"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                />

                <label
                    htmlFor="file-upload"
                    className={`block w-full p-16 border-2 border-dashed transition-all duration-300 cursor-pointer text-center group ${file ? 'border-audi-red bg-audi-red/5' : 'border-audi-grey-300 hover:border-audi-black'}`}
                >
                    <div className="space-y-4">
                        <div className="text-4xl group-hover:scale-110 transition-transform duration-300 origin-center">
                            {file ? '📄' : '📤'}
                        </div>
                        <div className="text-sm font-bold uppercase tracking-widest text-audi-black">
                            {file ? file.name : "Click to Browse"}
                        </div>
                        {!file && <p className="text-xs text-audi-grey-600">MP4 Format Only</p>}
                    </div>
                </label>
            </div>

            <div className="flex justify-center">
                <button
                    onClick={handleUpload}
                    disabled={!file}
                    className={`
                        px-12 py-4 text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300
                        ${file
                            ? 'bg-audi-red text-white hover:bg-black shadow-lg hover:shadow-xl'
                            : 'bg-audi-grey-100 text-audi-grey-300 cursor-not-allowed'}
                    `}
                >
                    Initialize Analysis
                </button>
            </div>
        </div>
    );
}
