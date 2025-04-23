'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Search, ChevronRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import advertiserService from '@/services/advertiser'
import { useRouter } from 'next/navigation'

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
  const router = useRouter();

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
      <div className="space-y-6 p-4 md:p-8">
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
    <div className="space-y-6 p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Campaign Management</h1>
          <p className="mt-2 text-gray-600">Manage and monitor your advertising campaigns</p>
        </div>
        {/* <Button onClick={() => window.location.href = '/advertiser/campaigns/new'}>
          <Plus className="mr-2 h-4 w-4" />
          Create Campaign
        </Button> */} 
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
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
          <SelectTrigger className="w-full sm:w-48">
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

      <div className="grid gap-4 md:gap-6">
        {filteredCampaigns.map((campaign) => (
          <Card key={campaign.id} className="hover:bg-accent/5 transition-colors overflow-hidden">
            <CardHeader className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  <div>
                    <CardTitle className="text-base font-semibold">{campaign.name}</CardTitle>
                    <CardDescription className="text-xs mt-0.5">
                      {campaign.startDate} - {campaign.endDate}
                    </CardDescription>
                  </div>
                </div>
                <Badge
                  variant={campaign.status === 'active' ? 'success' :
                          campaign.status === 'paused' ? 'secondary' : 'outline'}
                  className={`mr-auto sm:ml-auto sm:mr-0 ${
                    campaign.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                    campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' :
                    'bg-gray-100 text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0 pb-2">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 px-4">
                <div className="text-sm">
                  <div className="font-medium">₦{campaign.budget.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Budget</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">₦{campaign.spent.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Spent</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">{campaign.impressions.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Views</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">{campaign.clicks.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Clicks</div>
                </div>
              </div>
              <div className="flex justify-end px-4 mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push(`/advertiser/dashboard/campaigns/${campaign.id}`)}
                  className="text-xs sm:text-sm flex items-center gap-1"
                >
                  View Details
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-10 text-muted-foreground">
            No campaigns found with the current filters.
          </div>
        )}
      </div>
    </div>
  )
}
