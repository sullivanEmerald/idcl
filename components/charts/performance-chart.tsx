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
    clicks?: number
    videoViews?: number
  }[]
}

type ChartDataPoint = {
  date: string
  views?: number
  reach?: number
  engagements: number
  clicks?: number
  videoViews?: number
}

interface MonthlyData {
  [month: string]: {
    dates: string[]
    views: number[]
    engagements: number[]
    clicks: number[]
    videoViews: number[]
  }
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  const [selectedMonth, setSelectedMonth] = useState<string>("all")
  const [availableMonths, setAvailableMonths] = useState<string[]>([])
  const [filteredData, setFilteredData] = useState<ChartDataPoint[]>(data)
  const [monthlyData, setMonthlyData] = useState<MonthlyData>({})
  const [visibleMetrics, setVisibleMetrics] = useState({
    views: true,
    engagements: true,
    clicks: false,
    videoViews: false
  })

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
          engagements: [],
          clicks: [],
          videoViews: []
        }
      }
      
      groupedByMonth[monthName].dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }))
      groupedByMonth[monthName].views.push(item.views || item.reach || 0)
      groupedByMonth[monthName].engagements.push(item.engagements)
      groupedByMonth[monthName].clicks.push(item.clicks || 0)
      groupedByMonth[monthName].videoViews.push(item.videoViews || 0)
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
            engagements: monthData.engagements[index],
            clicks: monthData.clicks[index],
            videoViews: monthData.videoViews[index]
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

  // Toggle visibility of metrics
  const toggleMetric = (metric: keyof typeof visibleMetrics) => {
    setVisibleMetrics(prev => ({
      ...prev,
      [metric]: !prev[metric]
    }))
  }

  const chartData: ChartData<'line'> = {
    labels: formattedDates,
    datasets: [
      ...(visibleMetrics.views ? [{
        label: 'Views',
        data: filteredData.map((item) => item.views || item.reach || 0),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      }] : []),
      ...(visibleMetrics.engagements ? [{
        label: 'Engagements',
        data: filteredData.map((item) => item.engagements),
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        tension: 0.3,
      }] : []),
      ...(visibleMetrics.clicks ? [{
        label: 'Clicks',
        data: filteredData.map((item) => item.clicks || 0),
        borderColor: 'rgb(236, 72, 153)',
        backgroundColor: 'rgba(236, 72, 153, 0.5)',
        tension: 0.3,
      }] : []),
      ...(visibleMetrics.videoViews ? [{
        label: 'Video Views',
        data: filteredData.map((item) => item.videoViews || 0),
        borderColor: 'rgb(234, 88, 12)',
        backgroundColor: 'rgba(234, 88, 12, 0.5)',
        tension: 0.3,
      }] : []),
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
      <div className="flex flex-wrap gap-2 justify-between items-center">
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => toggleMetric('views')} 
            className={`px-2 py-1 text-xs rounded-md ${visibleMetrics.views ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
          >
            Views
          </button>
          <button 
            onClick={() => toggleMetric('engagements')}
            className={`px-2 py-1 text-xs rounded-md ${visibleMetrics.engagements ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-800'}`}
          >
            Engagements
          </button>
          <button 
            onClick={() => toggleMetric('clicks')}
            className={`px-2 py-1 text-xs rounded-md ${visibleMetrics.clicks ? 'bg-pink-100 text-pink-800' : 'bg-gray-100 text-gray-800'}`}
          >
            Clicks
          </button>
          <button 
            onClick={() => toggleMetric('videoViews')}
            className={`px-2 py-1 text-xs rounded-md ${visibleMetrics.videoViews ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'}`}
          >
            Video Views
          </button>
        </div>
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
