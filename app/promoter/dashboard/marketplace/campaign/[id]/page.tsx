/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useRef } from "react";
import { analyticsService } from "@/services/analytics";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Campaign } from "@/types/campaign";
import promoterService from "@/services/promoter";
import {
  ArrowLeft,
  Calendar,
  Globe,
  Users,
  BarChart,
  QrCode,
  Share2,
  Clock,
  Hash,
  AtSign,
  Link as LinkIcon,
} from "lucide-react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { cn } from "@/lib/utils";
import { CampaignSocialInteractions } from "@/components/campaigns/campaign-social-interactions";
import { useAuth } from "@/hooks/use-auth";
import axios from "axios";

export default function CampaignDetails() {
  const params = useParams();
  const router = useRouter();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [applicationNote, setApplicationNote] = useState("");
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [promotionalLink, setPromotionalLink] = useState<string | null>(null);
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const hasTracked = useRef(false);
  const { user } = useAuth();

  // Fetch short URL for this promoter and campaign
  const fetchPromoterShortUrl = async () => {
    if (!user?.id || !params.id) return;

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/url-shortener/promoter-link`,
        {
          params: {
            campaignId: params.id,
            promoterId: user.id,
          },
        }
      );
      console.log(response.data);

      if (response.data && response.data.shortUrl) {
        setPromotionalLink(response.data.shortUrl);
      }
    } catch (error) {
      console.error("Error fetching promoter short URL:", error);
      // If there's an error, we'll leave the promotional link as null
      // and show the generate button
    }
  };
  console.log(promotionalLink);

  // Generate a short URL for this promoter and campaign
  const generateShortUrl = async () => {
    if (!user?.id || !campaign) return;

    try {
      setIsGeneratingLink(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/url-shortener/shorten`,
        {
          originalUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}`,
          campaignId: campaign.id,
          promoterId: user.id,
        }
      );

      if (response.data && response.data.shortUrl) {
        setPromotionalLink(response.data.shortUrl);
        toast.success("Promotional link generated!", {
          description: "Your unique tracking link is ready to share",
        });

        // Track link generation
        // analyticsService.trackEvent(campaign.id, "click", {
        //   interactionType: "link_generation",
        //   action: "generate",
        // });
      }
    } catch (error) {
      console.error("Error generating short URL:", error);
      toast.error("Failed to generate link", {
        description: "Please try again later",
      });
    } finally {
      setIsGeneratingLink(false);
    }
  };

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await promoterService.getCampaign(params.id as string);
        setCampaign(response);
        if (!hasTracked.current && user?.id) {
          await analyticsService.trackPageView(params.id as string, user.id);
          hasTracked.current = true;
        }
      } catch (error) {
        console.error("Error fetching campaign:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchCampaign();
    }
  }, [params.id, user?.id]);

  // Fetch the promoter's short URL when the campaign loads
  useEffect(() => {
    if (campaign && user?.id) {
      fetchPromoterShortUrl();
    }
  }, [campaign, user?.id]);

  if (isLoading) {
    return (
      <div className="space-y-8 p-8">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-[400px]" />
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600">Campaign not found</h1>
        <Button
          className="mt-4"
          variant="outline"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    );
  }

  const handleApply = async () => {
    if (!campaign) return;

    try {
      setIsSubmitting(true);
      await promoterService.applyCampaign(campaign.id, {
        platforms: selectedPlatforms,
        note: applicationNote,
      });

      toast.success("Application Submitted", {
        description:
          "We'll notify you when the advertiser reviews your application.",
      });

      router.refresh();
      setShowApplicationForm(false);
    } catch (error: any) {
      console.error("Error applying to campaign:", error?.response?.data);
      toast.error(
        error?.response?.data?.message || "Failed to submit application"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Campaigns
          </Button>
          <h1 className="text-3xl font-bold">{campaign.title}</h1>
          <p className="mt-2 text-gray-600">{campaign.description}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Social Interactions */}
        <div className="border-b pb-4">
          <CampaignSocialInteractions
            campaignId={campaign.id}
            initialLikes={0}
            initialComments={[]}
            onLike={async () => {
              await analyticsService.trackEvent(campaign.id, "click", {
                interactionType: "campaign_view",
                action: "like",
              });
            }}
            onComment={async (comment) => {
              await analyticsService.trackEvent(campaign.id, "click", {
                interactionType: "campaign_view",
                action: "comment",
                content: comment,
              });
            }}
          />
        </div>

        {/* Campaign Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Campaign Details</h2>
            <div className="space-y-4">
              {/* <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-blue-600 mr-2" />
                <div>
                  <div className="text-sm text-gray-600">Price per Post</div>
                  <div className="font-semibold">${campaign.pricePerPost}</div>
                </div>
              </div> */}
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                <div>
                  <div className="text-sm text-gray-600">End Date</div>
                  <div className="font-semibold">
                    {new Date(campaign.endDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-blue-600 mr-2" />
                <div>
                  <div className="text-sm text-gray-600">
                    Required Platforms
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {campaign.requiredPlatforms.map((platform) => (
                      <span
                        key={platform}
                        className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-md font-medium"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-blue-600 mr-2" />
                <div>
                  <div className="text-sm text-gray-600">Target Niches</div>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {campaign.targetedNiches.map((niche) => (
                      <span
                        key={niche}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium"
                      >
                        {niche}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Advertiser Info */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Advertiser</h2>
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center shadow-sm border border-gray-100">
                {campaign.advertiser.logo ? (
                  <img
                    src={campaign.advertiser.logo}
                    alt={campaign.advertiser.companyName}
                    className="h-full w-full rounded-lg object-cover"
                  />
                ) : (
                  <span className="text-2xl font-semibold text-blue-600">
                    {campaign.advertiser.companyName.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  {campaign.advertiser.companyName}
                </h3>
                <p className="text-sm text-gray-600">Verified Advertiser</p>
              </div>
            </div>
          </Card>

          {/* Campaign Requirements */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Requirements</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Content Guidelines
                </h3>
                <p className="mt-1 text-sm">
                  Create engaging content that highlights our brand values and
                  resonates with your audience.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Deliverables
                </h3>
                <ul className="mt-1 text-sm space-y-1">
                  <li>• High-quality photos or videos</li>
                  <li>• Authentic storytelling</li>
                  <li>• Brand message integration</li>
                  <li>• Proper hashtag usage</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Content Assets */}
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Content Assets</h3>
          <div className="w-full max-w-4xl mx-auto">
            {campaign?.contentAssets?.[0]?.type === "carousel" ? (
              // Carousel View
              <div className="relative px-4">
                <Carousel
                  onSelect={(index) => {
                    analyticsService.trackCarouselSlide(campaign.id, index);
                  }}
                >
                  <CarouselContent>
                    {campaign.contentAssets
                      .filter((asset) => asset.type === "carousel")
                      .map((asset, index) => (
                        <CarouselItem key={asset.url || index}>
                          <div className="overflow-hidden rounded-xl">
                            <div className="relative aspect-[16/9] bg-gray-100">
                              <Image
                                src={asset.url}
                                alt={`Content asset ${index + 1}`}
                                fill
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
                          </div>
                        </CarouselItem>
                      ))}
                  </CarouselContent>
                  <CarouselPrevious className="-left-3 h-12 w-12 border-2 bg-white/90 hover:bg-white" />
                  <CarouselNext className="-right-3 h-12 w-12 border-2 bg-white/90 hover:bg-white" />
                </Carousel>
              </div>
            ) : campaign.contentAssets[0]?.type === "video" ? (
              // Video View
              <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                <video
                  src={campaign.contentAssets[0].url}
                  controls
                  className="w-full h-full"
                  onPlay={() => analyticsService.trackVideoPlay(campaign.id)}
                  onEnded={() =>
                    analyticsService.trackVideoComplete(campaign.id)
                  }
                >
                  Your browser does not support the video tag.
                </video>
                <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                  {Math.round(campaign.contentAssets[0]?.duration as number)}s
                </div>
                {campaign?.contentAssets?.[0]?.size != null && (
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    {Math.round(campaign.contentAssets[0].size / 1024)} KB
                  </div>
                )}
              </div>
            ) : (
              campaign.contentAssets.length > 0 && (
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src={campaign.contentAssets[0].url}
                    alt={campaign.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 75vw"
                    className="object-cover"
                />
                <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                  {campaign.contentAssets[0].contentType}
                </div>
                {campaign?.contentAssets?.[0]?.size != null && (
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    {Math.round(campaign.contentAssets[0].size / 1024)} KB
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Content Requirements */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Content Requirements</h2>

          {/* Content Assets */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Campaign Stats */}
            {/* <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Campaign Details</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                  <div>
                    <div className="text-sm text-gray-600">End Date</div>
                    <div className="font-semibold">
                      {new Date(campaign.endDate).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-blue-600 mr-2" />
                  <div>
                    <div className="text-sm text-gray-600">
                      Required Platforms
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {campaign.requiredPlatforms.map((platform) => (
                        <span
                          key={platform}
                          className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-md font-medium"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-blue-600 mr-2" />
                  <div>
                    <div className="text-sm text-gray-600">Target Niches</div>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {campaign.targetedNiches.map((niche) => (
                        <span
                          key={niche}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium"
                        >
                          {niche}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card> */}

            {/* Content Assets */}
          </div>

          {/* Guidelines */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Guidelines</h3>
            <p className="text-gray-600">
              {campaign.requirements.contentGuidelines}
            </p>
          </div>

          {/* Posting Schedule */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Posting Schedule</h3>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-4 w-4" />
              <span>
                {campaign.requirements.postingSchedule.startTime} -{" "}
                {campaign.requirements.postingSchedule.endTime}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {campaign.requirements.postingSchedule.days.map((day) => (
                <span
                  key={day}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {day}
                </span>
              ))}
            </div>
          </div>

          {/* Hashtags and Mentions */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Hash className="h-4 w-4" /> Hashtags
              </h3>
              <div className="flex flex-wrap gap-2">
                {campaign.requirements.hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <AtSign className="h-4 w-4" /> Mentions
              </h3>
              <div className="flex flex-wrap gap-2">
                {campaign.requirements.mentions.map((mention) => (
                  <span
                    key={mention}
                    className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm"
                  >
                    @{mention}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Brand Assets */}
          <div>
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <LinkIcon className="h-4 w-4" /> Brand Assets
            </h3>
            <div className="space-y-2">
              {campaign?.requirements?.brandAssetLinks?.map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-blue-600"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </Card>

        {/* Campaign Metrics */}
        {/* <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Campaign Performance</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Total Reach</p>
              <p className="text-2xl font-bold mt-1">
                {campaign?.metrics?.totalReach || 0}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Total Posts</p>
              <p className="text-2xl font-bold mt-1">
                {campaign?.metrics?.totalPosts || 0}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Engagements</p>
              <p className="text-2xl font-bold mt-1">
                {campaign?.metrics?.totalEngagements || 0}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Engagement Rate</p>
              <p className="text-2xl font-bold mt-1">
                {campaign?.metrics?.averageEngagementRate || 0}%
              </p>
            </div>
          </div>
        </Card> */}
      </div>

      {/* Right Column */}
      <div className="space-y-8">
        {/* Advertiser Card */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Advertiser</h2>
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center shadow-sm border border-gray-100">
              {campaign.advertiser.logo ? (
                <img
                  src={campaign.advertiser.logo}
                  alt={campaign.advertiser.companyName}
                  className="h-full w-full rounded-lg object-cover"
                />
              ) : (
                <span className="text-2xl font-semibold text-blue-600">
                  {campaign.advertiser.companyName.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-lg">
                {campaign.advertiser.companyName}
              </h3>
              <p className="text-sm text-gray-600">Verified Advertiser</p>
            </div>
          </div>
        </Card>

        {/* Platforms & Niches */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Requirements</h2>

          {/* Platforms */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-600 mb-3">
              Required Platforms
            </h3>
            <div className="flex flex-wrap gap-2">
              {campaign.requiredPlatforms.map((platform) => (
                <span
                  key={platform}
                  className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>

          {/* Niches */}
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-3">
              Target Niches
            </h3>
            <div className="flex flex-wrap gap-2">
              {campaign.targetedNiches.map((niche) => (
                <span
                  key={niche}
                  className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm font-medium"
                >
                  {niche}
                </span>
              ))}
            </div>
          </div>
        </Card>

        {/* Device Metrics */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Device Distribution</h2>
          <div className="grid grid-cols-3 gap-4">
            {(["mobile", "desktop", "tablet"] as const).map((device) => {
              console.log("checking device:", device);
              console.log("byDevice:", campaign?.metrics?.byDevice);
              const deviceMetrics = campaign?.metrics?.byDevice?.[device] || {
                uniqueViews: 0,
                clicks: 0,
                conversions: 0,
              };
              console.log("deviceMetrics for " + device + ":", deviceMetrics);

              return (
                <div key={device} className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    {device.charAt(0).toUpperCase() + device.slice(1)}
                  </p>
                  <div>
                    <p className="text-2xl font-bold mt-1">
                      {deviceMetrics.uniqueViews}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">unique views</p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm">{deviceMetrics.clicks} clicks</p>
                    <p className="text-sm">
                      {deviceMetrics.conversions} conversions
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Promotional Tools */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Promotional Tools</h2>
          {/* Social Share Section */}
          {/* <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-6">Share Campaign</h2>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="w-full flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white border-none"
                onClick={() => {
                  const url = `${window.location.href}?utm_source=copy&utm_medium=share&utm_campaign=campaign_share`;
                  navigator.clipboard.writeText(url).then(() => {
                    toast({
                      title: "Link copied!",
                      description: "Campaign link has been copied to your clipboard"
                    });
                  });
                }}
              >
                <Share2 className="h-4 w-4" />
                Copy Campaign Link
              </Button>
            </div>
          </Card> */}

          <Tabs defaultValue="link" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="link">
                <Share2 className="h-4 w-4 mr-2" />
                Link
              </TabsTrigger>
              <TabsTrigger value="qr">
                <QrCode className="h-4 w-4 mr-2" />
                QR Code
              </TabsTrigger>

              <TabsTrigger value="metrics">
                <BarChart className="h-4 w-4 mr-2" />
                Metrics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="link">
              <div className="space-y-4">
                <div className="flex flex-col gap-4">
                  {/* Original Promotional Link */}
                  <div className="flex items-center gap-2">
                    {promotionalLink ? (
                      <>
                        <input
                          type="text"
                          value={promotionalLink}
                          readOnly
                          className="flex-1 px-3 py-2 border rounded-md bg-gray-50"
                        />
                        <Button
                          variant="outline"
                          onClick={() => {
                            navigator.clipboard.writeText(promotionalLink);
                            toast.success("Link Copied!", {
                              description:
                                "Promotional link copied to clipboard",
                              duration: 3000,
                            });

                            analyticsService.trackEvent(campaign.id, "click", {
                              interactionType: "link_copy",
                              action: "copy",
                              platform: "direct",
                            });
                          }}
                        >
                          Copy
                        </Button>
                      </>
                    ) : (
                      <>
                        <input
                          type="text"
                          value="Generate your unique promotional link"
                          readOnly
                          className="flex-1 px-3 py-2 border rounded-md bg-gray-50 text-gray-500"
                        />
                        <Button
                          variant="outline"
                          onClick={generateShortUrl}
                          disabled={isGeneratingLink}
                        >
                          {isGeneratingLink ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Generating...
                            </>
                          ) : (
                            "Generate Link"
                          )}
                        </Button>
                      </>
                    )}
                  </div>

                  {promotionalLink && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-600">
                        Platform-specific Links
                      </h3>
                      {campaign.requiredPlatforms.map((platform) => (
                        <div key={platform} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={`${promotionalLink}?utm_source=${platform.toLowerCase()}&utm_medium=social&utm_campaign=${campaign.id}`}
                            readOnly
                            className="flex-1 px-3 py-2 border rounded-md bg-gray-50"
                          />
                          <Button
                            variant="outline"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                `${promotionalLink}?utm_source=${platform.toLowerCase()}&utm_medium=social&utm_campaign=${campaign.id}`
                              );
                              toast.success("Link Copied!", {
                                description: `${platform} promotional link copied to clipboard`,
                                duration: 3000,
                              });

                              // Track copy event with platform
                              analyticsService.trackEvent(
                                campaign.id,
                                "click",
                                {
                                  interactionType: "link_copy",
                                  action: "copy",
                                  platform: platform.toLowerCase(),
                                }
                              );
                            }}
                          >
                            Copy {platform}
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="qr">
              {promotionalLink ? (
                <div className="flex flex-col items-center space-y-4">
                  <QRCodeSVG
                    value={promotionalLink}
                    size={200}
                    includeMargin
                    level="H"
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      const canvas = document.createElement("canvas");
                      const svg = document.querySelector("svg");
                      const svgData = new XMLSerializer().serializeToString(
                        svg!
                      );
                      const img = document.createElement("img");
                      img.onload = () => {
                        canvas.width = img.width;
                        canvas.height = img.height;
                        canvas.getContext("2d")!.drawImage(img, 0, 0);
                        const a = document.createElement("a");
                        a.download = `${campaign.title}-qr.png`;
                        a.href = canvas.toDataURL("image/png");
                        a.click();

                        toast.success("QR Code Downloaded", {
                          description:
                            "QR code has been saved to your downloads",
                          duration: 3000,
                        });

                        // Track QR code download
                        analyticsService.trackEvent(campaign.id, "click", {
                          interactionType: "link_copy",
                          action: "download",
                        });
                      };
                      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
                    }}
                  >
                    Download QR Code
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-4 p-8">
                  <div className="text-center p-8 border border-dashed rounded-lg">
                    <QrCode className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500 mb-4">
                      Generate your promotional link first to view QR code
                    </p>
                    <Button
                      onClick={generateShortUrl}
                      disabled={isGeneratingLink}
                    >
                      {isGeneratingLink ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Generating Link...
                        </>
                      ) : (
                        "Generate Promotional Link"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="preview">
              <div className="grid grid-cols-2 gap-4">
                {campaign.contentAssets.map((asset, index) => (
                  <Card key={index} className="p-4 space-y-2">
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                      <Image
                        src={asset.url}
                        alt={`Preview ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-medium">{asset.type}</p>
                      <p className="text-xs text-gray-500">
                        {Math.round((asset?.size || 0) / 1024)} KB
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="metrics">
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4">
                  <p className="text-sm text-gray-600">Link Copies</p>
                  <p className="text-2xl font-bold">
                    {campaign?.metrics?.promoterEngagement?.clickCount || 0}
                  </p>
                </Card>
                <Card className="p-4">
                  <p className="text-sm text-gray-600">Unique Promoter Views</p>
                  <p className="text-2xl font-bold">
                    {campaign?.metrics?.uniquePromoterViews || 0}
                  </p>
                </Card>
                <Card className="p-4">
                  <p className="text-sm text-gray-600">QR Downloads</p>
                  <p className="text-2xl font-bold">
                    {campaign?.metrics?.promoterEngagement?.qrDownloads || 0}
                  </p>
                </Card>
                <Card className="p-4">
                  <p className="text-sm text-gray-600">Conversions</p>
                  <p className="text-2xl font-bold">
                    {campaign?.metrics?.totalConversions || 0}
                  </p>
                </Card>
                <Card className="p-4">
                  <p className="text-sm text-gray-600">Engagement Rate</p>
                  <p className="text-2xl font-bold">
                    {campaign?.metrics?.averageEngagementRate || 0}%
                  </p>
                </Card>

                {campaign?.metrics?.promoterEngagement?.linkCopiesByPlatform &&
                  Object.keys(
                    campaign.metrics.promoterEngagement.linkCopiesByPlatform
                  ).length > 0 && (
                    <Card className="p-4 col-span-2">
                      <p className="text-sm font-medium text-gray-600 mb-2">
                        Link Copies by Platform
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {Object.entries(
                          campaign.metrics.promoterEngagement
                            .linkCopiesByPlatform
                        ).map(([platform, count]) => (
                          <div
                            key={platform}
                            className="flex items-center justify-between border rounded p-2"
                          >
                            <span className="capitalize">{platform}</span>
                            <span className="font-medium">{count}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Application Form Dialog */}
        {showApplicationForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-lg space-y-6 p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Apply for Campaign</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowApplicationForm(false)}
                >
                  ×
                </Button>
              </div>

              <div className="space-y-6">
                {/* Campaign Summary */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Campaign Summary</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Price per Post</p>
                      <p className="font-medium">${campaign.pricePerPost}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">End Date</p>
                      <p className="font-medium">
                        {new Date(campaign.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Platform Selection */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Select Platforms</h3>
                  <div
                    className={cn(
                      "flex flex-wrap gap-2",
                      isSubmitting && "opacity-50 pointer-events-none"
                    )}
                  >
                    {campaign.requiredPlatforms.map((platform) => (
                      <Button
                        key={platform}
                        variant={
                          selectedPlatforms.includes(platform)
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => {
                          setSelectedPlatforms((prev) =>
                            prev.includes(platform)
                              ? prev.filter((p) => p !== platform)
                              : [...prev, platform]
                          );
                        }}
                      >
                        {platform}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Application Note */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Application Note</h3>
                  <textarea
                    className={cn(
                      "w-full min-h-[120px] p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500",
                      isSubmitting && "opacity-50 cursor-not-allowed"
                    )}
                    disabled={isSubmitting}
                    placeholder="Tell the advertiser why you'd be a great fit for this campaign..."
                    value={applicationNote}
                    onChange={(e) => setApplicationNote(e.target.value)}
                  />
                </div>

                {/* Requirements Checklist */}
                <div>
                  <h3 className="text-sm font-medium mb-3">
                    Requirements Checklist
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                        ✓
                      </span>
                      <span>Content guidelines reviewed</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                        ✓
                      </span>
                      <span>Posting schedule confirmed</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                        ✓
                      </span>
                      <span>Required hashtags and mentions noted</span>
                    </li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowApplicationForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleApply}
                    disabled={selectedPlatforms.length === 0 || isSubmitting}
                    className="min-w-[120px]"
                  >
                    <span className="flex items-center gap-2">
                      {isSubmitting && (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      )}
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </span>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
