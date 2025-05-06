/* eslint-disable @typescript-eslint/no-unused-vars */
import { axiosInstance } from '@/lib/utils';
import { Campaign } from '@/types/campaign';

export interface UserBasicInfo {
  id: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;

}

export interface PromoterInfo extends UserBasicInfo {
  followers: number;
  engagementRate: number;
}

export interface DashboardMetrics {
  activeCampaigns: number;
  totalCampaigns: number;
  pausedCampaigns: number;
  totalBudget: number;
  activePromoters: number;
  totalReach: number;
  availableBudget: number;
}

export interface CampaignRequirements {
  contentGuidelines: string;
  postingSchedule: string;
  hashtags: string[];
  mentions: string[];
}

export interface CampaignMetrics {
  totalReach: number;
  totalEngagements: number;
  totalPosts: number;
  averageEngagementRate: number;
  totalViews: number
}

export interface ContentAsset {
  type: string;
  url: string;
  description: string;
}

export interface DashboardData {
  metrics: DashboardMetrics;
  recentCampaigns: Campaign[];
  topPerformers: TopPerformer[];
}

export interface WalletTransaction {
  id: string;
  amount: number;
  type: string;
  status: 'completed' | 'pending' | 'failed';
  date: Date;
  promoter: UserBasicInfo;
  campaign: {
    id: string;
    title: string;
  };
}

export interface WalletOverview {
  balance: number;
  pendingBalance: number;
  recentTransactions: WalletTransaction[];
}

export interface TopPerformer {
  promoter: PromoterInfo;
  campaign: {
    id: string;
    title: string;
    metrics: CampaignMetrics;
  };
  metrics: {
    engagements: number;
    reach: number;
    posts: number;
  };
}

export interface advertiserPreferences {
  isEmailNotificationEnabled: boolean;
  isSmsNotificationEnabled: boolean

}

export interface AnalyticsOverview {
  performanceMetrics: {
    totalReach: number;
    totalEngagements: number;
    totalClicks: number;
    totalVideoViews: number;
    averageEngagementRate: number;
  };
  topCampaigns: {
    id: string;
    title: string;
    metrics: CampaignMetrics;
  }[];
  topPerformers: TopPerformer[];
  timeSeriesData: {
    date: string;
    views: number;
    engagements: number;
    clicks: number;
    videoViews: number;
  }[];
}

export interface CampaignPerformanceData {
  campaigns: {
    totalReach: number;
    totalEngagements: number;
    averageEngagementRate: number;
    totalConversions: number;
    byDevice: {
      mobile: { uniqueViews: number };
      desktop: { uniqueViews: number };
      tablet: { uniqueViews: number };
    };
  };
  promoters: {
    totalCount: number;
    activeCount: number;
    averageEngagementRate: number;
    topPerformers: Array<{
      name: string;
      engagementRate: number;
      reach: number;
    }>;
  };
}

export interface updatePersonalDto {
  firstName?: string,
  lastName?: string,
  companyName: string,
  phone: string
}

export interface PasswordResetDto {
  oldPassword: string,
  newPassword: string,
  confirmNewPassword?: string
}

export interface AdvertiserWalletBalance {
  totalDeposits: number;
  totalWithdrawals: number;
  totalBudgetAllocated: number;
  availableBalance: number;
}

export const advertiserService = {

  getDashboard: async (): Promise<DashboardData> => {
    const response = await axiosInstance.get('/advertiser/dashboard');
    return response.data;
  },

  getCampaigns: async (): Promise<{ campaigns: Campaign[] }> => {
    const response = await axiosInstance.get('/advertiser/campaigns');
    return response.data;
  },

  getWalletOverview: async (): Promise<WalletOverview> => {
    const response = await axiosInstance.get('/advertiser/wallet/overview');
    return response.data;
  },

  getAnalyticsOverview: async (): Promise<AnalyticsOverview> => {
    const response = await axiosInstance.get('/advertiser/analytics/overview');
    return response.data;
  },

  getCampaignPerformance: async (): Promise<CampaignPerformanceData> => {
    const response = await axiosInstance.get('/advertiser/analytics/performance');
    return response.data;
  },

  updatePreference: async (data: { [key: string]: boolean; }) => {
    const response = await axiosInstance.put('/settings/advertiser/preferences', data)
    return response.data;
  },

  updateProfile: async (data: updatePersonalDto) => {
    const response = await axiosInstance.put('/advertiser/update', data)
    return response.data
  },


  getProfile: async () => {
    const response = await axiosInstance.get(`/advertiser/me`);
    return response.data;
  },

  updateUserPassword: async (data: PasswordResetDto) => {
    const { confirmNewPassword, ...rest } = data;
    const response = await axiosInstance.put('/advertiser/change-password', rest)
    return response.data;
  },

  getWalletBalance: async (): Promise<AdvertiserWalletBalance> => {
    const { data } = await axiosInstance.get('/advertiser/wallet/balance');
    return data;
  },

  getWalletStats: async () => {
    const { data } = await axiosInstance.get('/advertiser/wallet/spending-stats');
    return data;
  },

}

// export type { 
//   UserBasicInfo,
//   PromoterInfo,
//   DashboardMetrics,
//   CampaignRequirements,
//   CampaignMetrics,
//   ContentAsset,
//   Campaign,
//   DashboardData,
//   WalletTransaction,
//   WalletOverview,
//   TopPerformer,
//   AnalyticsOverview
// };

export default advertiserService;
