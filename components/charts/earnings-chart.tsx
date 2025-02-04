import { Bar } from 'react-chartjs-2'
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
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface EarningsChartProps {
  data: {
    date: string
    earnings: number
  }[]
}

export function EarningsChart({ data }: EarningsChartProps) {
  const chartData: ChartData<'bar'> = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: 'Earnings',
        data: data.map((item) => item.earnings),
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
      },
    ],
  }

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            if (typeof value === 'number') {
              return `$${value}`
            }
            return value
          },
        },
      },
    },
  }

  return <Bar data={chartData} options={options} />
}
