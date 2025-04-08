export interface Advertiser {
  id: string;
  companyName: string;
  logo?: string;
  isFollowing?: boolean;
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
  // Core metrics
  totalReach: number;
  totalViews: number;
  uniqueViews: number;
  totalEngagements: number;
  totalPosts: number;
  totalConversions: number;
  averageEngagementRate: number;
  dwellTime: number; // Average time spent on campaign
  adRating: number; // Average rating given by promoters (1-5)
  
  // View Duration Metrics
  viewDuration: {
    threeSeconds: number; // Views lasting 3+ seconds
    thirtySeconds: number; // Views lasting 30+ seconds
    oneMinute: number; // Views lasting 60+ seconds
  };
  
  // Promoter metrics
  promoterViews: number; // Number of times promoters viewed the campaign
  uniquePromoterViews: number; // Number of unique promoters who viewed
  promoterFollows: number; // Number of promoters who followed the brand
  activePromoterCount: number; // Number of active promoters
  promoterEngagement: {
    ratings: number; // Number of promoter ratings submitted
    averageRating: number; // Average promoter rating (1-5)
    views: number; // Number of times promoters viewed the campaign
  }

  // Device-specific metrics
  byDevice: {
    mobile: DeviceMetrics;
    desktop: DeviceMetrics;
    tablet: DeviceMetrics;
  };

  // Geographic and channel metrics
  byRegion: Record<string, number>;
  byChannel: Record<string, number>;

  // Social platform metrics
  bySocialPlatform: {
    instagram: SocialPlatformMetrics;
    tiktok: SocialPlatformMetrics;
    twitter: SocialPlatformMetrics;
    facebook: SocialPlatformMetrics;
    youtube: SocialPlatformMetrics;
    linkedin: SocialPlatformMetrics;
  };

  // Platform-specific totals
  totalViewsByPlatform: Record<string, number>;
  totalClicksByPlatform: Record<string, number>;
  totalSharesByPlatform: Record<string, number>;
  totalLikesByPlatform: Record<string, number>;
  totalCommentsByPlatform: Record<string, number>;

  // Budget metrics
  budgetSpent: number;
  costPerView: number;
  costPerEngagement: number;
  costPerConversion: number;
}

export interface Comment {
  id: string;
  text: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
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
  likes?: number;
  isLikedByCurrentUser?: boolean;
  comments?: Comment[];
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
