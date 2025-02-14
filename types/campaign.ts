export interface Advertiser {
  id: string;
  companyName: string;
  logo?: string;
}

export interface ContentAsset {
  type: 'photo' | 'video' | 'carousel';
  contentType: 'image' | 'video';
  url: string;
  description?: string;
  thumbnailUrl?: string;
  duration?: number;
  size?: number;
  width?: number;
  height?: number;
  aiGeneratedCopy?: string;
  carouselIndex?: number;
}

export interface CampaignRequirements {
  contentGuidelines: string;
  postingSchedule: {
    startTime: string;
    endTime: string;
    days: string[];
  };
  hashtags: string[];
  mentions: string[];
  brandAssetLinks?: string[];
  aiSuggestions?: {
    targetAudience: string;
    contentStrategy: string;
    optimizationTips: string[];
  };
}

export interface CampaignMetrics {
  totalReach: number;
  totalEngagements: number;
  totalPosts: number;
  averageEngagementRate: number;
  clicks: number;
  uniqueClicks: number;
  conversions: number;
  byDevice: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
  byRegion: Record<string, number>;
  byChannel: Record<string, number>;
  uniqueViews: number;
  conversionMetrics?: {
    leads: number;
    downloads: number;
    payments: number;
  };
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  advertiser: Advertiser;
  budget: number;
  pricePerPost: number;
  requiredPlatforms: string[];
  targetedNiches: string[];
  campaignGoal: 'awareness' | 'engagement' | 'conversion';
  targetLocation?: string;
  targetGender?: 'male' | 'female' | 'all';
  targetPromotions: number;
  promotionalLink?: string;
  isBoosted: boolean;
  isActive: boolean;
  minFollowers: number;
  minEngagementRate: number;
  startDate: string;
  endDate: string;
  status?: 'draft' | 'active' | 'paused' | 'completed' | 'cancelled' | 'scheduled';
  applicationStatus?: 'pending' | 'approved' | 'rejected' | null;
  requirements: CampaignRequirements;
  metrics: CampaignMetrics;
  contentAssets: ContentAsset[];
  earnings?: number;
  reach?: number;
  engagement?: number;
  activePromoters: number;
}
