'use client'

import React, { useState } from 'react';

export default function ComparisonPage() {
  const [playerA, setPlayerA] = useState<File | null>(null);
  const [playerB, setPlayerB] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const handleUpload = async (player: File | null, label: string) => {
    if (!player) {
      setMessage(`⚠️ Please select a video for ${label}`);
      return;
    }

    const formData = new FormData();
    formData.append('video', player);

    try {
      const response = await fetch('http://localhost:5000/', {
        method: 'POST',
        body: formData,
        mode: 'cors',
        credentials: 'include',
      });

      if (response.ok) {
        setMessage(`✅ ${label} uploaded successfully`);
      } else {
        setMessage(`❌ Upload failed for ${label}`);
      }
    } catch (err) {
      console.error(err);
      setMessage(`❌ Network error for ${label}`);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        🆚 Player Comparison
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Player A */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-lg shadow space-y-4">
          <h2 className="text-xl font-semibold">Player A</h2>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setPlayerA(e.target.files?.[0] || null)}
            className="block w-full"
          />
          <button
            onClick={() => handleUpload(playerA, "Player A")}
            className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700"
          >
            Upload Player A Video
          </button>
        </div>

        {/* Player B */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-lg shadow space-y-4">
          <h2 className="text-xl font-semibold">Player B</h2>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setPlayerB(e.target.files?.[0] || null)}
            className="block w-full"
          />
          <button
            onClick={() => handleUpload(playerB, "Player B")}
            className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700"
          >
            Upload Player B Video
          </button>
        </div>
      </div>

      {message && (
        <p className="text-sm text-center text-gray-800 dark:text-gray-300 mt-6">
          {message}
        </p>
      )}
    </div>
  );
}
