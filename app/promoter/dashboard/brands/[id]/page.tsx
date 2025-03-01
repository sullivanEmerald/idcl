/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { brandService } from "@/services/brand";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  StarOff,
  Globe,
  Instagram,
  Twitter,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import type { Brand } from "@/services/brand";

export default function BrandDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [brand, setBrand] = useState<Brand | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const loadBrand = async () => {
      try {
        setIsLoading(true);
        const data = await brandService.getBrand(params.id);
        setBrand(data);
      } catch (error: any) {
        toast.error(error.message || "Failed to load brand");
      } finally {
        setIsLoading(false);
      }
    };

    loadBrand();
  }, [params.id]);

  const handleFollowToggle = async (isFollowing: boolean) => {
    if (isUpdating || !brand) return;

    try {
      setIsUpdating(true);
      if (isFollowing) {
        await brandService.unfollowBrand(params.id);
        toast.success("Brand unfollowed successfully");
      } else {
        await brandService.followBrand(params.id);
        toast.success("Brand followed successfully");
      }

      // Update local state
      setBrand({ ...brand, isFollowing: !isFollowing });
    } catch (error: any) {
      toast.error(
        error.message ||
          `Failed to ${isFollowing ? "unfollow" : "follow"} brand`
      );
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 space-y-8 animate-pulse">
        <div className="h-32 bg-gray-200 rounded-lg" />
        <div className="h-8 w-1/3 bg-gray-200 rounded" />
        <div className="h-4 w-1/2 bg-gray-200 rounded" />
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold">Brand not found</h1>
        <p className="mt-2 text-muted-foreground">
          The brand {"you're"} looking for doesn&lsquo;t exist or has been
          removed.
        </p>
        <Button asChild className="mt-4">
          <Link href="/promoter/brands">Back to Brands</Link>
        </Button>
      </div>
    );
  }

  return brand ? (
    <div className="container mx-auto py-8 space-y-8">
      <Card className="p-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-6">
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-24 w-24 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-3xl font-bold">{brand.name}</h1>
                {brand.isVerified && (
                  <Badge
                    variant="secondary"
                    className="flex items-center space-x-1"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    <span>Verified Brand</span>
                  </Badge>
                )}
              </div>
              <p className="text-lg text-muted-foreground mt-1">
                {brand.industry}
              </p>
              <div className="flex items-center space-x-4 mt-4">
                {brand.website && (
                  <a
                    href={brand.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <Globe className="h-5 w-5" />
                  </a>
                )}
                {brand.instagram && (
                  <a
                    href={`https://instagram.com/${brand.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                )}
                {brand.twitter && (
                  <a
                    href={`https://twitter.com/${brand.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="lg"
            onClick={() => handleFollowToggle(brand.isFollowing)}
            disabled={isUpdating}
            className="space-x-2"
          >
            {brand.isFollowing ? (
              <>
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span>Following</span>
              </>
            ) : (
              <>
                <StarOff className="h-5 w-5" />
                <span>Follow</span>
              </>
            )}
          </Button>
        </div>
      </Card>

      <Tabs defaultValue="about" className="space-y-6">
        <TabsList>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">About {brand.name}</h2>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {brand.description}
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Brand Stats</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-2xl font-bold">{brand.followerCount}</p>
                <p className="text-muted-foreground">Followers</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{brand.campaignCount}</p>
                <p className="text-muted-foreground">Total Campaigns</p>
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {brand.activeCampaignCount}
                </p>
                <p className="text-muted-foreground">Active Campaigns</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Active Campaigns</h2>
            {brand &&
            brand?.activeCampaigns &&
            brand?.activeCampaigns?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {brand?.activeCampaigns?.map((campaign) => (
                  <Card key={campaign.id} className="p-4">
                    <Link
                      href={`/promoter/dashboard/campaigns/${campaign.id}`}
                      className="group"
                    >
                      <h3 className="text-lg font-semibold group-hover:text-primary">
                        {campaign.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {campaign.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-4 text-sm">
                        <span>Budget: ${campaign.budget}</span>
                        <span>{campaign.applicantCount} applicants</span>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">
                No active campaigns at the moment.
              </p>
            )}
          </Card>
        </TabsContent>

        {brand && (
          <TabsContent value="requirements" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Collaboration Requirements
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Minimum Followers</h3>
                  <p className="text-muted-foreground">
                    {brand?.minFollowers?.toLocaleString()}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Minimum Engagement Rate</h3>
                  <p className="text-muted-foreground">
                    {brand.minEngagementRate}%
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Preferred Content Types</h3>
                  <p className="text-muted-foreground">
                    {brand?.preferredContentTypes?.join(", ")}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Brand Guidelines</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {brand?.guidelines}
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  ) : (
    <div></div>
  );
}
