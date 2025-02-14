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
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BrowseCampaigns() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [nicheFilter, setNicheFilter] = useState("all");

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await promoterService.getMarketplace();
        // Combine and deduplicate campaigns based on id
        const allCampaigns = [
          ...response.marketplaceCampaigns,
          ...response.availableCampaigns,
        ];
        const uniqueCampaigns = Array.from(
          new Map(
            allCampaigns.map((campaign) => [campaign.id, campaign])
          ).values()
        );
        setCampaigns(uniqueCampaigns);
      } catch (error) {
        console.error("Error fetching marketplace campaigns:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

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
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold">Browse Campaigns</h1>
        <p className="mt-2 text-gray-600">
          Find campaigns that match your interests
        </p>
      </div>

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
            <SelectItem value="tech">Tech</SelectItem>
            <SelectItem value="fitness">Fitness</SelectItem>
            <SelectItem value="food">Food</SelectItem>
            <SelectItem value="travel">Travel</SelectItem>
            <SelectItem value="gaming">Gaming</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCampaigns?.map((campaign) => (
          <Card
            key={campaign.id}
            className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50"
          >
            {/* Card Header with Company Info */}
            <div className="p-6 pb-4 border-b border-gray-100">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center shadow-sm border border-gray-100">
                    {campaign.advertiser.logo ? (
                      <img
                        src={campaign.advertiser.logo}
                        alt={campaign.advertiser.companyName}
                        className="h-full w-full rounded-lg object-cover"
                      />
                    ) : (
                      <span className="text-lg font-semibold text-blue-600">
                        {campaign.advertiser.companyName.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 truncate">
                      {campaign.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {campaign.advertiser.companyName}
                    </p>
                  </div>
                </div>
                {campaign.applicationStatus && (
                  <span
                    className={`shrink-0 px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap ${
                      campaign.applicationStatus === "approved"
                        ? "bg-green-50 text-green-700 ring-1 ring-green-600/20"
                        : campaign.applicationStatus === "pending"
                          ? "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20"
                          : "bg-red-50 text-red-700 ring-1 ring-red-600/20"
                    }`}
                  >
                    {campaign.applicationStatus.charAt(0).toUpperCase() +
                      campaign.applicationStatus.slice(1)}
                  </span>
                )}
              </div>

              <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                {campaign.description}
              </p>
            </div>

            {/* Card Body */}
            <div className="p-6 pt-4 space-y-4">
              {/* Price and Date */}
              <div className="flex items-center justify-between gap-3">
                <div className="bg-blue-50 px-3 py-2 rounded-lg min-w-[120px]">
                  <div className="text-xs font-medium text-blue-600 uppercase">
                    Price per post
                  </div>
                  <div className="text-lg font-bold text-blue-700">
                    ${campaign.pricePerPost}
                  </div>
                </div>
                <div className="text-right bg-gray-50 px-3 py-2 rounded-lg min-w-[100px]">
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
              </div>

              {/* Niches */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-gray-500 uppercase">
                  Target Niches
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-[80px] overflow-y-auto">
                  {campaign.targetedNiches.map((niche) => (
                    <span
                      key={niche}
                      className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium hover:bg-gray-200 transition-colors duration-200"
                    >
                      {niche}
                    </span>
                  ))}
                </div>
              </div>

              {/* Platforms */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-gray-500 uppercase">
                  Required Platforms
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-[80px] overflow-y-auto">
                  {campaign.requiredPlatforms.map((platform) => (
                    <span
                      key={platform}
                      className="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs rounded-md font-medium hover:bg-blue-100 transition-colors duration-200"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>

              {/* Apply Button */}
              <Button
                className="w-full mt-2 font-medium shadow-sm hover:shadow-md transition-all duration-200"
                variant={campaign.applicationStatus ? "secondary" : "default"}
                disabled={campaign.applicationStatus === "pending"}
                onClick={() => router.push(`/promoter/dashboard/marketplace/campaign/${campaign.id}`)}
              >
                {campaign.applicationStatus ? "View Details" : "Apply Now"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
