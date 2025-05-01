import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js"
import { useEffect, useState } from "react"

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title)

type MultiBarChartProps = {
  data: ChartData<"bar">
  options?: ChartOptions<"bar">
}

export default function MultiBarChart({ data, options }: MultiBarChartProps) {
  const [barCharts, setBarCharts] = useState<ChartData<"bar">[]>([])
  const [seenHashes, setSeenHashes] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (!data?.labels?.length || !data.datasets?.length) return

    const hash = JSON.stringify({
      labels: data.labels,
      datasets: data.datasets.map(ds => ({
        label: ds.label,
        data: ds.data
      }))
    })

    if (!seenHashes.has(hash)) {
      setBarCharts(prev => [...prev, data])
      setSeenHashes(prev => new Set(prev).add(hash))
    }
  }, [data])

  return (
    <div className="flex flex-col gap-8 items-center">
        <p className="text-blue-500 text-2xl">Bar Graph</p>
      {barCharts.map((chart, index) => (
        <div key={index} className="w-full h-100 md:w-2/3">
          <Bar data={chart} options={options} className="scale-90" />
        </div>
      ))}
    </div>
  )
}
