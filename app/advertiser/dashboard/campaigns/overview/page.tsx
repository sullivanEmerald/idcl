'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Calendar, ChevronRight, DollarSign, Users } from 'lucide-react'
import Link from 'next/link'
import { campaignService } from '@/services/campaign'

interface Campaign {
  id: string
  title: string
  status: string
  budget: number
  metrics: {
    totalReach: number
    totalEngagements: number
    totalPosts: number
    averageEngagementRate: number
  }
  startDate: string
  endDate: string
}

export default function CampaignsOverview() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await campaignService.getCampaigns()
        setCampaigns(response)
      } catch (error) {
        console.error('Error fetching campaigns:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCampaigns()
  }, [])

  const activeCampaigns = campaigns.filter(c => c.status === 'active')
  const totalBudget = activeCampaigns.reduce((sum, c) => sum + c.budget, 0)
  const totalReach = activeCampaigns.reduce((sum, c) => sum + c.metrics.totalReach, 0)
  const totalEngagements = activeCampaigns.reduce((sum, c) => sum + c.metrics.totalEngagements, 0)
  const averageEngagementRate = activeCampaigns.length
    ? activeCampaigns.reduce((sum, c) => sum + c.metrics.averageEngagementRate, 0) / activeCampaigns.length
    : 0

  return (
    <div className="space-y-8 p-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Campaign Overview</h1>
          <p className="mt-2 text-gray-600">Monitor your campaign performance</p>
        </div>
        {/* <Link href="/advertiser/dashboard/campaigns/create">
          <Button>Create Campaign</Button>
        </Link> */}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Budget</p>
              <p className="text-2xl font-bold">₦{totalBudget.toLocaleString()}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Reach</p>
              <p className="text-2xl font-bold">{totalReach.toLocaleString()}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Campaigns</p>
              <p className="text-2xl font-bold">{activeCampaigns.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Users className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg. Engagement Rate</p>
              <p className="text-2xl font-bold">{(averageEngagementRate * 100).toFixed(1)}%</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6">
        {/* Active Campaigns */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Active Campaigns</h2>
          {loading ? (
            <p className="text-gray-600">Loading campaigns...</p>
          ) : activeCampaigns.length === 0 ? (
            <p className="text-gray-600">No active campaigns found.</p>
          ) : (
            <div className="space-y-6">
              {activeCampaigns.map(campaign => (
                <Link 
                  key={campaign.id}
                  href={`/advertiser/dashboard/campaigns/${campaign.id}`}
                  className="block hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{campaign.title}</h3>
                        <p className="text-sm text-gray-600">
                          {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Engagement Rate</span>
                        <span className="font-medium">
                          {(campaign.metrics.averageEngagementRate * 100).toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={campaign.metrics.averageEngagementRate * 100}
                        className="h-2"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Card>

        {/* Campaign Performance */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Campaign Performance</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 border rounded-lg">
                <h3 className="text-gray-600 mb-2">Total Engagements</h3>
                <p className="text-2xl font-bold">{totalEngagements.toLocaleString()}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="text-gray-600 mb-2">Posts Created</h3>
                <p className="text-2xl font-bold">
                  {activeCampaigns.reduce((sum, c) => sum + c.metrics.totalPosts, 0).toLocaleString()}
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="text-gray-600 mb-2">Average Reach per Post</h3>
                <p className="text-2xl font-bold">
                  {activeCampaigns.length && totalReach
                    ? Math.round(totalReach / activeCampaigns.reduce((sum, c) => sum + c.metrics.totalPosts, 0)).toLocaleString()
                    : 0}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
