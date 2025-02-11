import { MediaFileClient, MediaFileServer } from '@/services/campaign';

export interface CampaignFormData {
  // Campaign Details
  name: string;
  description: string;
  budget: number;
  pricePerPost: number;
  startDate: Date;
  endDate: Date;

  // Targeting & Goals
  goal: 'awareness' | 'engagement' | 'conversion';
  location: string[];
  gender: 'all' | 'male' | 'female';
  promoterCount: number;
  platforms: string[];
  niches: string[];
  isBoosted: boolean;

  // Content & Assets
  contentType: 'photo' | 'video' | 'carousel';
  mediaFiles: MediaFileClient[];
  contentGuidelines: string;
  postingSchedule: string;
  hashtags: string;
  mentions?: string;
  brandAssetLinks?: string;
  promotionLink: string;
}

export interface CampaignData {
  // Same as CampaignFormData but with server-side media files
  mediaFiles: MediaFileServer[];
  // ... other fields remain the same
}
