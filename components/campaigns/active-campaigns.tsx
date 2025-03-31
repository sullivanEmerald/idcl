import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarCheck, ArrowRight } from 'lucide-react'

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
    startDate: Date
    endDate: Date
}

interface CampaignList {
    campaigns: Campaign[],
    isActive: boolean
}

function calculateDateDifference(startDate: Date, endDate: Date): string {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
}

export function ActiveCampaignList({ campaigns, isActive }: CampaignList) {

    if (campaigns.length === 0) {
        return (
            <div className="text-center text-gray-500">
                {isActive ? 'you have no active campaign' : 'you have no scheduled campaign'}
            </div>
        )
    }
    return (
        <div className="space-y-4">
            {campaigns.map((campaign) => (
                <Card
                    key={campaign.id}
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
                            </div>
                        </div>
                        <div className="text-right">
                            {isActive && (
                                <div>
                                    <div className="text-sm font-medium">Total Reach</div>
                                    <div className="text-lg">{campaign?.metrics.totalReach?.toLocaleString()}</div>
                                </div>
                            )}
                            <div>
                                <div className="flex items-center gap-4"> {/* Main container */}
                                    {/* Link with Badge */}
                                    <div className="flex-none">
                                        <Link href={`/advertiser/dashboard/campaigns/${campaign.id}`}>
                                            <Button variant="outline" size="sm" className="h-8 px-3">
                                                View
                                            </Button>
                                        </Link>
                                    </div>

                                    {/* Popover */}
                                    <div className="flex-none">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                {isActive ? (
                                                    <Button variant="secondary" size="sm" className="h-8 px-3">
                                                        Promoters
                                                    </Button>
                                                ) : (
                                                    <Button variant="secondary" size="sm" className="h-8 px-3">
                                                        View details
                                                    </Button>
                                                )}
                                            </PopoverTrigger>
                                            <PopoverContent className="w-80">
                                                {isActive ? (
                                                    <div>
                                                        <p>Number of promoters = 5</p>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className="p-3 bg-blue-100 rounded-lg">
                                                                <CalendarCheck className="w-6 h-6 text-blue-600" />
                                                            </div>
                                                            <p className="text-sm font-medium text-gray-600">Scheduling</p>
                                                        </div>

                                                        <div className="flex justify-between items-end">
                                                            <div className="space-y-1">
                                                                <h3 className="text-sm font-medium text-gray-900">Start</h3>
                                                                <p className="text-sm text-gray-600">
                                                                    {new Date(campaign.startDate).toLocaleDateString()}
                                                                </p>
                                                            </div>

                                                            <Link href={`/advertiser/dashboard/campaigns/${campaign.id}/edit`}>
                                                                <button
                                                                    className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                                                                >
                                                                    {calculateDateDifference(campaign.startDate, campaign.endDate)}
                                                                    <ArrowRight className="w-4 h-4" />
                                                                    <span>Reschedule</span>
                                                                </button>
                                                            </Link>

                                                            <div className="space-y-1">
                                                                <h3 className="text-sm font-medium text-gray-900">End</h3>
                                                                <p className="text-sm text-gray-600">
                                                                    {new Date(campaign.endDate).toLocaleDateString()}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                )}
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </Card>
            ))}
        </div>
    )
}
