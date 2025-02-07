'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
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
  ChartData as ChartJSData,
  ChartOptions,
} from 'chart.js'
import advertiserService from '@/services/advertiser'
import type { AnalyticsOverview } from '@/services/advertiser'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsOverview | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await advertiserService.getAnalyticsOverview()
        setAnalyticsData(data)
      } catch (error) {
        console.error('Error fetching analytics:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  // Generate last 7 days for x-axis
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - i)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }).reverse()

  const chartData: ChartJSData<'line'> = {
    labels: last7Days,
    datasets: [
      {
        label: 'Total Reach',
        data: Array(7).fill(analyticsData?.performanceMetrics.totalReach || 0),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Total Engagements',
        data: Array(7).fill(analyticsData?.performanceMetrics.totalEngagements || 0),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Average Engagement Rate',
        data: Array(7).fill(analyticsData?.performanceMetrics.averageEngagementRate || 0),
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(249, 115, 22, 0.5)',
        tension: 0.3,
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
          <h1 className="text-3xl font-bold">Campaign Analytics</h1>
          <p className="mt-2 text-gray-600">Track and analyze your campaign performance</p>
        </div>
      </div>

      <Card className="p-6">
        <Line data={chartData} options={chartOptions} className="h-[400px]" />
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <h3 className="text-lg font-semibold">Total Reach</h3>
          <p className="mt-2 text-3xl font-bold">
            {analyticsData?.performanceMetrics.totalReach.toLocaleString() || '0'}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Average per campaign: {Math.round(analyticsData?.performanceMetrics.totalReach || 0).toLocaleString()}
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold">Total Engagements</h3>
          <p className="mt-2 text-3xl font-bold">
            {analyticsData?.performanceMetrics.totalEngagements.toLocaleString() || '0'}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Average per campaign: {Math.round(analyticsData?.performanceMetrics.totalEngagements || 0).toLocaleString()}
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold">Engagement Rate</h3>
          <p className="mt-2 text-3xl font-bold">
            {(analyticsData?.performanceMetrics.averageEngagementRate || 0).toFixed(2)}%
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Average across all campaigns
          </p>
        </Card>
      </div>
    </div>
  )
}
