/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from '@/lib/utils';

interface DashboardMetrics {
  activePromotions: number;
  totalEarnings: number;
  completedCampaigns: number;
  averageRating: number;
}

interface DashboardData {
  metrics: DashboardMetrics;
  activeCampaigns: any[];
  recentEarnings: any[];
}

interface AnalyticsData {
  engagements: number[];
  completedTasks: number[];
  earnings: number[];
  dates: string[];
  topPerformingCampaigns: {
    id: string;
    name: string;
    brand: string;
    earnings: number;
    engagement: number;
  }[];
}

const promoterService = {
  getDashboard: async (): Promise<DashboardData> => {
    const response = await axiosInstance.get('/promoter/dashboard');
    return response.data;
  },

  determineCoverImage: (campaign: any): string => {
    // If campaign has a valid cover image, use it
    if (campaign.coverImage && campaign.coverImage !== '') {
      return campaign.coverImage;
    }

    // If campaign has content assets, try to find a suitable image
    if (Array.isArray(campaign.contentAssets) && campaign.contentAssets.length > 0) {
      // For photo type content
      const photoAsset = campaign.contentAssets.find(
        (asset: any) => asset.type === 'photo' && asset.contentType === 'image'
      );
      if (photoAsset?.url) {
        return photoAsset.url;
      }

      // For carousel type content, use first image
      const carouselAsset = campaign.contentAssets.find(
        (asset: any) => asset.type === 'carousel' && asset.contentType === 'image' && asset.carouselIndex === 0
      );
      if (carouselAsset?.url) {
        return carouselAsset.url;
      }

      // For video type content, use thumbnail
      const videoAsset = campaign.contentAssets.find(
        (asset: any) => asset.type === 'video' && (asset.thumbnailUrl || asset.url)
      );
      // Try thumbnail first, fallback to video url
      if (videoAsset?.thumbnailUrl) {
        return videoAsset.thumbnailUrl;
      } else if (videoAsset?.url) {
        return videoAsset.url; // Fallback to video URL if no thumbnail
      }
    }

    // Default fallback - empty string
    return '';
  },

  getMarketplace: async () => {
    const response = await axiosInstance.get('/promoter/marketplace');
    const { marketplaceCampaigns, availableCampaigns } = response.data;

    // Process cover images for both campaign lists
    const processedMarketplaceCampaigns = marketplaceCampaigns.map((campaign: any) => ({
      ...campaign,
      coverImage: promoterService.determineCoverImage(campaign)
    }));

    const processedAvailableCampaigns = availableCampaigns.map((campaign: any) => ({
      ...campaign,
      coverImage: promoterService.determineCoverImage(campaign)
    }));

    return {
      marketplaceCampaigns: processedMarketplaceCampaigns,
      availableCampaigns: processedAvailableCampaigns
    };
  },

  applyCampaign: async (campaignId: string, data: { platforms: string[]; note?: string }) => {
    const response = await axiosInstance.post(`/promoter/campaigns/${campaignId}/apply`, data);
    return response.data;
  },

  getApplications: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) => {
    const response = await axiosInstance.get('/promoter/applications', { params });
    console.log(response.data)
    // For now, return the array directly and handle pagination later
    return {
      applications: response.data,
      pagination: {
        currentPage: params?.page || 1,
        totalPages: 1,
        totalItems: response.data.length,
        hasNextPage: false,
        hasPrevPage: false,
      }
    };
  },

  withdrawApplication: async (applicationId: string) => {
    const response = await axiosInstance.delete(`/promoter/applications/${applicationId}`);
    return response.data;
  },

  getActiveCampaigns: async () => {
    const response = await axiosInstance.get('/promoter/campaigns/active');
    return response.data;
  },

  getWalletOverview: async () => {
    const response = await axiosInstance.get('/promoter/wallet/overview');
    return response.data;
  },

  getAnalytics: async (timeRange: string): Promise<{ data: AnalyticsData }> => {
    const response = await axiosInstance.get(`/promoter/analytics/overview?timeRange=${timeRange}`);
    return response;
  }
,

  getCampaign: async (campaignId: string) => {
    const response = await axiosInstance.get(`/promoter/campaigns/${campaignId}`);
    const campaign = response.data;

    return {
      ...campaign,
      coverImage: promoterService.determineCoverImage(campaign),
      metrics: campaign.linkMetrics || {
        clicks: 0,
        uniqueClicks: 0,
        conversions: 0,
        lastClick: null
      }
    };
  }
};

export default promoterService;
