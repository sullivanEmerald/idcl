'use client'

import { Card } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { advertiserService } from '@/services/advertiser'
import { Skeleton } from '@/components/ui/skeleton'
import { Progress } from '@/components/ui/progress'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

type PerformanceData = {
  campaigns: {
    totalReach: number
    totalEngagements: number
    averageEngagementRate: number
    totalConversions: number
    byDevice: {
      mobile: { uniqueViews: number }
      desktop: { uniqueViews: number }
      tablet: { uniqueViews: number }
    }
  }
  promoters: {
    totalCount: number
    activeCount: number
    averageEngagementRate: number
    topPerformers: Array<{
      name: string
      engagementRate: number
      reach: number
    }>
  }
}

export default function PerformanceAnalytics() {
  const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const data = await advertiserService.getCampaignPerformance()
        setPerformanceData(data)
      } catch (error) {
        console.error('Error fetching performance data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPerformanceData()
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-8 p-8">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-6">
          <Skeleton className="h-[400px]" />
          <Skeleton className="h-[400px]" />
        </div>
      </div>
    )
  }

  const campaignChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Reach',
        data: Array(7).fill(performanceData?.campaigns.totalReach || 0),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Engagements',
        data: Array(7).fill(performanceData?.campaigns.totalEngagements || 0),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.3,
      },
    ],
  }

  const chartOptions = {
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
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold">Performance Analytics</h1>
        <p className="mt-2 text-gray-600">Track your campaign performance metrics</p>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Campaign Performance</h2>
          <div className="space-y-6">
            <Line data={campaignChartData} options={chartOptions} className="h-[300px]" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="p-4 border rounded-lg">
                <h3 className="text-sm text-gray-600">Total Reach</h3>
                <p className="text-2xl font-bold mt-2">
                  {performanceData?.campaigns.totalReach.toLocaleString()}
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="text-sm text-gray-600">Total Engagements</h3>
                <p className="text-2xl font-bold mt-2">
                  {performanceData?.campaigns.totalEngagements.toLocaleString()}
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="text-sm text-gray-600">Conversion Rate</h3>
                <p className="text-2xl font-bold mt-2">
                  {((performanceData?.campaigns.totalConversions || 0) / (performanceData?.campaigns.totalReach || 1) * 100).toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Promoter Performance</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="text-sm text-gray-600">Active Promoters</h3>
                <p className="text-2xl font-bold mt-2">
                  {performanceData?.promoters.activeCount} / {performanceData?.promoters.totalCount}
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="text-sm text-gray-600">Average Engagement Rate</h3>
                <p className="text-2xl font-bold mt-2">
                  {performanceData?.promoters.averageEngagementRate.toFixed(2)}%
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="text-sm text-gray-600">Device Distribution</h3>
                <div className="space-y-2 mt-2">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Mobile</span>
                      <span>{performanceData?.campaigns.byDevice.mobile.uniqueViews.toLocaleString()}</span>
                    </div>
                    <Progress
                      value={
                        (performanceData?.campaigns.byDevice.mobile.uniqueViews || 0) /
                        (performanceData?.campaigns.totalReach || 1) *
                        100
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Desktop</span>
                      <span>{performanceData?.campaigns.byDevice.desktop.uniqueViews.toLocaleString()}</span>
                    </div>
                    <Progress
                      value={
                        (performanceData?.campaigns.byDevice.desktop.uniqueViews || 0) /
                        (performanceData?.campaigns.totalReach || 1) *
                        100
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
