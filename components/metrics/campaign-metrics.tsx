import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Campaign } from "@/types/campaign";
import { formatNumber } from "@/lib/utils";

interface CampaignMetricsProps {
  campaign: Campaign;
}

export function CampaignMetrics({ campaign }: CampaignMetricsProps) {
  const renderAwarenessMetrics = () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Impressions</CardTitle>
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
            Unique Views: {formatNumber(campaign.metrics.byDevice.mobile.uniqueViews + campaign.metrics.byDevice.desktop.uniqueViews + campaign.metrics.byDevice.tablet.uniqueViews)}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Promoters</CardTitle>
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
      {campaign.contentAssets.some(asset => asset.contentType === 'video') && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">View Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-2">
              <div>3s: {formatNumber(campaign.metrics.viewDuration?.threeSeconds || 0)}</div>
              <div>30s: {formatNumber(campaign.metrics.viewDuration?.thirtySeconds || 0)}</div>
              <div>1m: {formatNumber(campaign.metrics.viewDuration?.oneMinute || 0)}</div>
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
            {(() => {
              // Dynamic calculation of engagement rate
              const totalEvents = campaign.metrics.totalEngagements || 0;
              const totalViews = campaign.metrics.totalViews || 1; // Prevent division by zero
              
              // Calculate engagement rate as percentage of engagements to views
              const basicEngagementRate = (totalEvents / totalViews) * 100;
              
              // Return formatted value
              return basicEngagementRate.toFixed(2);
            })()}%
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Total Engagements: {formatNumber(campaign.metrics.totalEngagements)}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Promoter CTR</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            0%
            {/* {(campaign.metrics.promoterEngagement?.clickthroughRate * 100 || 0).toFixed(2)}% */}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ad Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {(campaign.metrics.promoterEngagement?.averageRating || 0).toFixed(1)}/5.0
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderConversionMetrics = () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Reach & Impressions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm space-y-2">
            <div>Reach: {formatNumber(campaign.metrics.totalReach)}</div>
            <div>Impressions: {formatNumber(campaign.metrics.totalViews)}</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">CTR & Leads</CardTitle>
        </CardHeader>
        {/* <CardContent>
          <div className="text-sm space-y-2">
            <div>CTR: {((campaign.metrics.clicks / campaign.metrics.totalViews * 100) || 0).toFixed(2)}%</div>
            <div>Leads: {formatNumber(campaign.metrics.conversionMetrics?.leads || 0)}</div>
          </div>
        </CardContent> */}
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Channels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm space-y-1">
            {Object.entries(campaign.metrics.byChannel || {}).slice(0, 3).map(([channel, count]) => (
              <div key={channel}>{channel}: {formatNumber(count)}</div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
        </CardHeader>
        {/* <CardContent>
          <div className="text-2xl font-bold">
            {(campaign.metrics.conversionMetrics?.conversionRate || 0).toFixed(2)}%
          </div>
        </CardContent> */}
      </Card>
    </div>
  );

  return (
    <div className="space-y-4">
      {campaign.campaignGoal === 'awareness' && renderAwarenessMetrics()}
      {campaign.campaignGoal === 'engagement' && renderEngagementMetrics()}
      {campaign.campaignGoal === 'conversion' && renderConversionMetrics()}
    </div>
  );
}