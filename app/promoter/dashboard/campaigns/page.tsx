'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import promoterService from '@/services/promoter'

interface Campaign {
  id: string
  name: string
  brand: string
  status: 'active' | 'completed' | 'pending'
  reward: number
  requirements: string
  deadline: string
  progress: number
}

export default function ActiveCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        // Replace with actual API call
        const response = await promoterService.getActiveCampaigns()
        setCampaigns(response.data)
      } catch (error) {
        console.error('Error fetching campaigns:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCampaigns()
  }, [])

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = (
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.brand.toLowerCase().includes(searchQuery.toLowerCase())
    )
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (isLoading) {
    return (
      <div className="space-y-6 p-8">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-6">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold">Active Campaigns</h1>
        <p className="mt-2 text-gray-600">View and manage your ongoing promotional campaigns</p>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search campaigns or brands..."
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
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6">
        {filteredCampaigns.map((campaign) => (
          <Card key={campaign.id} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{campaign.name}</h3>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                    campaign.status === 'active' ? 'bg-green-100 text-green-700' :
                    campaign.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">Brand: {campaign.brand}</p>
                <p className="mt-2">{campaign.requirements}</p>
                <div className="mt-4 flex items-center gap-6">
                  <div>
                    <p className="text-sm text-gray-600">Reward</p>
                    <p className="text-lg font-semibold">${campaign.reward}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Deadline</p>
                    <p className="text-lg font-semibold">
                      {new Date(campaign.deadline).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Progress</p>
                    <p className="text-lg font-semibold">{campaign.progress}%</p>
                  </div>
                </div>
              </div>
              <Button onClick={() => window.location.href = `/promoter/campaigns/${campaign.id}`}>
                View Details
              </Button>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full bg-blue-500 transition-all"
                style={{ width: `${campaign.progress}%` }}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
