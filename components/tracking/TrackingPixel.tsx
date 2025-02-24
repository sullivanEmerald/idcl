import { useEffect } from 'react';
import { analyticsService } from '@/services/analytics';

interface TrackingPixelProps {
  shortUrlId: string;
}

export function TrackingPixel({ shortUrlId }: TrackingPixelProps) {
  useEffect(() => {
    const trackView = async () => {
      try {
        await analyticsService.trackEvent({
          shortUrlId,
          eventType: 'view',
        });
      } catch (error) {
        console.error('Failed to track view:', error);
      }
    };

    trackView();
  }, [shortUrlId]);

  return null; // Tracking pixel doesn't render anything
}
