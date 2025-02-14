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
  title: string
  description: string
  advertiser: {
    id: string
    companyName: string
    logo?: string
  }
  pricePerPost: number
  requiredPlatforms: string[]
  targetedNiches: string[]
  endDate: string
  applicationStatus?: 'pending' | 'approved' | 'rejected' | null
}

export default function MarketplacePage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [nicheFilter, setNicheFilter] = useState('all')

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await promoterService.getMarketplace()
        setCampaigns(response)
      } catch (error) {
        console.error('Error fetching marketplace campaigns:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCampaigns()
  }, [])

  const filteredCampaigns = campaigns?.filter(campaign => {
    const matchesSearch = (
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.advertiser.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    const matchesNiche = nicheFilter === 'all' || campaign.targetedNiches.includes(nicheFilter)
    return matchesSearch && matchesNiche
  })

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-[300px]" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search campaigns..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={nicheFilter} onValueChange={setNicheFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by niche" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Niches</SelectItem>
            <SelectItem value="fashion">Fashion</SelectItem>
            <SelectItem value="beauty">Beauty</SelectItem>
            <SelectItem value="tech">Tech</SelectItem>
            <SelectItem value="gaming">Gaming</SelectItem>
            <SelectItem value="lifestyle">Lifestyle</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCampaigns?.map((campaign) => (
          <Card key={campaign.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between space-x-4">
              <div className="flex items-start space-x-3 flex-1">
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                  {campaign.advertiser.logo ? (
                    <img
                      src={campaign.advertiser.logo}
                      alt={campaign.advertiser.companyName}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-lg font-semibold">
                      {campaign.advertiser.companyName.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold truncate">{campaign.title}</h3>
                  <p className="text-sm text-gray-600">{campaign.advertiser.companyName}</p>
                </div>
              </div>
              {campaign.applicationStatus ? (
                <span className={`px-3 py-1 rounded-full text-sm ${
                  campaign.applicationStatus === 'approved' ? 'bg-green-100 text-green-800' :
                  campaign.applicationStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {campaign.applicationStatus.charAt(0).toUpperCase() + campaign.applicationStatus.slice(1)}
                </span>
              ) : null}
            </div>

            <p className="mt-4 text-sm text-gray-600 line-clamp-2">{campaign.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {campaign.targetedNiches.map((niche) => (
                <span
                  key={niche}
                  className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full"
                >
                  {niche}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Price per post</div>
                <div className="text-lg font-semibold">${campaign.pricePerPost}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">Ends</div>
                <div className="text-sm">
                  {new Date(campaign.endDate).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="text-sm font-medium mb-2">Required Platforms</div>
              <div className="flex flex-wrap gap-2">
                {campaign.requiredPlatforms.map((platform) => (
                  <span
                    key={platform}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>

            <Button
              className="w-full mt-6"
              variant={campaign.applicationStatus ? 'secondary' : 'default'}
              disabled={campaign.applicationStatus === 'pending'}
            >
              {campaign.applicationStatus ? 'View Details' : 'Apply Now'}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
