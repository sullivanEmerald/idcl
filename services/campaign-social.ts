import { axiosInstance } from '@/lib/utils';

export interface Comment {
  id: string;
  text: string;
  createdAt: string;
  user: {
    id: string;
    fullName: string;
    avatar?: string;
  };
}

class CampaignSocialService {
  async getComments(campaignId: string): Promise<Comment[]> {
    const response = await axiosInstance.get(`/campaigns/${campaignId}/comments`);
    return response.data;
  }

  async createComment(campaignId: string, text: string): Promise<Comment> {
    const response = await axiosInstance.post(`/campaigns/${campaignId}/comments`, {
      text,
    });
    return response.data;
  }

  async toggleLike(campaignId: string): Promise<{ liked: boolean }> {
    const response = await axiosInstance.post(`/campaigns/${campaignId}/likes`);
    return response.data;
  }

  async getLikes(campaignId: string): Promise<number> {
    const response = await axiosInstance.get(`/campaigns/${campaignId}/likes`);
    return response.data.count;
  }

  async checkUserLike(campaignId: string): Promise<boolean> {
    const response = await axiosInstance.get(`/campaigns/${campaignId}/likes/check`);
    return response.data.liked;
  }
}

export const campaignSocialService = new CampaignSocialService();