import { axiosInstance } from "@/lib/utils";

export interface LeaderboardEntry {
  promoterId: string;
  name: string;
  metrics: {
    totalReach: number;
    totalEngagements: number;
    totalConversions: number;
    engagementRate: number;
  };
  score: number;
}

export interface LeaderboardOptions {
  timeRange?: {
    start: Date;
    end: Date;
  };
  campaignId?: string;
  campaignGoal?: 'awareness' | 'engagement' | 'conversion';
  limit?: number;
}

export interface PromoterRankResponse {
  rank: number;
  totalPromoters: number;
  entry: LeaderboardEntry;
}

class LeaderboardService {
  async getLeaderboard(options: LeaderboardOptions = {}) {
    const queryParams = new URLSearchParams();

    if (options.campaignId) {
      queryParams.append('campaignId', options.campaignId);
    }

    if (options.campaignGoal) {
      queryParams.append('campaignGoal', options.campaignGoal);
    }

    if (options.timeRange) {
      queryParams.append('startDate', options.timeRange.start.toISOString());
      queryParams.append('endDate', options.timeRange.end.toISOString());
    }

    if (options.limit) {
      queryParams.append('limit', options.limit.toString());
    }

    const queryString = queryParams.toString();
    const url = `/leaderboard${queryString ? `?${queryString}` : ''}`;

    const response = await axiosInstance.get<LeaderboardEntry[]>(url);
    return response.data;
  }

  async getPromoterRank(promoterId: string, options: Omit<LeaderboardOptions, 'limit'> = {}) {
    const queryParams = new URLSearchParams();

    if (options.campaignId) {
      queryParams.append('campaignId', options.campaignId);
    }

    if (options.campaignGoal) {
      queryParams.append('campaignGoal', options.campaignGoal);
    }

    if (options.timeRange) {
      queryParams.append('startDate', options.timeRange.start.toISOString());
      queryParams.append('endDate', options.timeRange.end.toISOString());
    }

    const queryString = queryParams.toString();
    const url = `/leaderboard/promoter/${promoterId}${queryString ? `?${queryString}` : ''}`;

    const response = await axiosInstance.get<PromoterRankResponse>(url);
    return response.data;
  }
}

export const leaderboardService = new LeaderboardService();