import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Campaign } from "@/types/campaign";
import { formatNumber } from "@/lib/utils";

interface CampaignMetricsProps {
  campaign: Campaign;
}

export function CampaignMetrics({ campaign }: CampaignMetricsProps) {
  const renderAwarenessMetrics = () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {campaign.contentAssets.some(
        (asset) => asset.contentType === "video"
      ) && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">View Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-2">
              <div>
                3s:{" "}
                {formatNumber(campaign.metrics.viewDuration?.threeSeconds || 0)}
              </div>
              <div>
                30s:{" "}
                {formatNumber(
                  campaign.metrics.viewDuration?.thirtySeconds || 0
                )}
              </div>
              <div>
                1m:{" "}
                {formatNumber(campaign.metrics.viewDuration?.oneMinute || 0)}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Impressions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatNumber(campaign.metrics.totalViews || 0)}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatNumber(campaign.metrics.totalReach || 0)}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Unique Views:{" "}
            {formatNumber(
              campaign.metrics.byDevice.mobile.uniqueViews +
                campaign.metrics.byDevice.desktop.uniqueViews +
                campaign.metrics.byDevice.tablet.uniqueViews
            )}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Active Promoters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatNumber(campaign.metrics.totalPosts || 0)}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ad Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {(campaign.metrics.adRating || 0).toFixed(1)}/5.0
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderEngagementMetrics = () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {campaign.contentAssets.some(
        (asset) => asset.contentType === "video"
      ) && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">View Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-2">
              <div>
                3s:{" "}
                {formatNumber(campaign.metrics.viewDuration?.threeSeconds || 0)}
              </div>
              <div>
                30s:{" "}
                {formatNumber(
                  campaign.metrics.viewDuration?.thirtySeconds || 0
                )}
              </div>
              <div>
                1m:{" "}
                {formatNumber(campaign.metrics.viewDuration?.oneMinute || 0)}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {(campaign.metrics.averageEngagementRate || 0).toFixed(2)}%
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Total Engagements: {formatNumber(campaign.metrics.totalEngagements)}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Campaign Average CTR
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{calculateCTR(campaign)}%</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Promoter Click-Through Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {calculatePromoterEngagementRate(campaign)}%
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Promoter Clicks: {formatNumber(calculatePromoterClicks(campaign))}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Formula: Promoter Views ÷ Promoter Clicks
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Promoter Interactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span>Total Views:</span>
              <span>{formatNumber(campaign.metrics.promoterViews || 0)}</span>
            </div>
            <div className="flex justify-between">
              <span>Unique Views:</span>
              <span>
                {formatNumber(campaign.metrics.uniquePromoterViews || 0)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Clicks:</span>
              <span>{formatNumber(calculatePromoterClicks(campaign))}</span>
            </div>
            <div className="flex justify-between">
              <span>Active Promoters:</span>
              <span>{formatNumber(campaign.activePromoters?.length || 0)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ad Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {(campaign.metrics.promoterEngagement?.averageRating || 0).toFixed(
              1
            )}
            /5.0
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderConversionMetrics = () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {campaign.contentAssets.some(
        (asset) => asset.contentType === "video"
      ) && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Video Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-2">
              <div>
                3s Views:{" "}
                {formatNumber(campaign.metrics.viewDuration?.threeSeconds || 0)}
              </div>
              <div>
                30s Views:{" "}
                {formatNumber(
                  campaign.metrics.viewDuration?.thirtySeconds || 0
                )}
              </div>
              <div>
                1m Views:{" "}
                {formatNumber(campaign.metrics.viewDuration?.oneMinute || 0)}
              </div>
              <div className="text-xs text-muted-foreground pt-1">
                Avg Watch Time: {Math.round(campaign.metrics.dwellTime || 0)}s
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Reach & Impressions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm space-y-2">
            <div>
              Reach:{" "}
              {formatNumber(
                campaign.metrics.byDevice.desktop.uniqueViews +
                  campaign.metrics.byDevice.mobile.uniqueViews +
                  campaign.metrics.byDevice.tablet.uniqueViews
              )}
            </div>
            <div>Impressions: {formatNumber(campaign.metrics.totalViews)}</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">CTR & Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm space-y-2">
            <div>CTR: {calculateCTR(campaign)}%</div>
            <div>Leads: {formatNumber(calculateLeads(campaign))}</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Channels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm space-y-1">
            {getTopChannels(campaign).map(([channel, count]) => (
              <div key={channel}>
                {channel || "direct"}: {formatNumber(count)}
              </div>
            ))}
            {getTopChannels(campaign).length === 0 && (
              <div className="text-muted-foreground text-xs">
                No channel data
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {calculateConversionRate(campaign)}%
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Conversions: {formatNumber(campaign.metrics.totalConversions || 0)}
          </p>
        </CardContent>
      </Card>
    </div>
  );

  // Helper functions for metrics calculations
  const calculateCTR = (campaign: Campaign): string => {
    const totalViews = campaign.metrics.totalViews || 0;
    const totalClicks =
      campaign.metrics.byDevice.mobile.clicks +
      campaign.metrics.byDevice.desktop.clicks +
      campaign.metrics.byDevice.tablet.clicks;

    if (totalViews === 0) return "0.00";
    return ((totalClicks / totalViews) * 100).toFixed(2);
  };

  const calculateLeads = (campaign: Campaign): number => {
    // For conversion campaigns, consider clicks as potential leads
    return (
      campaign.metrics.byDevice.mobile.clicks +
      campaign.metrics.byDevice.desktop.clicks +
      campaign.metrics.byDevice.tablet.clicks
    );
  };

  const calculateConversionRate = (campaign: Campaign): string => {
    const totalLeads = calculateLeads(campaign);
    const totalConversions = campaign.metrics.totalConversions || 0;

    if (totalLeads === 0) return "0.00";
    return ((totalConversions / totalLeads) * 100).toFixed(2);
  };

  const getTopChannels = (campaign: Campaign): [string, number][] => {
    const channels = campaign.metrics.byChannel || {};

    // If byChannel is empty, use data from bySocialPlatform
    if (
      Object.keys(channels).length === 0 &&
      campaign.metrics.bySocialPlatform
    ) {
      const socialPlatforms = campaign.metrics.bySocialPlatform;
      return Object.entries(socialPlatforms)
        .filter(
          ([platform, data]) =>
            platform !== "_id" &&
            platform !== "id" &&
            typeof data === "object" &&
            data !== null &&
            "count" in data
        )
        .map(([platform, data]): [string, number] => [
          platform,
          typeof data === "object" && data !== null && "count" in data
            ? data.count
            : 0,
        ])
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);
    }

    return Object.entries(channels)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
  };

  const calculatePromoterClicks = (campaign: Campaign): number => {
    // Sum up clicks from active promoters
    let promoterClicks = 0;

    if (campaign.activePromoters && campaign.activePromoters.length > 0) {
      // Count click events from promoters
      campaign.activePromoters.forEach((promoter) => {
        if (promoter.eventTypes && promoter.eventTypes.includes("click")) {
          // If we have detailed event counts, use them
          if (promoter.totalEvents) {
            // Estimate clicks as a portion of total events if exact click count isn't available
            const eventTypes = promoter.eventTypes.length;
            const estimatedClicksPerPromoter =
              eventTypes > 0
                ? Math.round(promoter.totalEvents / eventTypes)
                : 0;

            promoterClicks += estimatedClicksPerPromoter;
          }
        }
      });
    }

    return promoterClicks;
  };

  const calculatePromoterEngagementRate = (campaign: Campaign): string => {
    const promoterImpressions = campaign.metrics.promoterViews || 0;
    const promoterClicks = calculatePromoterClicks(campaign);

    if (promoterImpressions === 0) return "0.00";

    // Calculate engagement rate: (Clicks / Impressions) * 100
    return ((promoterImpressions / promoterClicks) * 100).toFixed(2);
  };

  return (
    <div className="space-y-4">
      {campaign.campaignGoal === "awareness" && renderAwarenessMetrics()}
      {campaign.campaignGoal === "engagement" && renderEngagementMetrics()}
      {campaign.campaignGoal === "conversion" && renderConversionMetrics()}
    </div>
  );
}
