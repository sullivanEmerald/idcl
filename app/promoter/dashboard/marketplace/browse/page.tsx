/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Campaign } from "@/types/campaign";
import promoterService from "@/services/promoter";
import { Search, Heart, MessageCircle, Share2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { brandService } from "@/services/brand";
import { useToast } from "@/hooks/use-toast";

export default function BrowseCampaigns() {
  const router = useRouter();
  const { toast } = useToast();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [nicheFilter, setNicheFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalCampaigns, setTotalCampaigns] = useState(0);
  const [likedCampaigns, setLikedCampaigns] = useState<Set<string>>(new Set());

  // Add color generation function
  const backgroundColors = [
    "bg-green-100",
    "bg-blue-100",
    "bg-purple-100",
    "bg-yellow-100",
    "bg-pink-100",
    "bg-indigo-100",
    "bg-red-100",
    "bg-orange-100",
  ];

  const textColors = [
    "text-green-600",
    "text-blue-600",
    "text-purple-600",
    "text-yellow-600",
    "text-pink-600",
    "text-indigo-600",
    "text-red-600",
    "text-orange-600",
  ];

  const getAdvertiserColorIndex = (advertiserId: string) => {
    // Simple hash function to get consistent index
    let hash = 0;
    for (let i = 0; i < advertiserId.length; i++) {
      hash = (hash << 5) - hash + advertiserId.charCodeAt(i);
      hash = hash & hash; // Convert to 32-bit integer
    }
    // Ensure positive index within array bounds
    return Math.abs(hash) % backgroundColors.length;
  };

  const handleFollowBrand = async (
    brandId: string,
    isFollowing: boolean | undefined
  ) => {
    try {
      if (isFollowing) {
        await brandService.unfollowBrand(brandId);
        toast({
          title: "Brand unfollowed successfully",
        });
      } else {
        await brandService.followBrand(brandId);
        toast({
          title: "Brand followed successfully",
        });
      }

      // Update the campaigns state to reflect the new following status
      setCampaigns(
        campaigns.map((campaign) => {
          if (campaign.advertiser.id === brandId) {
            return {
              ...campaign,
              advertiser: {
                ...campaign.advertiser,
                isFollowing: !isFollowing,
              },
            };
          }
          return campaign;
        })
      );
    } catch (error) {
      console.error(
        `Failed to ${isFollowing ? "unfollow" : "follow"} brand:`,
        error
      );
      toast({
        title: `Failed to ${isFollowing ? "unfollow" : "follow"} brand`,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await promoterService.getMarketplace(currentPage);
        console.log(response);
        setCampaigns(response.campaigns);
        setTotalPages(response.pagination.totalPages);
        setHasMore(response.pagination.hasMore);
        setTotalCampaigns(response.pagination.total);
      } catch (error) {
        console.error("Error fetching marketplace campaigns:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, [currentPage]);

  const filteredCampaigns = campaigns?.filter((campaign) => {
    const matchesSearch =
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.advertiser.companyName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesNiche =
      nicheFilter === "all" || campaign.targetedNiches.includes(nicheFilter);
    return matchesSearch && matchesNiche;
  });

  if (isLoading) {
    return (
      <div className="space-y-8 p-8">
        <div>
          <h1 className="text-3xl font-bold">Browse Campaigns</h1>
          <p className="mt-2 text-gray-600">
            Find campaigns that match your interests
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-[300px]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div>
        <h1 className="text-[24px] font-bold">Browse Campaigns</h1>
        <p className=" font-[300px] text-[16px]">
          Find campaigns that match your interests
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 border border-gray p-2 bg-white rounded-md h-[61px]">
        <div className="relative flex-1">
          <img
            src="/Vector.png"
            alt="Search"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
          <Input
            placeholder="Search campaigns..."
            className="pl-14 border-none h-full focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="h-full">
          <Select value={nicheFilter} onValueChange={setNicheFilter}>
            <SelectTrigger className="w-full sm:w-[200px] h-full focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none">
              <SelectValue placeholder="Filter by niche" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Niches</SelectItem>
              <SelectItem value="fashion">Fashion</SelectItem>
              <SelectItem value="tech">Tech</SelectItem>
              <SelectItem value="fitness">Fitness</SelectItem>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="travel">Travel</SelectItem>
              <SelectItem value="gaming">Gaming</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {filteredCampaigns?.map((campaign) => (
          <Card
            key={campaign.id}
            className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray p-2 min-h-[445px] w-full md:w-[379px] xl:w-[280px]"
            onClick={() =>
              router.push(
                `/promoter/dashboard/marketplace/campaign/${campaign.id}`
              )
            }
          >
            {/* Cover Image or Video */}
            <div className="relative aspect-video w-full overflow-hidden group h-[216px]">
              <div className="absolute top-0 w-full flex items-center justify-between p-2 z-10">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    backgroundColors[
                      getAdvertiserColorIndex(campaign.advertiser.id)
                    ]
                  }`}
                >
                  <span
                    className={`text-sm font-semibold ${
                      textColors[
                        getAdvertiserColorIndex(campaign.advertiser.id)
                      ]
                    }`}
                  >
                    {campaign.advertiser.companyName.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <img src="/share.png" alt="Share" className="h-8 w-auto" />
              </div>

              <div className="absolute bottom-0 w-full flex items-center justify-between p-2 z-10">
                <div className="h-8 w-[110px] bg-white flex items-center justify-around rounded-md">
                  <div className="flex items-center gap-1 text-[11px]">
                    <img src="/like.png" alt="like" />
                    {campaign.metrics?.totalUserClicks || 0}
                  </div>
                  <div className="flex items-center gap-1 text-[11px]">
                    <img src="/comment.png" alt="like" />{" "}
                    {campaign.metrics?.uniqueClicks || 0}
                  </div>
                  <div className="flex items-center gap-1 text-[11px]">
                    <img src="/eye.png" alt="like" />{" "}
                    {campaign.metrics?.totalViews || 0}
                  </div>
                </div>
                <div
                  className={`text-[10px] min-w-[47px] h-[21px] rounded-sm font-semibold p-4 flex items-center justify-center ${campaign.campaignGoal === "awareness" ? "bg-[#C2FFDB] text-[#00A142]" : campaign.campaignGoal === "engagement" ? "bg-[#FFC2F8] text-[#8C00A1]" : "bg-[#FFF9C2] text-[#A19900]"}`}
                >
                  {campaign.campaignGoal}
                </div>
              </div>
              <Image
                src={campaign.coverImage}
                alt={campaign.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-md"
              />
              {campaign.contentAssets?.some(
                (asset) => asset.type === "video"
              ) && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <video
                    src={
                      campaign.contentAssets.find(
                        (asset) => asset.type === "video"
                      )?.url
                    }
                    poster={campaign.coverImage}
                    preload="none"
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                  />
                </div>
              )}

              {/* <div className="absolute flex items-center w-full justify-between bottom-4 right-0 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-none shadow-sm text-right space-y-1">
                <div>
                  <div className="text-xs font-medium text-gray-600 uppercase">
                    Starts
                  </div>
                  <div className="text-sm font-semibold text-gray-900">
                    {new Date(campaign.startDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-600 uppercase">
                    Ends
                  </div>
                  <div className="text-sm font-semibold text-gray-900">
                    {new Date(campaign.endDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div> */}
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h5 className="font-bold text-[12px] mt-4 h-[50px]">
                {" "}
                {campaign.title}{" "}
              </h5>

              <div className="flex items-center justify-between border border-gray px-2 h-[27px] rounded-md">
                <p className=" text-gray-500 text-[12px] font-normal">
                  {campaign.advertiser.companyName}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFollowBrand(
                      campaign.advertiser.id,
                      campaign.advertiser.isFollowing
                    );
                  }}
                  className={`text-xs font-semibold cursor-pointer ${
                    campaign.advertiser.isFollowing
                      ? "text-gray-600"
                      : "text-[#34A4FF]"
                  }`}
                >
                  {campaign.advertiser.isFollowing ? "Following" : "Follow +"}
                </button>
              </div>

              <div className="bg-[#F8FBFC] min-h-[97px] rounded-md p-2">
                <div className="flex items-center justify-between border-dashed border-gray-200 border-2 rounded-md flex-wrap h-full">
                  <div className="border-r border-dashed border-gray-200 p-2 w-[50%]">
                    <p className="text-[10px] font-[300px]">Starts</p>
                    <p className="text-[12px] font-semibold">
                      {new Date(campaign.startDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>
                  <div className="p-2 w-[50%] text-right">
                    <p className="text-[10px] font-[300px]">Ends</p>
                    <p className="text-[12px] font-semibold">
                      {new Date(campaign.endDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="border-r border-dashed border-gray-200 p-2 w-[50%]">
                    <p className="text-[10px] font-[300px]">
                      Per{" "}
                      {campaign.campaignGoal === "awareness"
                        ? "View"
                        : campaign.campaignGoal === "engagement"
                          ? "Engagement"
                          : "Conversion"}
                    </p>
                    <p className="text-[12px] font-semibold">
                      ₦{campaign.pricePerPost}
                    </p>
                  </div>
                  <div className="p-2 w-[50%] text-right">
                    <p className="text-[10px] font-[300px]">Engagement Rate</p>
                    <p className="text-[12px] font-semibold">
                      {(campaign.metrics?.averageEngagementRate * 100).toFixed(
                        1
                      )}
                      %
                    </p>
                  </div>
                </div>
              </div>
              <button
                className="w-full bg-[#00A0F1] rounded-lg cursor-pointer text-white text-[12px] font-semibold py-2"
                onClick={() =>
                  router.push(
                    `/promoter/dashboard/marketplace/campaign/${campaign.id}`
                  )
                }
              >
                View Campaign
              </button>
              {/* Header */}
              {/* <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center border border-gray-100">
                  <span className="text-sm font-semibold text-blue-600">
                    {campaign.advertiser.companyName.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                    {campaign.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {campaign.advertiser.companyName}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFollowBrand(
                      campaign.advertiser.id,
                      campaign.advertiser.isFollowing
                    );
                  }}
                >
                  {campaign.advertiser.isFollowing ? "Following" : "Follow"}
                </Button>
              </div> */}

              {/* Campaign Metrics */}
              {/* <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div className="text-left">
                  <div className="text-lg font-semibold text-blue-600">
                    ₦
                    {campaign.campaignGoal === "awareness"
                      ? campaign.pricePerPost * 0.5
                      : campaign.campaignGoal === "engagement"
                        ? campaign.pricePerPost * 0.5
                        : campaign.pricePerPost * 0.6}
                  </div>
                  <div className="text-xs text-gray-500">Per Post</div>
                </div>
                {campaign.campaignGoal === "engagement" ? (
                  <div className="text-left">
                    <div className="text-lg font-semibold text-green-600">
                      {(campaign.metrics?.averageEngagementRate * 100).toFixed(
                        1
                      )}
                      %
                    </div>
                    <div className="text-xs text-gray-500">Engagement Rate</div>
                  </div>
                ) : (
                  <div className="text-left">
                    <div className="text-lg font-semibold text-green-600">
                      {campaign.metrics?.totalReach?.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">Total Reach</div>
                  </div>
                )}
              </div> */}

              {/* <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="flex space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex items-center space-x-1 ${likedCampaigns.has(campaign.id) ? "text-red-500" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLikedCampaigns((prev) => {
                        const newSet = new Set(prev);
                        if (prev.has(campaign.id)) {
                          newSet.delete(campaign.id);
                        } else {
                          newSet.add(campaign.id);
                        }
                        return newSet;
                      });
                    }}
                  >
                    <Heart
                      className={`h-4 w-4 ${likedCampaigns.has(campaign.id) ? "fill-current" : ""}`}
                    />
                    <span>{campaign.metrics?.totalEngagements || 0}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(
                        `/promoter/dashboard/marketplace/campaign/${campaign.id}#comments`
                      );
                    }}
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>{campaign.metrics?.totalPosts || 0}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Implement share functionality
                      navigator
                        .share({
                          title: campaign.title,
                          text: campaign.description,
                          url: window.location.href,
                        })
                        .catch(console.error);
                    }}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div> */}

              {/* Tags */}
              <div className="space-y-3">
                {/* Platforms */}
                {/* <div className="flex flex-wrap gap-1.5">
                  {campaign.requiredPlatforms.map((platform) => (
                    <span
                      key={platform}
                      className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-md font-medium"
                    >
                      {platform}
                    </span>
                  ))}
                </div> */}

                {/* Niches */}
                {/* <div className="flex flex-wrap gap-1.5">
                  {campaign.targetedNiches.map((niche) => (
                    <span
                      key={niche}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium"
                    >
                      {niche}
                    </span>
                  ))}
                </div> */}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-8">
        <Button
          variant="outline"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <span className="text-sm text-gray-600">
            ({totalCampaigns} total)
          </span>
        </div>
        <Button
          variant="outline"
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={!hasMore}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
