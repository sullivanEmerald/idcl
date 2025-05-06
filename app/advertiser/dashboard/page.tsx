"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Metric } from "@/components/metrics/metric";
import { CampaignList } from "@/components/campaigns/campaign-list";
import { PerformanceChart } from "@/components/charts/performance-chart";
import { Megaphone, DollarSign, MousePointer, Video } from "lucide-react";
import advertiserService, {
  DashboardMetrics,
  AnalyticsOverview,
} from "@/services/advertiser";

interface ICampaign {
  id: string;
  title: string;
  status: string;
  budget: number;
  activePromoters: number;
  reach: number;
  metrics: { totalViews: number };
}

export default function AdvertiserDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    activeCampaigns: 0,
    totalCampaigns: 0,
    pausedCampaigns: 0,
    totalBudget: 0,
    activePromoters: 0,
    totalReach: 0,
    availableBudget: 0,
  });
  const [recentCampaigns, setRecentCampaigns] = useState<ICampaign[]>([]);
  const [topPerformers, setTopPerformers] = useState<
    {
      date: string;
      views?: number;
      reach?: number;
      engagements: number;
      clicks?: number;
      videoViews?: number;
    }[]
  >([]);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsOverview | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await advertiserService.getDashboard();
        setMetrics(data.metrics);

        // Transform campaigns data to match CampaignList props
        const transformedCampaigns = data.recentCampaigns.map((campaign) => ({
          id: campaign.id,
          title: campaign.title,
          status: campaign.status,
          budget: campaign.budget,
          activePromoters: campaign.approvedPromoters?.length || 0,
          reach: campaign.metrics.totalReach,
          metrics: {
            totalViews: campaign.metrics.totalViews,
          },
        }));
        setRecentCampaigns(transformedCampaigns as ICampaign[]);

        // Get analytics data for the performance chart
        const analytics = await advertiserService.getAnalyticsOverview();
        setAnalyticsData(analytics);

        if (analytics.timeSeriesData && analytics.timeSeriesData.length > 0) {
          setTopPerformers(analytics.timeSeriesData);
        } else {
          // Fallback to old data structure if timeSeriesData is not available
          const transformedPerformance = data.topPerformers.map(
            (performer) => ({
              date: performer.campaign.title,
              reach: performer.metrics.reach,
              engagements: performer.metrics.engagements,
              clicks: 0,
              videoViews: 0,
            })
          );
          setTopPerformers(transformedPerformance);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back!</h1>
          <p className="mt-2 text-gray-600">
            {"Here's what's"} happening with your campaigns today.
          </p>
        </div>
        {/* <button
          onClick={() => window.location.href = '/advertiser/dashboard/campaigns/create'}
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Megaphone className="mr-2 h-4 w-4" />
          New Campaign
        </button> */}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        <Metric
          title="Active Campaigns"
          value={metrics.activeCampaigns}
          description="Live campaigns"
          trend=""
          icon={<Megaphone className="h-4 w-4 sm:h-5 sm:w-5" />}
          className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200"
        />
        <Metric
          title="Total Campaigns"
          value={metrics.totalCampaigns}
          description="All campaigns"
          trend=""
          icon={<Megaphone className="h-4 w-4 sm:h-5 sm:w-5" />}
          className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
        />
        <Metric
          title="Paused Campaigns"
          value={metrics.pausedCampaigns}
          description="Temporarily paused"
          trend=""
          icon={<Megaphone className="h-4 w-4 sm:h-5 sm:w-5" />}
          className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200"
        />
        <Metric
          title="Total Budget"
          value={`₦${metrics.totalBudget.toLocaleString()}`}
          description={`Available: ₦${metrics.availableBudget.toLocaleString()}`}
          trend=""
          icon={<DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />}
          className="bg-gradient-to-br from-green-50 to-green-100 border-green-200"
        />
        <Metric
          title="Total Clicks"
          value={
            analyticsData?.performanceMetrics?.totalClicks?.toLocaleString() ||
            "0"
          }
          description="User interactions"
          trend=""
          icon={<MousePointer className="h-4 w-4 sm:h-5 sm:w-5" />}
          className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200"
        />
        <Metric
          title="Video Views"
          value={
            analyticsData?.performanceMetrics?.totalVideoViews?.toLocaleString() ||
            "0"
          }
          description="Video content views"
          trend=""
          icon={<Video className="h-4 w-4 sm:h-5 sm:w-5" />}
          className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200"
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card className="overflow-hidden border-t-4 border-t-blue-500">
          <div className="border-b p-6">
            <h2 className="text-xl font-semibold">Recent Campaigns</h2>
            <p className="mt-1 text-sm text-gray-600">
              Your latest campaign activities
            </p>
          </div>
          <div className="p-6">
            <CampaignList campaigns={recentCampaigns} />
          </div>
        </Card>

        <Card className="overflow-hidden border-t-4 border-t-purple-500">
          <div className="border-b p-6">
            <h2 className="text-xl font-semibold">Performance Overview</h2>
            <p className="mt-1 text-sm text-gray-600">
              Campaign metrics over time
            </p>
          </div>
          <div className="p-6">
            <PerformanceChart data={topPerformers} />
          </div>
        </Card>
      </div>
    </div>
  );
}
