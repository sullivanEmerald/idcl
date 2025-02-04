import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

interface Campaign {
  id: string
  title: string
  status: string
  budget: number
  activePromoters: number
  reach: number
}

interface CampaignListProps {
  campaigns: Campaign[]
}

export function CampaignList({ campaigns }: CampaignListProps) {
  if (campaigns.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No campaigns to display
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {campaigns.map((campaign) => (
        <Link
          key={campaign.id}
          href={`/campaigns/${campaign.id}`}
          className="block rounded-lg border p-4 transition-colors hover:bg-gray-50"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{campaign.title}</h3>
              <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
                <Badge variant={campaign.status === 'active' ? 'success' : 'secondary'}>
                  {campaign.status}
                </Badge>
                <span>•</span>
                <span>${campaign.budget}</span>
                <span>•</span>
                <span>{campaign.activePromoters} promoters</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">Total Reach</div>
              <div className="text-lg">{campaign.reach.toLocaleString()}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
