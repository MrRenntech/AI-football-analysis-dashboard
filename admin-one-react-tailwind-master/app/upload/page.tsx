'use client';

import { useState } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [teamA, setTeamA] = useState('Team A');
  const [teamB, setTeamB] = useState('Team B');
  const [logoA, setLogoA] = useState('/team-logos/default.png');
  const [logoB, setLogoB] = useState('/team-logos/default.png');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('video', file);

    const res = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setTeamA(data.teamA);
    setTeamB(data.teamB);
    setLogoA(data.logoA);
    setLogoB(data.logoB);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Upload Match</h1>
      <input type="file" accept=".mp4" onChange={handleFileChange} />
      <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 mt-2">Upload</button>

      <div className="mt-6 flex gap-8 items-center">
        <div className="text-center">
          <img src={logoA} className="w-16 h-16 mx-auto" />
          <p className="mt-2">{teamA}</p>
        </div>
        <span className="text-lg font-bold">vs</span>
        <div className="text-center">
          <img src={logoB} className="w-16 h-16 mx-auto" />
          <p className="mt-2">{teamB}</p>
        </div>
      </div>
    </div>
  );
}
