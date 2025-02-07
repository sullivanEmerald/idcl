'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Plus, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import advertiserService from '@/services/advertiser'

interface Campaign {
  id: string
  name: string
  status: string
  budget: number
  spent: number
  impressions: number
  clicks: number
  startDate: string
  endDate: string
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        // Replace with actual API call
        const { campaigns: apiCampaigns } = await advertiserService.getCampaigns()
        
        // Transform API campaign data to match our component's needs
        const transformedCampaigns = apiCampaigns.map(campaign => ({
          id: campaign.id,
          name: campaign.title,
          status: campaign.status,
          budget: campaign.budget,
          spent: campaign.metrics.totalEngagements * campaign.pricePerPost,
          impressions: campaign.metrics.totalReach,
          clicks: campaign.metrics.totalEngagements,
          startDate: new Date(campaign.startDate).toLocaleDateString(),
          endDate: new Date(campaign.endDate).toLocaleDateString()
        }))
        
        setCampaigns(transformedCampaigns)
      } catch (error) {
        console.error('Error fetching campaigns:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCampaigns()
  }, [])

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (isLoading) {
    return (
      <div className="space-y-6 p-8">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-6">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Campaign Management</h1>
          <p className="mt-2 text-gray-600">Manage and monitor your advertising campaigns</p>
        </div>
        <Button onClick={() => window.location.href = '/advertiser/campaigns/new'}>
          <Plus className="mr-2 h-4 w-4" />
          Create Campaign
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search campaigns..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6">
        {filteredCampaigns.map((campaign) => (
          <Card key={campaign.id} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{campaign.name}</h3>
                <div className="mt-1 flex items-center gap-4 text-sm text-gray-600">
                  <span>Budget: ${campaign.budget}</span>
                  <span>Spent: ${campaign.spent}</span>
                  <span>Impressions: {campaign.impressions}</span>
                  <span>Clicks: {campaign.clicks}</span>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                  campaign.status === 'active' ? 'bg-green-100 text-green-700' :
                  campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                </span>
                <Button variant="outline" onClick={() => window.location.href = `/advertiser/campaigns/${campaign.id}`}>
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
