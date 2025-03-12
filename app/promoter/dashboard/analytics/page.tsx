'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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
  ChartOptions,
} from 'chart.js'
import promoterService from '@/services/promoter'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface AnalyticsData {
  engagements: number[]
  completedTasks: number[]
  earnings: number[]
  dates: string[]
  topPerformingCampaigns: {
    id: string
    name: string
    brand: string
    earnings: number
    engagement: number
  }[]
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d')
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Replace with actual API call
        const response = await promoterService.getAnalytics(timeRange)
        setAnalyticsData(response.data)
      } catch (error) {
        console.error('Error fetching analytics:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalytics()
  }, [timeRange])

  const chartData: ChartData<'line'> = {
    labels: analyticsData?.dates || [],
    datasets: [
      {
        label: 'Engagements',
        data: analyticsData?.engagements || [],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Completed Tasks',
        data: analyticsData?.completedTasks || [],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Earnings (₦)',
        data: analyticsData?.earnings || [],
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(249, 115, 22, 0.5)',
        tension: 0.3,
        yAxisID: 'earnings',
      },
    ],
  }

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        type: 'linear',
        display: true,
        position: 'left',
      },
      earnings: {
        beginAtZero: true,
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  }

  if (isLoading) {
    return (
      <div className="space-y-6 p-8">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-[400px]" />
        <div className="grid gap-6 md:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Performance Analytics</h1>
          <p className="mt-2 text-gray-600">Track your promotional performance and earnings</p>
        </div>
        <Select value={timeRange} onValueChange={(value: '7d' | '30d' | '90d') => setTimeRange(value)}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="p-6">
        <Line data={chartData} options={chartOptions} className="h-[400px]" />
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <h3 className="text-lg font-semibold">Total Engagements</h3>
          <p className="mt-2 text-3xl font-bold">
            {(analyticsData?.engagements || []).reduce((a, b) => a + b, 0).toLocaleString()}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Average: {Math.round(
              (analyticsData?.engagements || []).reduce((a, b) => a + b, 0) / (analyticsData?.engagements || []).length || 0
            ).toLocaleString()} per day
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold">Completed Tasks</h3>
          <p className="mt-2 text-3xl font-bold">
            {(analyticsData?.completedTasks || []).reduce((a, b) => a + b, 0).toLocaleString()}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Completion Rate: {((
              (analyticsData?.completedTasks || []).reduce((a, b) => a + b, 0) / 
              Math.max((analyticsData?.engagements || []).reduce((a, b) => a + b, 0), 1) * 100
            ) || 0).toFixed(2)}%
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold">Total Earnings</h3>
          <p className="mt-2 text-3xl font-bold">
          ₦{(analyticsData?.earnings || []).reduce((a, b) => a + b, 0).toLocaleString()}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Average: ₦{Math.round(
              (analyticsData?.earnings || []).reduce((a, b) => a + b, 0) / (analyticsData?.earnings || []).length || 0
            ).toLocaleString()} per day
          </p>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="border-b p-6">
          <h3 className="text-lg font-semibold">Top Performing Campaigns</h3>
          <p className="mt-1 text-sm text-gray-600">Your most successful promotional campaigns</p>
        </div>
        <div className="divide-y">
          {(analyticsData?.topPerformingCampaigns || []).map((campaign) => (
            <div key={campaign.id} className="flex items-center justify-between p-6">
              <div>
                <h4 className="font-medium">{campaign.name}</h4>
                {/* <p className="text-sm text-gray-600">{campaign.brand}</p> */}
              </div>
              <div className="text-right">
                <p className="font-medium">₦{campaign.earnings.toLocaleString()}</p>
                <p className="text-sm text-gray-600">
                  {campaign.engagement.toLocaleString()} engagements
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
