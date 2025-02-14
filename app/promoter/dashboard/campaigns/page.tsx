"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import promoterService from "@/services/promoter";

import { Campaign } from "@/types/campaign";

export default function ActiveCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        // Replace with actual API call
        const response = await promoterService.getActiveCampaigns();
        console.log(response);
        setCampaigns(response);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
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
        .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  console.log(filteredCampaigns);

  if (isLoading) {
    return (
      <div className="space-y-6 p-8">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-6">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold">Active Campaigns</h1>
        <p className="mt-2 text-gray-600">
          View and manage your ongoing promotional campaigns
        </p>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search campaigns or brands..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Campaigns</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="new">New</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCampaigns?.map((campaign) => (
          <Card
            key={campaign.id}
            className="p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between space-x-4">
              <div className="flex items-start space-x-3 flex-1">
                {campaign.advertiser.logo ? (
                  <img
                    src={campaign.advertiser.logo}
                    alt="Brand logo"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-lg font-semibold text-gray-500">
                      {campaign.advertiser.companyName.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold truncate">
                    {campaign.title}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">
                    {campaign.advertiser.companyName}
                  </p>
                </div>
              </div>
              <span
                className={`shrink-0 px-2 py-1 rounded text-xs font-medium ${
                  campaign.applicationStatus === "approved"
                    ? "bg-green-100 text-green-800"
                    : campaign.applicationStatus === "rejected"
                      ? "bg-red-100 text-red-800"
                      : campaign.applicationStatus === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                }`}
              >
                {campaign.applicationStatus
                  ? campaign.applicationStatus.charAt(0).toUpperCase() +
                    campaign.applicationStatus.slice(1)
                  : "New"}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <p className="text-sm text-gray-600 line-clamp-2">
                {campaign.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {campaign.targetedNiches.map((niche) => (
                  <span
                    key={niche}
                    className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700"
                  >
                    {niche}
                  </span>
                ))}
              </div>

              <div className="pt-3 border-t border-gray-100">
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <span className="text-gray-500">Per post:</span>
                    <span className="ml-1 font-semibold">
                      ${campaign.pricePerPost}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Until:</span>
                    <span className="ml-1">
                      {new Date(campaign.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  {campaign.requiredPlatforms.map((platform) => (
                    <span
                      key={platform}
                      className="text-xs px-2 py-1 bg-gray-50 rounded text-gray-600"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>

              <Button
                className="w-full mt-2"
                variant={campaign.applicationStatus ? "secondary" : "default"}
                disabled={campaign.applicationStatus === "rejected"}
                onClick={() => {
                  window.location.href = `/promoter/campaigns/${campaign.id}`;
                }}
              >
                {campaign.applicationStatus === "approved"
                  ? "View Details"
                  : campaign.applicationStatus === "rejected"
                    ? "Application Rejected"
                    : campaign.applicationStatus === "pending"
                      ? "Application Pending"
                      : "Apply Now"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
