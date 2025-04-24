'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import axios from 'axios'

export default function HomePage() {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [teamA, setTeamA] = useState('')
  const [teamB, setTeamB] = useState('')
  const [logoA, setLogoA] = useState('')
  const [logoB, setLogoB] = useState('')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0])
      setError('')
    }
  }

  const handleUpload = async () => {
    if (!videoFile) {
      setError('Please select a video file first.')
      return
    }

    setUploading(true)
    const formData = new FormData()
    formData.append('video', videoFile)

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      const { teamA, teamB, logoA, logoB } = response.data
      setTeamA(teamA)
      setTeamB(teamB)
      setLogoA(logoA)
      setLogoB(logoB)
    } catch (err) {
      setError('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">Upload Match Video</h1>

      <input type="file" accept="video/mp4" onChange={handleFileChange} />
      <button
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>

      {error && <p className="text-red-600 mt-3">{error}</p>}

      {(teamA || teamB) && (
        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex flex-col items-center">
            <Image
              src={logoA}
              alt={teamA}
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
            <p className="mt-2 font-semibold">{teamA}</p>
          </div>
          <span className="text-lg font-bold">VS</span>
          <div className="flex flex-col items-center">
            <Image
              src={logoB}
              alt={teamB}
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
            <p className="mt-2 font-semibold">{teamB}</p>
          </div>
        </div>
      )}
    </div>
  )
}
