import { axiosInstance } from '@/lib/utils';

export interface TrackEventParams {
  shortUrlId: string;
  eventType: 'view' | 'click' | 'conversion';
  metadata?: {
    interactionType?: string;
    [key: string]: any;
  };
}

class AnalyticsService {
  async handleShortUrl(shortId: string): Promise<string> {
    try {
      const response = await axiosInstance.get(`/api/url-shortener/s/${shortId}`, {
        maxRedirects: 0,
        validateStatus: (status) => status === 302 || status === 200,
      });
      console.log(response.data)
      console.log(response.headers)

      // For axios, we need to look in response.data for the redirect URL
      const redirectUrl = response.request?.res?.responseUrl || response.headers?.location;
      if (!redirectUrl) {
        throw new Error('No redirect URL found');
      }

      // If it's a relative URL (starts with /), make it absolute
      return redirectUrl.startsWith('/')
        ? `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}${redirectUrl}`
        : redirectUrl;
    } catch (error) {
      console.error('Failed to handle short URL:', error);
      throw error;
    }
  }

  async trackEvent(params: TrackEventParams) {
    try {
      const response = await axiosInstance.post('/api/analytics/track', params);
      return response.data;
    } catch (error) {
      console.error('Failed to track analytics event:', error);
      throw error;
    }
  }

  async getCampaignAnalytics(campaignId: string, timeRange: { start: Date; end: Date }) {
    try {
      const response = await axiosInstance.get('/api/analytics/campaign', {
        params: {
          campaignId,
          startDate: timeRange.start.toISOString(),
          endDate: timeRange.end.toISOString(),
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch campaign analytics:', error);
      throw error;
    }
  }

  async getPromoterAnalytics(promoterId: string, timeRange: { start: Date; end: Date }) {
    try {
      const response = await axiosInstance.get('/api/analytics/promoter', {
        params: {
          promoterId,
          startDate: timeRange.start.toISOString(),
          endDate: timeRange.end.toISOString(),
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch promoter analytics:', error);
      throw error;
    }
  }
}

export const analyticsService = new AnalyticsService();
