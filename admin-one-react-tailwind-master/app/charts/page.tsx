'use client'
import { useEffect, useState } from 'react'
import { Bar, Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
)

export default function ChartsPage() {
  const [barData, setBarData] = useState<any>(null)
  const [radarData, setRadarData] = useState<any>(null)

  useEffect(() => {
    fetch('http://localhost:5000/charts-data')
      .then(res => res.json())
      .then(data => {
        setBarData(data.bar)
        setRadarData({
          labels: data.radar.labels,
          datasets: data.radar.datasets
        })
      })
      .catch(err => console.error('Chart data fetch error:', err))
  }, [])

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">📊 Performance Charts</h2>

      {barData && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
          <h3 className="mb-2 font-semibold text-lg">Speed Comparison</h3>
          <Bar data={barData} options={{ responsive: true }} />
        </div>
      )}

      {radarData && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md mt-6">
          <h3 className="mb-2 font-semibold text-lg">Player Skills Radar</h3>
          <Radar data={radarData} options={{ responsive: true }} />
        </div>
      )}
    </div>
  )
}
