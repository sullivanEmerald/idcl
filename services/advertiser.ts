import { axiosInstance } from '@/lib/utils';

export interface UserBasicInfo {
  id: string;
  firstName: string;
  lastName: string;
}

export interface PromoterInfo extends UserBasicInfo {
  followers: number;
  engagementRate: number;
}

export interface DashboardMetrics {
  activeCampaigns: number;
  totalBudget: number;
  activePromoters: number;
  totalReach: number;
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
}

export interface ContentAsset {
  type: string;
  url: string;
  description: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  advertiser: UserBasicInfo;
  budget: number;
  pricePerPost: number;
  requiredPlatforms: string[];
  targetedNiches: string[];
  minFollowers: number;
  minEngagementRate: number;
  approvedPromoters: PromoterInfo[];
  promoterCount: number;
  startDate: Date;
  endDate: Date;
  status: string;
  requirements: CampaignRequirements;
  metrics: CampaignMetrics;
  contentAssets: ContentAsset[];
  performance: {
    reach: number;
    engagements: number;
    posts: number;
  };
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
  isEmailNotificationEnabled: Boolean,
  isSmsNotificationEnabled: Boolean

}

export interface AnalyticsOverview {
  performanceMetrics: {
    totalReach: number;
    totalEngagements: number;
    averageEngagementRate: number;
  };
  topCampaigns: {
    id: string;
    title: string;
    metrics: CampaignMetrics;
  }[];
  topPerformers: TopPerformer[];
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

  updateEmailPreference: async (data: { isEmailNotificationEnabled: boolean }) => {
    const response = await axiosInstance.put('/settings/advertiser/preference/email', data)
    return response.data;
  },

  updateSmsPreference: async (data: { isSmsNotificationEnabled: boolean }) => {
    const response = await axiosInstance.put('/settings/advertiser/preference/sms', data)
    return response.data;
  },

  updatePushPreference: async (data: { isPushsNotificationEnabled: boolean }) => {
    const response = await axiosInstance.put('/settings/advertiser/preference/push', data)
    return response.data;
  }
};

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
