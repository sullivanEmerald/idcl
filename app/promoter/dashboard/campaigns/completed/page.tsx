'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Campaign } from '@/types/campaign'
import promoterService from '@/services/promoter'

export default function CompletedCampaigns() {
  const [completedCampaigns, setCompletedCampaigns] = useState<Campaign[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCompletedCampaigns = async () => {
      try {
        const campaigns = await promoterService.getCompletedCampaigns()
        setCompletedCampaigns(campaigns)
      } catch (error) {
        console.error('Error fetching completed campaigns:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCompletedCampaigns()
  }, [])

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold">Completed Campaigns</h1>
        <p className="mt-2 text-gray-600">View your campaign history</p>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          {isLoading ? (
            <p>Loading completed campaigns...</p>
          ) : completedCampaigns.length === 0 ? (
            <p>No completed campaigns found.</p>
          ) : (
            <div className="space-y-4">
              {completedCampaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="border-b pb-4 last:border-b-0 last:pb-0"
                >
                  <h3 className="font-semibold">{campaign.title}</h3>
                  <p className="text-sm text-gray-600">{campaign.description}</p>
                  <div className="mt-2 text-sm">
                    <span className="text-gray-500">Completed on: </span>
                    {new Date(campaign.endDate).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
