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
  ctaLabel?: string;
  aiSuggestions?: {
    targetAudience: string;
    contentStrategy: string;
    optimizationTips: string[];
  };
}

export interface DeviceMetrics {
  uniqueViews: number;
  clicks: number;
  conversions: number;
  byOS: {
    android: number;
    ios: number;
    windows: number;
    macos: number;
    other: number;
  };
}

export interface SocialPlatformMetrics {
  count: number;
}

export interface CampaignMetrics {
  clicks: number;
  uniqueClicks: number;
  conversions: number;
  totalReach: number;
  totalEngagements: number;
  totalPosts: number;
  totalConversions: number;
  averageEngagementRate: number;
  totalViews: number;
  byDevice: {
    mobile: DeviceMetrics;
    desktop: DeviceMetrics;
    tablet: DeviceMetrics;
  };
  byRegion: Record<string, number>;
  byChannel: Record<string, number>;
  bySocialPlatform: {
    instagram: SocialPlatformMetrics;
    tiktok: SocialPlatformMetrics;
    twitter: SocialPlatformMetrics;
    facebook: SocialPlatformMetrics;
    youtube: SocialPlatformMetrics;
    linkedin: SocialPlatformMetrics;
  };
  totalViewsByPlatform: Record<string, number>;
  totalClicksByPlatform: Record<string, number>;
  totalSharesByPlatform: Record<string, number>;
  linkMetrics?: {
    clicks: number;
    uniqueClicks: number;
    conversions: number;
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
  activePromoters: Array<{
    _id: string;
    promoter: {
      fullName: string;
      email: string;
      location?: string;
      platforms: string[];
      followersCount: number;
      engagementRate: number;
      contentTypes: string[];
      status: string;
    };
    lastActivity: string;
    totalEvents: number;
  }>;
  coverImage: string
}
