import axios from 'axios';

export interface AnalyticsEvent {
  shortId: string;
  event: 'pageview' | 'conversion' | 'video_play' | 'video_complete' | 'carousel_slide';
  metadata?: {
    referrer?: string;
    userAgent?: string;
    screenSize?: string;
    duration?: number;
    slideIndex?: number;
    videoProgress?: number;
  };
}

class AnalyticsService {
  private sessionStartTime: number;
  private lastEventTime: number;

  constructor() {
    this.sessionStartTime = Date.now();
    this.lastEventTime = this.sessionStartTime;
  }

  private async trackEvent(event: AnalyticsEvent) {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/analytics/track`, {
        ...event,
        metadata: {
          ...event.metadata,
          referrer: document.referrer,
          userAgent: navigator.userAgent,
          screenSize: `${window.innerWidth}x${window.innerHeight}`,
        },
      });
    } catch (error) {
      console.error('Failed to track analytics event:', error);
    }
  }

  trackPageView(shortId: string) {
    this.trackEvent({
      shortId,
      event: 'pageview',
    });
  }

  trackConversion(shortId: string) {
    this.trackEvent({
      shortId,
      event: 'conversion',
    });
  }

  trackVideoPlay(shortId: string) {
    this.trackEvent({
      shortId,
      event: 'video_play',
    });
  }

  trackVideoComplete(shortId: string) {
    const duration = Date.now() - this.lastEventTime;
    this.trackEvent({
      shortId,
      event: 'video_complete',
      metadata: { duration },
    });
  }

  trackCarouselSlide(shortId: string, slideIndex: number) {
    this.trackEvent({
      shortId,
      event: 'carousel_slide',
      metadata: { slideIndex },
    });
  }

  updateLastEventTime() {
    this.lastEventTime = Date.now();
  }

  getSessionDuration() {
    return Date.now() - this.sessionStartTime;
  }
}

export const analyticsService = new AnalyticsService();
