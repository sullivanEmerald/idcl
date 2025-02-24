/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "@/lib/utils";

export interface ContentAsset {
  type: "photo" | "video" | "carousel";
  contentType: "image" | "video";
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

// Separate client and server types
export interface MediaFileBase {
  type: "image" | "video";
  url: string;
}

export interface MediaFileClient extends MediaFileBase {
  file: File; // File is required
  type: "image" | "video";
}

export interface MediaFileServer extends MediaFileBase {
  path?: string;
}

export interface PostingSchedule {
  startTime: string;
  endTime: string;
  days: string[];
}

export interface CampaignFormData {
  name: string;
  description: string;
  coverImage?: string;
  targetImpressions: number;
  pricePerImpression: number;
  estimatedBudget: number;
  platforms: string[];
  niches: string[];
  goal: "awareness" | "engagement" | "conversion";
  location: string[];
  gender: "all" | "male" | "female";

  promotionLink: string;
  startDate: Date;
  endDate: Date;
  contentType: "photo" | "video" | "carousel";
  mediaFiles: MediaFileClient[];
  contentGuidelines: string;
  postingSchedule: PostingSchedule;
  hashtags: string;
  mentions?: string;
  brandAssetLinks?: string;
  isBoosted: boolean;
}

export interface CampaignData {
  title: string;
  description: string;
  coverImage?: string;
  targetImpressions: number;
  pricePerImpression: number;
  estimatedBudget: number;
  requiredPlatforms: string[];
  targetedNiches: string[];
  campaignGoal: "awareness" | "engagement" | "conversion";
  targetLocation: string;
  targetGender: "all" | "male" | "female";

