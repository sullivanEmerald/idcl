/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Campaign } from "@/types/campaign";
import promoterService from "@/services/promoter";
import { ArrowLeft, Calendar, DollarSign, Globe, Users } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function CampaignDetails() {
  const params = useParams();
  const router = useRouter();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [applicationNote, setApplicationNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await promoterService.getCampaign(params.id as string);
        setCampaign(response);
      } catch (error) {
        console.error("Error fetching campaign:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchCampaign();
    }
  }, [params.id]);

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
      
      toast({
        title: "Application Submitted",
        description: "We'll notify you when the advertiser reviews your application.",
      });
      
      router.refresh();
      setShowApplicationForm(false);
    } catch (error: any) {
      console.error("Error applying to campaign:", error?.response?.data);
      toast({
        title: error?.response?.data?.message || "Failed to submit application",
        variant: "destructive",
      });
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
        <Button
          size="lg"
          disabled={campaign.applicationStatus === "pending" || isSubmitting}
          variant={campaign.applicationStatus ? "secondary" : "default"}
          onClick={() => {
            if (campaign.applicationStatus) {
              router.push(`/promoter/dashboard/applications`);
            } else {
              setShowApplicationForm(true);
            }
          }}
        >
          <span className="flex items-center gap-2">
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {isSubmitting
              ? "Submitting..."
              : campaign.applicationStatus
                ? "View Application"
                : "Apply Now"}
          </span>
        </Button>

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

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Select Platforms</h3>
                  <div className={cn(
              "flex flex-wrap gap-2",
              isSubmitting && "opacity-50 pointer-events-none"
            )}>
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

                <div>
                  <h3 className="text-sm font-medium mb-2">Application Note</h3>
                  <textarea
                    className={cn(
                      "w-full min-h-[100px] p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500",
                      isSubmitting && "opacity-50 cursor-not-allowed"
                    )}
                    disabled={isSubmitting}
                    placeholder="Tell the advertiser why you'd be a great fit for this campaign..."
                    value={applicationNote}
                    onChange={(e) => setApplicationNote(e.target.value)}
                  />
                </div>

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
                  >
                    <span className="flex items-center gap-2">
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </span>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Campaign Stats */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Campaign Details</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-blue-600 mr-2" />
              <div>
                <div className="text-sm text-gray-600">Price per Post</div>
                <div className="font-semibold">${campaign.pricePerPost}</div>
              </div>
            </div>
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
                <div className="text-sm text-gray-600">Required Platforms</div>
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
    </div>
  );
}
