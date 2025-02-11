export interface MediaFile {
  type: 'image' | 'video';
  url: string;
  file: File;
}

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
  mediaFiles: MediaFile[];
  contentGuidelines: string;
  postingSchedule: string;
  hashtags: string;
  mentions?: string;
  brandAssetLinks?: string;
  promotionLink: string;
}
