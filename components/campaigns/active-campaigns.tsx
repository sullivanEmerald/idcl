"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarCheck, ArrowRight, Users, Activity, User } from "lucide-react";
import { Campaign } from "@/types/campaign";

interface CampaignList {
  campaign: Campaign;
  isActive: boolean;
}

function calculateDaysRemaining(endDate: Date): string {
  const today = new Date();
  // Reset time part to get accurate day difference
  today.setHours(0, 0, 0, 0);

  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);

  // Calculate difference in days
  const diffTime = end.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return `${diffDays} day${diffDays !== 1 ? "s" : ""} remaining`;
}

export function ActiveCampaignList({ campaign, isActive }: CampaignList) {
  return (
    <div className="space-y-4">
      <Card className="block rounded-lg border p-4 transition-colors hover:bg-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">{campaign.title}</h3>
            <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
              <Badge
                variant={campaign.status === "active" ? "success" : "secondary"}
              >
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
                <div className="text-lg">
                  {campaign?.metrics.totalReach?.toLocaleString()}
                </div>
              </div>
            )}
            <div>
              <div className="flex items-center gap-4">
                <div className="flex-none">
                  <Link href={`/advertiser/dashboard/campaigns/${campaign.id}`}>
                    <Button variant="outline" size="sm" className="h-8 px-3">
                      View
                    </Button>
                  </Link>
                </div>
                {isActive ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="h-8 px-3"
                      >
                        Promoters
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Campaign Promoters</DialogTitle>
                      </DialogHeader>
                      {!campaign.activePromoters ||
                      campaign.activePromoters.length === 0 ? (
                        <p>There are no promoters for this Campaign</p>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
                            <Users className="w-5 h-5 text-gray-600" />
                            <p className="text-sm font-medium">{`${campaign.activePromoters.length} promoters working on this campaign`}</p>
                          </div>
                          <div className="space-y-2">
                            {campaign.activePromoters.map((promoter, index) => (
                              <Popover key={promoter.promoter?._id}>
                                <PopoverTrigger asChild>
                                  <div className="p-2 border rounded flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <div className="p-2 bg-green-100 rounded-full">
                                        <User className="h-4 w-4 text-green-600" />
                                      </div>
                                      <span>{promoter.promoter?.fullName}</span>
                                    </div>
                                    <Button variant="outline" size="sm">
                                      View
                                    </Button>
                                  </div>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-80"
                                  align="end"
                                  sideOffset={40}
                                >
                                  <div className="">
                                    <div className="space-y-4 p-4">
                                      <div className="grid gap-4">
                                        <div className="flex items-center justify-between">
                                          <div className="text-sm text-muted-foreground flex items-center gap-2">
                                            <div className="p-2 bg-blue-100 rounded-full">
                                              <User className="h-4 w-4 text-blue-600" />
                                            </div>
                                            Name:
                                          </div>
                                          <span className="font-medium">
                                            {promoter?.promoter?.fullName ||
                                              `Promoter ${index + 1}`}
                                          </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                          <div className="text-sm text-muted-foreground flex items-center gap-2">
                                            <div className="p-2 bg-purple-100 rounded-full">
                                              <Users className="h-4 w-4 text-purple-600" />
                                            </div>
                                            Followers:
                                          </div>
                                          <span className="font-medium">
                                            {promoter?.promoter?.totalFollowers}
                                          </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                          <div className="text-sm text-muted-foreground flex items-center gap-2">
                                            <div className="p-2 bg-orange-100 rounded-full">
                                              <Activity className="h-4 w-4 text-orange-600" />
                                            </div>
                                            Engagement:
                                          </div>
                                          <span className="font-medium">
                                            {promoter?.promoter?.engagementRate}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </PopoverContent>
                              </Popover>
                            ))}
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="h-8 px-3"
                      >
                        View details
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-blue-100 rounded-lg">
                            <CalendarCheck className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">
                              Scheduling
                            </p>
                            <p className="text-gray-200">{campaign.title}</p>
                          </div>
                        </div>

                        <div className="flex justify-between items-end">
                          <div className="space-y-1">
                            <h3 className="text-sm font-medium text-gray-900">
                              Start
                            </h3>
                            <p className="text-sm text-gray-600">
                              {new Date(
                                campaign.startDate
                              ).toLocaleDateString()}
                            </p>
                          </div>

                          <Link
                            href={`/advertiser/dashboard/campaigns/${campaign.id}/edit`}
                          >
                            <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline">
                              {calculateDaysRemaining(new Date(campaign.endDate))}
                              <ArrowRight className="w-4 h-4" />
                              <span>Reschedule</span>
                            </button>
                          </Link>

                          <div className="space-y-1">
                            <h3 className="text-sm font-medium text-gray-900">
                              End
                            </h3>
                            <p className="text-sm text-gray-600">
                              {new Date(campaign.endDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
