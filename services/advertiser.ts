/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from '@/lib/utils';

interface DashboardMetrics {
  activeCampaigns: number;
  totalBudget: number;
  activePromoters: number;
  totalReach: number;
}

interface DashboardData {
  metrics: DashboardMetrics;
  recentCampaigns: any[];
  topPerformers: any[];
}

const advertiserService = {
  getDashboard: async (): Promise<DashboardData> => {
    const response = await axiosInstance.get('/advertiser/dashboard');
    return response.data;
  },

  getCampaigns: async () => {
    const response = await axiosInstance.get('/advertiser/campaigns');
    return response.data;
  },

  getWalletOverview: async () => {
    const response = await axiosInstance.get('/advertiser/wallet/overview');
    return response.data;
  },

  getAnalytics: async () => {
    const response = await axiosInstance.get('/advertiser/analytics/overview');
    return response.data;
  }
};

export default advertiserService;
