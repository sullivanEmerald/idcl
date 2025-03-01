import { axiosInstance } from '@/lib/utils';

export interface Brand {
  id: string;
  name: string;
  description: string;
  logo: string;
  industry: string;
  website?: string;
  instagram?: string;
  twitter?: string;
  isVerified: boolean;
  isFollowing: boolean;
  followerCount: number;
  campaignCount: number;
  activeCampaignCount: number;
  minFollowers: number;
  minEngagementRate: number;
  preferredContentTypes: string[];
  guidelines: string;
  activeCampaigns?: Array<{
    id: string;
    name: string;
    description: string;
    budget: number;
    applicantCount: number;
  }>;
}

interface GetBrandsParams {
  search?: string;
  industry?: string;
  page?: number;
  limit?: number;
}

class BrandService {
  async getBrands(params: GetBrandsParams = {}): Promise<Brand[]> {
    try {
      const response = await axiosInstance.get('/brands', { params });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch brands:', error);
      throw error;
    }
  }

  async getBrand(id: string): Promise<Brand> {
    try {
      const response = await axiosInstance.get(`/brands/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch brand:', error);
      throw error;
    }
  }

  async followBrand(brandId: string): Promise<void> {
    try {
      await axiosInstance.post(`/brands/${brandId}/follow`);
    } catch (error) {
      console.error('Failed to follow brand:', error);
      throw error;
    }
  }

  async unfollowBrand(brandId: string): Promise<void> {
    try {
      await axiosInstance.delete(`/brands/${brandId}/follow`);
    } catch (error) {
      console.error('Failed to unfollow brand:', error);
      throw error;
    }
  }

  async getFollowedBrands(): Promise<Brand[]> {
    try {
      const response = await axiosInstance.get('/brands/followed');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch followed brands:', error);
      throw error;
    }
  }
}

export const brandService = new BrandService();