  promotionLink: string;
  minFollowers: number;
  minEngagementRate: number;
  startDate: Date;
  endDate: Date;
  contentAssets: ContentAsset[];
  requirements: {
    contentGuidelines: string;
    postingSchedule: PostingSchedule;
    hashtags: string[];
    mentions: string[];
    brandAssetLinks?: string[];
  };
}

class CampaignService {
  private async uploadFile(file: File): Promise<ContentAsset> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post(`/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const { url, thumbnailUrl, width, height, duration } = response.data;

    return {
      type: file.type.startsWith("video/") ? "video" : "photo",
      contentType: file.type.startsWith("video/") ? "video" : "image",
      url,
      thumbnailUrl,
      width,
      height,
      duration,
      size: file.size,
    };
  }

  private async processMediaFile(file: File): Promise<ContentAsset> {
    const asset = await this.uploadFile(file);

    if (file.type.startsWith("video/")) {
      const video = document.createElement("video");
      video.src = URL.createObjectURL(file);

      await new Promise((resolve) => {
        video.onloadedmetadata = () => {
          asset.duration = video.duration;
          asset.width = video.videoWidth;
          asset.height = video.videoHeight;
          resolve(null);
        };
      });
    } else {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      await new Promise((resolve) => {
        img.onload = () => {
          asset.width = img.width;
          asset.height = img.height;
          resolve(null);
        };
      });
    }

    return asset;
  }

  async createCampaign(data: CampaignFormData): Promise<any> {
    try {
      // Upload and process all media files
      const contentAssetsPromises = data.mediaFiles.map((media, index) =>
        this.processMediaFile(media.file).then((asset) => ({
          ...asset,
          type: data.contentType,
          carouselIndex: data.contentType === "carousel" ? index : undefined,
        }))
      );

      const contentAssets = await Promise.all(contentAssetsPromises);

      // Prepare campaign data
      const campaignData: any = {
        title: data.name,
        description: data.description,
        coverImage: data.coverImage,
        // Keep new pricing model fields
        targetImpressions: data.targetImpressions,
        pricePerImpression: data.pricePerImpression,
        estimatedBudget: data.estimatedBudget,
        // Add required backend fields
        budget: data.estimatedBudget,
        pricePerPost: data.pricePerImpression * 1000, // Convert to per-post price
        targetPromotions: Math.ceil(data.targetImpressions / 1000), // Estimate number of promotions needed
        requiredPlatforms: data.platforms,
        targetedNiches: data.niches,
        campaignGoal: data.goal,
        targetLocation: data.location.join(","),
        targetGender: data.gender,
        promotionLink: data.promotionLink,
        minFollowers: 1000, // Default value
        minEngagementRate: 0.02, // Default value
        startDate: data.startDate,
        endDate: data.endDate,
        contentAssets,
        requirements: {
          contentGuidelines: data.contentGuidelines,
          postingSchedule: {
            startTime: data.postingSchedule.startTime,
            endTime: data.postingSchedule.endTime,
            days: data.postingSchedule.days,
          },
          hashtags: data.hashtags.split(",").map((tag) => tag.trim()),
          mentions: data.mentions
            ? data.mentions.split(",").map((mention) => mention.trim())
            : [],
          brandAssetLinks: data.brandAssetLinks ? [data.brandAssetLinks] : [],
        },
      };

      const response = await axiosInstance.post(`/campaigns`, campaignData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error creating campaign:", error);
      throw error;
    }
  }

  async updateCampaign(
    id: string,
    formData: Partial<CampaignFormData>,
    newMediaFiles?: File[]
  ): Promise<any> {
    try {
      // Process new media files if any
      let contentAssets: ContentAsset[] = [];
      if (newMediaFiles?.length) {
        const newContentAssetsPromises = newMediaFiles.map(
          async (file, index) => {
            const contentAsset = await this.processMediaFile(file);
            if (newMediaFiles.length > 1) {
              contentAsset.type = "carousel";
              contentAsset.carouselIndex = index;
            }
            return contentAsset;
          }
        );
        contentAssets = await Promise.all(newContentAssetsPromises);
      }

      // Transform form data to match backend DTO
      const campaignData: Partial<CampaignData> = {
        ...(formData.name && { title: formData.name }),
        ...(formData.description && { description: formData.description }),
        ...(formData.targetImpressions && { targetImpressions: formData.targetImpressions }),
        ...(formData.pricePerImpression && { pricePerImpression: formData.pricePerImpression }),
        ...(formData.estimatedBudget && { estimatedBudget: formData.estimatedBudget }),
        ...(formData.platforms && { requiredPlatforms: formData.platforms }),
        ...(formData.niches && { targetedNiches: formData.niches }),
        ...(formData.goal && { campaignGoal: formData.goal }),
        ...(formData.location && { targetLocation: formData.location.join(",") }),
        ...(formData.gender && { targetGender: formData.gender }),
        ...(formData.promotionLink && { promotionLink: formData.promotionLink }),
        ...(formData.startDate && { startDate: formData.startDate }),
        ...(formData.endDate && { endDate: formData.endDate }),
        ...(contentAssets.length > 0 && { contentAssets }),
        // Only include requirements if any of the fields are present
        ...(formData.contentGuidelines || formData.postingSchedule || formData.hashtags || formData.mentions || formData.brandAssetLinks ? {
          requirements: {
            contentGuidelines: formData.contentGuidelines || '',
            postingSchedule: formData.postingSchedule || { startTime: '', endTime: '', days: [] },
            hashtags: formData.hashtags ? formData.hashtags.split(',').map(tag => tag.trim()) : [],
            mentions: formData.mentions ? formData.mentions.split(',').map(mention => mention.trim()) : [],
            ...(formData.brandAssetLinks && { brandAssetLinks: [formData.brandAssetLinks] }),
          }
        } : undefined),
      };

      const response = await axiosInstance.patch(
        `/campaigns/${id}`,
        campaignData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating campaign:", error);
      throw error;
    }
  }

  async getCampaign(id: string): Promise<any> {
    const response = await axiosInstance.get(`/campaigns/${id}`);
    return response.data;
  }

  async getCampaigns(filters?: Record<string, any>): Promise<any> {
    const response = await axiosInstance.get(`/campaigns`, {
      params: filters,
    });
    return response.data;
  }

  async boostCampaign(id: string): Promise<any> {
    const response = await axiosInstance.post(`/campaigns/${id}/boost`);
    return response.data;
  }

  async pauseCampaign(id: string): Promise<any> {
    const response = await axiosInstance.post(`/campaigns/${id}/pause`);
    return response.data;
  }

  async resumeCampaign(id: string): Promise<any> {
    const response = await axiosInstance.post(`/campaigns/${id}/resume`);
    return response.data;
  }
}

export const campaignService = new CampaignService();
