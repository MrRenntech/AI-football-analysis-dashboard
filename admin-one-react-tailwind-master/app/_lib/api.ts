// app/_lib/api.ts

export async function fetchChartData() {
  const res = await fetch("http://localhost:5000/api/charts");

  if (!res.ok) {
    throw new Error("Failed to fetch chart data");
  }

  return res.json();
}
