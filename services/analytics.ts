/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "@/lib/utils";

export type EventType = "view" | "click" | "conversion";
export type InteractionType =
  | "campaign_view"
  | "campaign_view_end"
  | "video_play"
  | "video_complete"
  | "carousel_slide"
  | "cta_click"
  | "user_view"
  | "url_shortener_click"
  | "link_copy"
  | "video_play_start"
  | "video_play_end";

export interface EventMetadata {
  interactionType?: InteractionType;
  duration?: number;
  slideIndex?: number;
  videoProgress?: number;
  screenSize?: string;
  referrer?: string;
  userAgent?: string;
  url?: string;
  viewDuration?: number;
  [key: string]: any;
}

class AnalyticsService {
  private sessionStartTime: number;
  private lastEventTime: number;
  private pageReferrer: string;

  constructor() {
    this.sessionStartTime = Date.now();
    this.lastEventTime = this.sessionStartTime;
    // Store and categorize referrer when service is instantiated
    if (typeof window !== "undefined") {
      const rawReferrer = window.location.search.includes("ref=")
        ? new URLSearchParams(window.location.search).get("ref") ||
          document.referrer
        : document.referrer;

      // Categorize the referrer
      const referrerUrl = rawReferrer ? new URL(rawReferrer) : null;
      if (referrerUrl) {
        const hostname = referrerUrl.hostname.toLowerCase();
        if (hostname.includes("facebook.com") || hostname.includes("fb.com")) {
          this.pageReferrer = "facebook";
        } else if (hostname.includes("instagram.com")) {
          this.pageReferrer = "instagram";
        } else if (
          hostname.includes("twitter.com") ||
          hostname.includes("x.com")
        ) {
          this.pageReferrer = "twitter";
        } else if (hostname.includes("linkedin.com")) {
          this.pageReferrer = "linkedin";
        } else if (hostname.includes("tiktok.com")) {
          this.pageReferrer = "tiktok";
        } else if (
          hostname.includes("youtube.com") ||
          hostname.includes("youtu.be")
        ) {
          this.pageReferrer = "youtube";
        } else {
          this.pageReferrer = rawReferrer;
        }
      } else {
        this.pageReferrer = "direct";
      }
    } else {
      this.pageReferrer = "";
    }
  }

  getBaseMetadata() {
    return {
      referrer: this.pageReferrer,
      userAgent: navigator?.userAgent,
      screenSize:
        typeof window !== "undefined"
          ? `${window.innerWidth}x${window.innerHeight}`
          : undefined,
    };
  }
  async handleShortUrl(shortId: string): Promise<string> {
    try {
      const response = await axiosInstance.get(`/url-shortener/s/${shortId}`, {
        maxRedirects: 0,
        validateStatus: (status) => status === 302 || status === 200,
      });
      console.log(response.data);
      console.log(response.headers);

      // For axios, we need to look in response.data for the redirect URL
      const redirectUrl =
        response.request?.res?.responseUrl || response.headers?.location;
      if (!redirectUrl) {
        throw new Error("No redirect URL found");
      }

      // If it's a relative URL (starts with /), make it absolute
      return redirectUrl.startsWith("/")
        ? `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}${redirectUrl}`
        : redirectUrl;
    } catch (error) {
      console.error("Failed to handle short URL:", error);
      throw error;
    }
  }

  async trackEvent(
    shortUrlId: string,
    eventType: EventType,
    metadata?: EventMetadata & { referrer?: string },
    promoterId?: string
  ) {
    try {
      const response = await axiosInstance.post("/analytics/track", {
        shortUrlId,
        eventType,
        promoterId,
        metadata: {
          ...this.getBaseMetadata(),
          ...metadata,
        },
      });
      this.lastEventTime = Date.now();
      return response.data;
    } catch (error) {
      console.error("Failed to track analytics event:", error);
      throw error;
    }
  }

  trackPageView(shortId: string, promoterId?: string) {
    return this.trackEvent(
      shortId,
      "view",
      {
        interactionType: "campaign_view",
        channel: this.pageReferrer,
        campaignId: shortId,
      },
      promoterId
    );
  }

  trackUserView(shortId: string, promoterId?: string, utmSource?: string) {
    return this.trackEvent(
      shortId,
      "view",
      {
        interactionType: "user_view",
        channel: utmSource || this.pageReferrer,
        campaignId: shortId,
        socialPlatform: utmSource || undefined
      },
      promoterId
    );
  }

  trackConversion(
    shortId: string,
    url: string,
    promoterId?: string,
    goal: "awareness" | "engagement" | "conversion" = "conversion"
  ) {
    return this.trackEvent(
      shortId,
      goal === "awareness"
        ? "click"
        : goal === "engagement"
          ? "click"
          : "conversion",
      {
        interactionType: "cta_click",
        url,
      },
      promoterId
    );
  }

  trackVideoPlay(shortId: string, promoterId?: string) {
    return this.trackEvent(
      shortId,
      "view",
      {
        interactionType: "video_play",
      },
      promoterId
    );
  }

  trackVideoComplete(shortId: string, promoterId?: string) {
    const duration = Date.now() - this.lastEventTime;
    return this.trackEvent(
      shortId,
      "view",
      {
        interactionType: "video_complete",
        duration,
      },
      promoterId
    );
  }

  trackVideoProgress(
    shortId: string,
    secondsWatched: number,
    promoterId?: string
  ) {
    return this.trackEvent(
      shortId,
      "view",
      {
        interactionType: "video_play",
        viewDuration: secondsWatched,
        videoProgress: secondsWatched,
      },
      promoterId
    );
  }

  trackCarouselSlide(shortId: string, slideIndex: number, promoterId?: string) {
    return this.trackEvent(
      shortId,
      "view",
      {
        interactionType: "carousel_slide",
        slideIndex,
      },
      promoterId
    );
  }

  getSessionDuration() {
    return Date.now() - this.sessionStartTime;
  }

  async getCampaignAnalytics(
    campaignId: string,
    timeRange: { start: Date; end: Date }
  ) {
    try {
      const response = await axiosInstance.get("/analytics/campaign", {
        params: {
          campaignId,
          startDate: timeRange.start.toISOString(),
          endDate: timeRange.end.toISOString(),
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch campaign analytics:", error);
      throw error;
    }
  }

  async getPromoterAnalytics(
    promoterId: string,
    timeRange: { start: Date; end: Date }
  ) {
    try {
      const response = await axiosInstance.get("/analytics/promoter", {
        params: {
          promoterId,
          startDate: timeRange.start.toISOString(),
          endDate: timeRange.end.toISOString(),
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch promoter analytics:", error);
      throw error;
    }
  }
}

export const analyticsService = new AnalyticsService();
