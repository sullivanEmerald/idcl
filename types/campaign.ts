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
  brandAssetLinks: string[];
  ctaLabel: string
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
  totalEngagements: number;
  totalPosts: number;
  totalConversions: number;
  averageEngagementRate: number;
  dwellTime: number; // Average time spent on campaign
  adRating: number; // Average rating given by promoters (1-5)
  uniqueViews: number;
  uniqueClicks: number;
  totalUserClicks: number;
  totalPromoterClicks: number;
  uniquePromoterClicks: number;
  
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
    clickCount?: number; // Number of times promoters copied links
    linkCopiesByPlatform?: Record<string, number>; // Platform-specific link copies
    qrDownloads?: number; // Number of QR code downloads
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
    instagram?: {
      count: number;
      _id?: string;
      id?: string;
    };
    tiktok?: {
      count: number;
      _id?: string;
      id?: string;
    };
    twitter?: {
      count: number;
      _id?: string;
      id?: string;
    };
    facebook?: {
      count: number;
      _id?: string;
      id?: string;
    };
    youtube?: {
      count: number;
      _id?: string;
      id?: string;
    };
    linkedin?: {
      count: number;
      _id?: string;
      id?: string;
    };
    _id?: string;
    id?: string;
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

export interface ActivePromoter {
  promoterId: string;
  username?: string;
  profileImage?: string;
  lastActivity?: string;
  earnings?: number;
  eventTypes?: {
    views: number;
    clicks: number;
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
  likes?: number;
  isLikedByCurrentUser?: boolean;
  comments?: Comment[];
  targetLocation?: string;
  targetGender?: 'male' | 'female' | 'all';
  targetPromotions: number;
  promotionalLink?: string;
  promotionLink?: string;
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
    lastActivity: string;
    totalEvents: number;
    eventTypes?: string[];
    promoter: {
      _id?: string;
      fullName?: string;
      name?: string;
      email: string;
      location?: string;
      platforms: string[];
      totalFollowers: number | string;
      engagementRate: number | string;
      contentTypes: string[];
      status: string;
      audienceInterests?: string[];
      audienceAge?: string;
      phoneNumber?: string;
    };
  }>;
  coverImage: string;
  displayCoverImage?: string;
  backgroundUrl?: string;
  layoutType?: 'landscape' | 'portrait';
  conversionValue?: number;
  createdAt?: string;
  updatedAt?: string;
  approvedPromoters?: string[];
  pendingPromoters?: string[];
  rejectedPromoters?: string[];
}
