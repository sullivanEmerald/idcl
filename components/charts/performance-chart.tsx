import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js'
import { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface PerformanceChartProps {
  data: {
    date: string
    views?: number
    reach?: number
    engagements: number
  }[]
}

type ChartDataPoint = {
  date: string
  views?: number
  reach?: number
  engagements: number
}

interface MonthlyData {
  [month: string]: {
    dates: string[]
    views: number[]
    engagements: number[]
  }
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  const [selectedMonth, setSelectedMonth] = useState<string>("all")
  const [availableMonths, setAvailableMonths] = useState<string[]>([])
  const [filteredData, setFilteredData] = useState<ChartDataPoint[]>(data)
  const [monthlyData, setMonthlyData] = useState<MonthlyData>({})

  // Group data by months when component mounts or data changes
  useEffect(() => {
    // Create an object to store data grouped by months
    const groupedByMonth: MonthlyData = {}
    
    // Process all data points
    data.forEach(item => {
      const date = new Date(item.date)
      // Format month name for display
      const monthName = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      
      if (!groupedByMonth[monthName]) {
        groupedByMonth[monthName] = {
          dates: [],
          views: [],
          engagements: []
        }
      }
      
      groupedByMonth[monthName].dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }))
      groupedByMonth[monthName].views.push(item.views || item.reach || 0)
      groupedByMonth[monthName].engagements.push(item.engagements)
    })
    
    setMonthlyData(groupedByMonth)
    setAvailableMonths(Object.keys(groupedByMonth))
    
    // Set default filtered data to all data
    setFilteredData(data)
  }, [data])

  // Handle month selection changes
  useEffect(() => {
    if (selectedMonth === "all") {
      setFilteredData(data)
    } else {
      // Filter data for the selected month
      const monthData = monthlyData[selectedMonth]
      if (monthData) {
        // Create new filtered data objects with the same structure as original data
        const filtered = monthData.dates.map((date, index) => {
          return {
            date: date,
            views: monthData.views[index],
            engagements: monthData.engagements[index]
          }
        })
        setFilteredData(filtered)
      }
    }
  }, [selectedMonth, data, monthlyData])

  // Format dates for display
  const formattedDates = filteredData.map((item) => {
    // For filtered data that already has formatted dates
    if (selectedMonth !== "all" && typeof item.date === 'string' && !item.date.includes('-')) {
      return item.date
    }
    // For original data that needs formatting
    const date = new Date(item.date)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  const chartData: ChartData<'line'> = {
    labels: formattedDates,
    datasets: [
      {
        label: 'Views',
        data: filteredData.map((item) => item.views || item.reach || 0),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Engagements',
        data: filteredData.map((item) => item.engagements),
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        tension: 0.3,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            {availableMonths.map((month) => (
              <SelectItem key={month} value={month}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Line data={chartData} options={options} />
    </div>
  )
}
