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

  getMarketplace: async () => {
    const response = await axiosInstance.get('/promoter/marketplace');
    return response.data;
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
    return {
      ...response.data,
      metrics: response.data.linkMetrics || {
        clicks: 0,
        uniqueClicks: 0,
        conversions: 0,
        lastClick: null
      }
    };
  }
};

export default promoterService;
