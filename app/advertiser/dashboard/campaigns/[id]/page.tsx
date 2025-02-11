'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Calendar, ChartBar, Clock, DollarSign, Eye, Users } from 'lucide-react'
import { campaignService } from '@/services/campaign'
import { Carousel } from '@/components/ui/carousel'

interface Campaign {
  _id: string
  title: string
  description: string
  status: string
  budget: number
  pricePerPost: number
  startDate: string
  endDate: string
  contentAssets: Array<{
    type: 'photo' | 'video' | 'carousel'
    contentType: 'image' | 'video'
    url: string
    thumbnailUrl?: string
    carouselIndex?: number
    width?: number
    height?: number
    size?: number
  }>
  metrics: {
    totalReach: number
    totalEngagements: number
    totalPosts: number
    averageEngagementRate: number
    byDevice: {
      mobile: number
      desktop: number
      tablet: number
    }
    byRegion: Record<string, number>
    byChannel: Record<string, number>
    uniqueViews: number
  }
  requirements: {
    contentGuidelines: string
    postingSchedule: {
      startTime: string
      endTime: string
      days: string[]
    }
    hashtags: string[]
    mentions: string[]
    brandAssetLinks?: string[]
  }
}

export default function CampaignPage() {
  const { id } = useParams()
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const data = await campaignService.getCampaign(id as string)
        setCampaign(data)
      } catch (error) {
        console.error('Error fetching campaign:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCampaign()
  }, [id])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!campaign) {
    return <div>Campaign not found</div>
  }

  const spentAmount = campaign.metrics.totalPosts * campaign.pricePerPost
  const spentPercentage = (spentAmount / campaign.budget) * 100

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{campaign.title}</h1>
          <p className="text-muted-foreground">{campaign.description}</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge
            variant={campaign.status === 'active' ? 'success' :
                    campaign.status === 'paused' ? 'secondary' : 'outline'}
            className={campaign.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                      campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' :
                      'bg-gray-100 text-gray-800 hover:bg-gray-100'}
          >
            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
          </Badge>
          <Button 
            variant="outline"
            onClick={() => window.location.href = `/advertiser/dashboard/campaigns/${id}/edit`}
          >
            Edit Campaign
          </Button>
          {campaign.status === 'active' ? (
            <Button 
              variant="destructive"
              onClick={async () => {
                try {
                  await campaignService.pauseCampaign(id as string);
                  window.location.reload();
                } catch (error) {
                  console.error('Error pausing campaign:', error);
                }
              }}
            >
              Pause Campaign
            </Button>
          ) : campaign.status === 'paused' ? (
            <Button
              onClick={async () => {
                try {
                  await campaignService.resumeCampaign(id as string);
                  window.location.reload();
                } catch (error) {
                  console.error('Error resuming campaign:', error);
                }
              }}
            >
              Resume Campaign
            </Button>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${spentAmount}</div>
            <Progress value={spentPercentage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              ${campaign.budget - spentAmount} remaining
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaign.metrics.totalReach}</div>
            <p className="text-xs text-muted-foreground mt-2">
              {campaign.metrics.uniqueViews} unique views
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <ChartBar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(campaign.metrics.averageEngagementRate * 100).toFixed(2)}%
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {campaign.metrics.totalEngagements} total engagements
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Posts Made</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaign.metrics.totalPosts}</div>
            <p className="text-xs text-muted-foreground mt-2">
              ${campaign.pricePerPost} per post
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="promoters">Promoters</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Schedule</CardTitle>
                <CardDescription>Campaign duration and posting times</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Duration</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Posting Schedule</p>
                    <p className="text-sm text-muted-foreground">
                      {campaign.requirements.postingSchedule.startTime} - {campaign.requirements.postingSchedule.endTime}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {campaign.requirements.postingSchedule.days.join(', ')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Content Requirements</CardTitle>
                <CardDescription>Guidelines and requirements for promoters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium">Guidelines</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {campaign.requirements.contentGuidelines}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Hashtags</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {campaign.requirements.hashtags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                {campaign.requirements.mentions.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium">Mentions</h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {campaign.requirements.mentions.map((mention) => (
                        <Badge key={mention} variant="secondary">
                          {mention}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Content</CardTitle>
              <CardDescription>Content assets for this campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {(() => {
                  // Separate carousel and standalone assets
                  const carouselAssets = campaign.contentAssets
                    .filter(asset => asset.type === 'carousel')
                    .sort((a, b) => (a.carouselIndex ?? 0) - (b.carouselIndex ?? 0));
                  
                  const standaloneAssets = campaign.contentAssets
                    .filter(asset => asset.type !== 'carousel');

                  return (
                    <>
                      {/* Render carousel if we have carousel assets */}
                      {carouselAssets.length > 0 && (
                        <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
                          <Carousel
                            images={carouselAssets.map(asset => asset.url)}
                            contentType="image"
                          />
                        </div>
                      )}

                      {/* Render standalone assets */}
                      {standaloneAssets.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {standaloneAssets.map((asset, index) => (
                            <div key={`standalone-${index}`} className="aspect-square relative rounded-lg overflow-hidden">
                              {asset.contentType === 'image' ? (
                                <img
                                  src={asset.url}
                                  alt={`Campaign content ${index + 1}`}
                                  className="object-cover w-full h-full"
                                />
                              ) : (
                                <div className="relative w-full h-full">
                                  <img
                                    src={asset.thumbnailUrl || asset.url}
                                    alt={`Campaign video thumbnail ${index + 1}`}
                                    className="object-cover w-full h-full"
                                  />
                                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <Button variant="outline" className="text-white border-white">
                                      Play Video
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="promoters">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Promoters</CardTitle>
              <CardDescription>Manage your campaign promoters</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Promoters content will go here */}
              <div className="text-center text-muted-foreground py-8">
                Promoter management coming soon
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Analytics</CardTitle>
              <CardDescription>Detailed performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Analytics content will go here */}
              <div className="text-center text-muted-foreground py-8">
                Detailed analytics coming soon
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
