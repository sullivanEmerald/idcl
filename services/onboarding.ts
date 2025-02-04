/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from '@/lib/utils';

const onboardingService = {
  async getOnboardingStatus(userId: string) {
    const response = await axiosInstance.get(`/onboarding/${userId}`);
    return response.data;
  },

  async updateAdvertiserProfile(userId: string, profileData: any) {
    const response = await axiosInstance.put(`/onboarding/advertiser/${userId}`, profileData);
    return response.data;
  },

  async updatePromoterProfile(userId: string, profileData: any) {
    const response = await axiosInstance.put(`/onboarding/promoter/${userId}`, profileData);
    return response.data;
  }
};

export default onboardingService;
