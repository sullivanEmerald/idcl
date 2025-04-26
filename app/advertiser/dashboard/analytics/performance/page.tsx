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
import { Badge } from '@/components/ui/badge'

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
      <div className="space-y-6 p-4 md:p-8">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4 md:gap-6">
          <Skeleton className="h-[250px] md:h-[400px]" />
          <Skeleton className="h-[250px] md:h-[400px]" />
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
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          boxWidth: 10,
          padding: 10,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        bodyFont: {
          size: 12
        },
        titleFont: {
          size: 12
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 10
          }
        }
      },
      x: {
        ticks: {
          font: {
            size: 10
          }
        }
      }
    },
  }

  return (
    <div className="space-y-6 p-0 md:p-0">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Performance Analytics</h1>
        <p className="mt-2 text-gray-600">Track your campaign performance metrics</p>
      </div>

      <div className="grid gap-4 md:gap-6">
        <Card className="p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">Campaign Performance</h2>
          <div className="space-y-4 md:space-y-6">
            <div className="h-[250px] md:h-[300px]">
              <Line data={campaignChartData} options={chartOptions} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-2 md:mt-4">
              <div className="p-3 md:p-4 border rounded-lg">
                <h3 className="text-xs md:text-sm text-gray-600">Total Reach</h3>
                <p className="text-xl md:text-2xl font-bold mt-1 md:mt-2">
                  {performanceData?.campaigns.totalReach.toLocaleString()}
                </p>
              </div>
              <div className="p-3 md:p-4 border rounded-lg">
                <h3 className="text-xs md:text-sm text-gray-600">Total Engagements</h3>
                <p className="text-xl md:text-2xl font-bold mt-1 md:mt-2">
                  {performanceData?.campaigns.totalEngagements.toLocaleString()}
                </p>
              </div>
              <div className="p-3 md:p-4 border rounded-lg sm:col-span-2 md:col-span-1">
                <h3 className="text-xs md:text-sm text-gray-600">Conversion Rate</h3>
                <p className="text-xl md:text-2xl font-bold mt-1 md:mt-2">
                  {((performanceData?.campaigns.totalConversions || 0) / (performanceData?.campaigns.totalReach || 1) * 100).toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">Promoter Performance</h2>
          <div className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              <div className="p-3 md:p-4 border rounded-lg">
                <h3 className="text-xs md:text-sm text-gray-600">Active Promoters</h3>
                <p className="text-xl md:text-2xl font-bold mt-1 md:mt-2">
                  {performanceData?.promoters.activeCount} / {performanceData?.promoters.totalCount}
                </p>
              </div>
              <div className="p-3 md:p-4 border rounded-lg">
                <h3 className="text-xs md:text-sm text-gray-600">Average Engagement Rate</h3>
                <p className="text-xl md:text-2xl font-bold mt-1 md:mt-2">
                  {performanceData?.promoters.averageEngagementRate.toFixed(2)}%
                </p>
              </div>
              <div className="p-3 md:p-4 border rounded-lg sm:col-span-2 md:col-span-1">
                <h3 className="text-xs md:text-sm text-gray-600">Device Distribution</h3>
                <div className="space-y-2 mt-1 md:mt-2">
                  <div>
                    <div className="flex justify-between text-xs md:text-sm">
                      <span>Mobile</span>
                      <span>{performanceData?.campaigns.byDevice.mobile.uniqueViews.toLocaleString()}</span>
                    </div>
                    <Progress
                      value={
                        (performanceData?.campaigns.byDevice.mobile.uniqueViews || 0) /
                        (performanceData?.campaigns.totalReach || 1) *
                        100
                      }
                      className="mt-1 h-2"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs md:text-sm">
                      <span>Desktop</span>
                      <span>{performanceData?.campaigns.byDevice.desktop.uniqueViews.toLocaleString()}</span>
                    </div>
                    <Progress
                      value={
                        (performanceData?.campaigns.byDevice.desktop.uniqueViews || 0) /
                        (performanceData?.campaigns.totalReach || 1) *
                        100
                      }
                      className="mt-1 h-2"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs md:text-sm">
                      <span>Tablet</span>
                      <span>{performanceData?.campaigns.byDevice.tablet.uniqueViews.toLocaleString()}</span>
                    </div>
                    <Progress
                      value={
                        (performanceData?.campaigns.byDevice.tablet.uniqueViews || 0) /
                        (performanceData?.campaigns.totalReach || 1) *
                        100
                      }
                      className="mt-1 h-2"
                    />
                  </div>
                </div>
              </div>
            </div>

            {performanceData?.promoters.topPerformers && performanceData.promoters.topPerformers.length > 0 && (
              <div className="mt-4 border rounded-lg overflow-hidden">
                <div className="bg-muted/50 px-4 py-3 border-b">
                  <h3 className="font-medium text-sm">Top Performing Promoters</h3>
                </div>
                <div className="divide-y">
                  {performanceData.promoters.topPerformers.map((promoter, index) => (
                    <div key={index} className="px-4 py-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium text-sm">{promoter.name}</p>
                        <p className="text-xs text-muted-foreground">{promoter.reach.toLocaleString()} reach</p>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        {promoter.engagementRate.toFixed(2)}% engagement
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
