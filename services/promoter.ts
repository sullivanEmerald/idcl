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

export interface ProfileDataDto {
  fullName: string;
  phoneNumber: string,
  companyName: string
}

export interface PasswordResetDto {
  oldPassword: string,
  newPassword: string
  confirmNewPassword?: string
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

  getMarketplace: async (page = 1, limit = 12) => {
    const response = await axiosInstance.get('/campaigns/marketplace', {
      params: { page, limit }
    });

    return {
      campaigns: response.data.campaigns.map((campaign: any) => ({
        ...campaign,
        coverImage: promoterService.determineCoverImage(campaign)
      })),
      pagination: response.data.pagination
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

  getCompletedCampaigns: async () => {
    const response = await axiosInstance.get('/promoter/campaigns/completed');
    return response.data.campaigns.map((campaign: any) => ({
      ...campaign,
      coverImage: promoterService.determineCoverImage(campaign)
    }));
  },

  getWalletOverview: async () => {
    const response = await axiosInstance.get('/promoter/wallet/overview');
    return response.data;
  },

  getAnalytics: async (timeRange: '7d' | '30d' | '90d' | { start: Date; end: Date }): Promise<{ data: AnalyticsData }> => {
    const response = await axiosInstance.get('/analytics/promoter', {
      params: { timeRange }
    });
    
    const data = response.data;
    const transformedData = {
      dates: data.dates,
      earnings: data.earnings,
      engagements: data.engagements,
      completedTasks: data.completedTasks.reduce((acc: number[], task: { completedAt: string }) => {
        const date = new Date(task.completedAt).toISOString().split('T')[0]
        const dateIndex = data.dates.indexOf(date)
        if (dateIndex >= 0) {
          acc[dateIndex] = (acc[dateIndex] || 0) + 1
        }
        return acc
      }, Array(data.dates.length).fill(0)),
      topPerformingCampaigns: data.topPerformingCampaigns.map((campaign: { _id: string; campaignTitle: string; totalEngagements: number }) => ({
        id: campaign._id,
        name: campaign.campaignTitle,
        brand: 'Unknown',
        earnings: 0,
        engagement: campaign.totalEngagements
      }))
    };
    return { data: transformedData };
  },

  getCampaign: async (campaignId: string) => {
    const response = await axiosInstance.get(`/promoter/campaigns/${campaignId}`);
    const campaign = response.data;

    return {
      ...campaign,
      coverImage: promoterService.determineCoverImage(campaign),
      linkMetrics: campaign.linkMetrics || {
        clicks: 0,
        uniqueClicks: 0,
        conversions: 0,
        lastClick: null
      }
    };
  },

  async getProfile() {
    const response = await axiosInstance.get(`/promoter/me`);
    return response.data;
  },

  async updatePromoterProfile(data: ProfileDataDto) {
    const response = await axiosInstance.put('/promoter/update', data)
    return response.data;
  },

  async upatePromoterPassword(data: PasswordResetDto) {
    const response = await axiosInstance.put('/promoter/update/password', data)
    return response.data;
  },
  async updatePromoterPreference(data: { [key: string]: boolean }) {
    console.log(data)
    const response = await axiosInstance.put('/settings/promoter/preference', data)
    return response.data;
  },

  async removePromoterSocial(social: string) {
    const response = await axiosInstance.delete(`/promoter/social?platform=${social}`)
    return response.data;
  },

  async undoRemoval(social: string) {
    const response = await axiosInstance.patch(`/promoter/social?platform=${social}`)
    return response.data;
  }
}

export default promoterService;
