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

const promoterService = {
  getDashboard: async (): Promise<DashboardData> => {
    const response = await axiosInstance.get('/promoter/dashboard');
    return response.data;
  },

  getMarketplace: async () => {
    const response = await axiosInstance.get('/promoter/marketplace');
    return response.data;
  },

  getActiveCampaigns: async () => {
    const response = await axiosInstance.get('/promoter/campaigns/active');
    return response.data;
  },

  getWalletOverview: async () => {
    const response = await axiosInstance.get('/promoter/wallet/overview');
    return response.data;
  }
};

export default promoterService;
