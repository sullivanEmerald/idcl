"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Eye } from "lucide-react";
import { CampaignMetrics } from "@/components/metrics/campaign-metrics";
import { campaignService } from "@/services/campaign";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

import { Campaign } from "@/types/campaign";

export default function CampaignPage() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const data = await campaignService.getCampaign(id as string);
        console.log(data);
        setCampaign(data);
      } catch (error) {
        console.error("Error fetching campaign:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!campaign) {
    return <div>Campaign not found</div>;
  }

  const spentAmount = campaign.metrics.totalReach * campaign.pricePerPost;
  const spentPercentage = (spentAmount / campaign.budget) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {campaign.title}
          </h1>
          <p className="text-muted-foreground">{campaign.description}</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 hover:bg-blue-100"
          >
            {campaign.campaignGoal.charAt(0).toUpperCase() +
              campaign.campaignGoal.slice(1)}
          </Badge>
          <Badge
            variant={
              campaign?.status === "active"
                ? "success"
                : campaign?.status === "paused"
                  ? "secondary"
                  : "outline"
            }
            className={
              campaign?.status === "active"
                ? "bg-green-100 text-green-800 hover:bg-green-100"
                : campaign?.status === "paused"
                  ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-100"
            }
          >
            {(campaign?.status || "draft").charAt(0).toUpperCase() +
              (campaign?.status || "draft").slice(1)}
          </Badge>
          <Button
            variant="outline"
            onClick={() =>
              (window.location.href = `/advertiser/dashboard/campaigns/${id}/edit`)
            }
          >
            Edit Campaign
          </Button>
          {campaign.status === "active" ? (
            <Button
              variant="destructive"
              onClick={async () => {
                try {
                  await campaignService.pauseCampaign(id as string);
                  window.location.reload();
                } catch (error) {
                  console.error("Error pausing campaign:", error);
                }
              }}
            >
              Pause Campaign
            </Button>
          ) : campaign.status === "paused" ? (
            <Button
              onClick={async () => {
                try {
                  await campaignService.resumeCampaign(id as string);
                  window.location.reload();
                } catch (error) {
                  console.error("Error resuming campaign:", error);
                }
              }}
            >
              Resume Campaign
            </Button>
          ) : null}
        </div>
      </div>

      <CampaignMetrics campaign={campaign} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Spent</CardTitle>
            {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₦{campaign.metrics.budgetSpent.toLocaleString()}
            </div>
            <Progress value={spentPercentage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              ₦{(campaign.budget - campaign.metrics.budgetSpent).toLocaleString()} remaining
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Promoters Reach</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaign.metrics.promoterViews}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {campaign.metrics.uniquePromoterViews} unique promoter views
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaign.metrics.totalViews}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {campaign.metrics.byDevice.desktop.uniqueViews +
                campaign.metrics.byDevice.mobile.uniqueViews +
                campaign.metrics.byDevice.tablet.uniqueViews}{" "}
              unique views
            </p>
          </CardContent>
        </Card>
        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {campaign.campaignGoal === "engagement"
                ? "Engagement Rate"
                : "Impressions"}
            </CardTitle>
            <ChartBar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaign.campaignGoal === "engagement"
                ? `${(campaign.metrics.averageEngagementRate * 100).toFixed(2)}%`
                : campaign.metrics.totalViews.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {campaign.campaignGoal === "engagement"
                ? `${campaign.metrics.totalEngagements} total engagements`
                : `${campaign.metrics.totalReach} unique views`}
            </p>
          </CardContent>
        </Card> */}
        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Posts Made</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaign.metrics.totalPosts}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              ${campaign.pricePerPost} per post
            </p>
          </CardContent>
        </Card> */}
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
                <CardDescription>
                  Campaign duration and posting times
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Duration</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(campaign.startDate).toLocaleDateString()} -{" "}
                      {new Date(campaign.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Posting Schedule</p>
                    <p className="text-sm text-muted-foreground">
                      {campaign.requirements.postingSchedule.startTime} -{" "}
                      {campaign.requirements.postingSchedule.endTime}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {campaign.requirements.postingSchedule.days.join(", ")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Content Requirements</CardTitle>
                <CardDescription>
                  Guidelines and requirements for promoters
                </CardDescription>
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
              <CardDescription>
                Content assets for this campaign
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {(() => {
                  // Separate carousel and standalone assets
                  const carouselAssets = campaign.contentAssets
                    .filter((asset) => asset.type === "carousel")
                    .sort(
                      (a, b) => (a.carouselIndex ?? 0) - (b.carouselIndex ?? 0)
                    );

                  const standaloneAssets = campaign.contentAssets.filter(
                    (asset) => asset.type !== "carousel"
                  );

                  return (
                    <>
                      {/* Render carousel if we have carousel assets */}
                      {carouselAssets.length > 0 && (
                        <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
                          <Carousel>
                            <CarouselContent>
                              {carouselAssets.map((asset, index) => (
                                <CarouselItem key={asset.url || index}>
                                  <div className="relative aspect-[16/9] bg-gray-100">
                                    <Image
                                      src={asset.url}
                                      alt={`Content asset ${index + 1}`}
                                      sizes="100vw"
                                      className="object-contain"
                                      priority={index === 0}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/20 pointer-events-none" />
                                    <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-medium">
                                      {asset.contentType}
                                    </div>
                                    {asset.size && (
                                      <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-medium">
                                        {Math.round(asset.size / 1024)} KB
                                      </div>
                                    )}
                                  </div>
                                </CarouselItem>
                              ))}
                            </CarouselContent>
                            <CarouselPrevious className="-left-3 h-12 w-12 border-2 bg-white/90 hover:bg-white" />
                            <CarouselNext className="-right-3 h-12 w-12 border-2 bg-white/90 hover:bg-white" />
                          </Carousel>
                        </div>
                      )}

                      {/* Render standalone assets */}
                      {standaloneAssets.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {standaloneAssets.map((asset, index) => (
                            <div
                              key={`standalone-${index}`}
                              className="aspect-square relative rounded-lg overflow-hidden"
                            >
                              {asset.contentType === "image" ? (
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
                                    <Button
                                      variant="outline"
                                      className="text-white border-white"
                                    >
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
              <CardDescription>
                View and manage campaign promoters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {campaign.activePromoters?.length > 0 ? (
                  <div className="rounded-md border">
                    <div className="grid grid-cols-7 gap-6 p-6 font-medium border-b bg-muted/50">
                      <div>Promoter</div>
                      <div>Platforms</div>
                      <div>Audience Size</div>
                      <div>Engagement Rate</div>
                      <div>Content Types</div>
                      <div>Last Activity</div>
                      <div>Status</div>
                    </div>
                    <div className="divide-y">
                      {campaign.activePromoters.map((item) => (
                        <div
                          key={item._id}
                          className="grid grid-cols-7 gap-6 p-6 items-center hover:bg-muted/50"
                        >
                          <div>
                            <p className="font-medium">
                              {item.promoter.fullName || item.promoter.email}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {item.promoter.location || "Location not set"}
                            </p>
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            {(item.promoter.platforms || []).map((platform) => (
                              <Badge
                                key={platform}
                                variant="secondary"
                                className="capitalize"
                              >
                                {platform}
                              </Badge>
                            ))}
                          </div>
                          <div>
                            <p className="font-medium">
                              {item.promoter.followersCount
                                ? Number(
                                    item.promoter.followersCount
                                  ).toLocaleString()
                                : "0"}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              followers
                            </p>
                          </div>
                          <div>
                            <p className="font-medium">
                              {item.promoter.engagementRate
                                ? (Number(item.promoter.engagementRate) / 100)
                                    .toFixed(2)
                                    .toLocaleString()
                                : "0.00"}
                              %
                            </p>
                            <p className="text-sm text-muted-foreground">
                              avg. engagement
                            </p>
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            {(item.promoter.contentTypes || []).map((type) => (
                              <Badge
                                key={type}
                                variant="outline"
                                className="capitalize"
                              >
                                {type}
                              </Badge>
                            ))}
                          </div>
                          <div>
                            <p className="font-medium">
                              {item.lastActivity
                                ? new Date(
                                    item.lastActivity
                                  ).toLocaleDateString()
                                : "No activity"}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {item.totalEvents || 0} events
                            </p>
                          </div>
                          <div>
                            <Badge
                              variant={
                                item.promoter.status === "active"
                                  ? "success"
                                  : "secondary"
                              }
                              className={
                                item.promoter.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : ""
                              }
                            >
                              {(item.promoter.status || "inactive")
                                .charAt(0)
                                .toUpperCase() +
                                (item.promoter.status || "inactive").slice(1)}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    No active promoters for this campaign
                  </div>
                )}
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
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 border rounded-lg">
                    <h3 className="text-gray-600 mb-2">Platform Performance</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Instagram</span>
                        <span>
                          {campaign.metrics.bySocialPlatform?.instagram?.count?.toLocaleString() ||
                            "0"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Twitter</span>
                        <span>
                          {campaign.metrics.bySocialPlatform?.twitter?.count?.toLocaleString() ||
                            "0"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Facebook</span>
                        <span>
                          {campaign.metrics.bySocialPlatform?.facebook?.count?.toLocaleString() ||
                            "0"}
                        </span>
                      </div>
                    </div>
                  </div>
                  {campaign.contentAssets.some(asset => asset.contentType === "video") && (
                    <div className="p-4 border rounded-lg">
                      <h3 className="text-gray-600 mb-2">Video Metrics</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>3-Second Views</span>
                          <span>{campaign.metrics.viewDuration?.threeSeconds?.toLocaleString() || "0"}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>30-Second Views</span>
                          <span>{campaign.metrics.viewDuration?.thirtySeconds?.toLocaleString() || "0"}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>1-Minute Views</span>
                          <span>{campaign.metrics.viewDuration?.oneMinute?.toLocaleString() || "0"}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* <div className="p-4 border rounded-lg">
                    <h3 className="text-gray-600 mb-2">Engagement Rate</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Average</span>
                        <span>{(campaign.metrics.averageEngagementRate * 100).toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Peak Engagement Rate</span>
                        <span>{(campaign.metrics.averageEngagementRate * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Total Interactions</span>
                        <span>{campaign.metrics.totalEngagements?.toLocaleString() || '0'}</span>
                      </div>
                    </div>
                  </div> */}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 border rounded-lg">
                    <h3 className="text-gray-600 mb-2">Mobile Devices</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Android</span>
                        <span>
                          {campaign.metrics.byDevice.mobile.byOS.android}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>iOS</span>
                        <span>{campaign.metrics.byDevice.mobile.byOS.ios}</span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground mt-2">
                        <span>Total Views</span>
                        <span>
                          {campaign.metrics.byDevice.mobile.uniqueViews}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="text-gray-600 mb-2">Desktop</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Windows</span>
                        <span>
                          {campaign.metrics.byDevice.desktop.byOS.windows}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>macOS</span>
                        <span>
                          {campaign.metrics.byDevice.desktop.byOS.macos}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground mt-2">
                        <span>Total Views</span>
                        <span>
                          {campaign.metrics.byDevice.desktop.uniqueViews}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="text-gray-600 mb-2">Tablet</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Android</span>
                        <span>
                          {campaign.metrics.byDevice.tablet.byOS.android}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>iOS</span>
                        <span>{campaign.metrics.byDevice.tablet.byOS.ios}</span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground mt-2">
                        <span>Total Views</span>
                        <span>
                          {campaign.metrics.byDevice.tablet.uniqueViews}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
