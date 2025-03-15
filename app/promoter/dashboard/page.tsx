/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Metric } from '@/components/metrics/metric'
import { EarningsChart } from '@/components/charts/earnings-chart'
import { CampaignIcon } from '@/components/icons/campaign'
import { PaymentsIcon } from '@/components/icons/payments'
import { TaskAltIcon } from '@/components/icons/task-alt'
import { StarIcon } from '@/components/icons/star'
import promoterService from '@/services/promoter'

export default function PromoterDashboard() {
  const [metrics, setMetrics] = useState({
    activePromotions: 0,
    totalEarnings: 0,
    completedCampaigns: 0,
    averageRating: 0
  })
  const [recentEarnings, setRecentEarnings] = useState<any>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await promoterService.getDashboard()
        setMetrics(data.metrics)
        setRecentEarnings(data.recentEarnings)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back!</h1>
          <p className="mt-2 text-gray-600">{"Here's"} how your promotions are performing.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Metric
          title="Active Promotions"
          value={metrics.activePromotions}
          description="Current promotions"
          trend="+5.2%"
          icon={<CampaignIcon className="h-5 w-5" />}
          className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200"
        />
        <Metric
          title="Total Earnings"
          value={`₦${metrics.totalEarnings.toLocaleString()}`}
          description="Lifetime earnings"
          trend="+12.3%"
          icon={<PaymentsIcon className="h-5 w-5" />}
          className="bg-gradient-to-br from-green-50 to-green-100 border-green-200"
        />
        <Metric
          title="Completed Campaigns"
          value={metrics.completedCampaigns}
          description="Successfully finished"
          trend="+8.1%"
          icon={<TaskAltIcon className="h-5 w-5" />}
          className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
        />
        <Metric
          title="Average Rating"
          value={metrics.averageRating.toFixed(1)}
          description="Client satisfaction"
          trend="+0.2"
          icon={<StarIcon className="h-5 w-5" />}
          className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200"
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* <Card className="overflow-hidden border-t-4 border-t-blue-500">
          <div className="border-b p-6">
            <h2 className="text-xl font-semibold">Active Campaigns</h2>
            <p className="mt-1 text-sm text-gray-600">Your ongoing promotions</p>
          </div>
          <div className="p-6">
            <CampaignList campaigns={activeCampaigns} />
          </div>
        </Card> */}

        <Card className="overflow-hidden border-t-4 border-t-green-500">
          <div className="border-b p-6">
            <h2 className="text-xl font-semibold">Recent Earnings</h2>
            <p className="mt-1 text-sm text-gray-600">Your earnings over time</p>
          </div>
          <div className="p-6">
            <EarningsChart data={recentEarnings} />
          </div>
        </Card>
      </div>
    </div>
  )
}
