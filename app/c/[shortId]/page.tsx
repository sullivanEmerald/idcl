"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { NavigationBar } from "@/components/ui/navigation-bar";
// import { Footer } from '@/components/layout/footer';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { analyticsService } from "@/services/analytics";
import { usePathname } from "next/navigation";

interface ContentAsset {
  type: "photo" | "video" | "carousel";
  contentType: string;
  url: string;
  carouselIndex?: number;
  width?: number;
  height?: number;
}

interface Campaign {
  title: string;
  description: string;
  contentAssets: ContentAsset[];
  promotionLink: string;
  requirements?: {
    ctaLabel?: string;
    contentGuidelines?: string;
    postingSchedule?: {
      startTime: string;
      endTime: string;
      days: string[];
    };
    hashtags: string[];
    mentions: string[];
    brandAssetLinks?: string[];
  };
}

export default function CampaignPage({
  params,
  searchParams,
}: {
  params: { shortId: string };
  searchParams: { pId?: string };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const promoterId = searchParams.pId;
  const [referrer] = useState(
    typeof document !== "undefined" ? document.referrer : ""
  );

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        // Get campaign details directly from campaigns endpoint
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/campaigns/public/${params.shortId}`
        );
        setCampaign(response.data);

        // Track page view after campaign loads
        analyticsService.trackPageView(params.shortId, promoterId);
      } catch (error) {
        console.error("Failed to fetch campaign:", error);
        // router.push('/404');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();

    // Track session duration when user leaves
    const handleBeforeUnload = () => {
      const duration = analyticsService.getSessionDuration();
      const baseMetadata = analyticsService.getBaseMetadata();
      const blob = new Blob(
        [
          JSON.stringify({
            shortUrlId: params.shortId,
            eventType: "view",
            promoterId: promoterId,
            metadata: {
              ...baseMetadata,
              duration,
              path: pathname,
              interactionType: "campaign_view_end",
              referrer,
            },
          }),
        ],
        { type: "application/json" }
      );
      navigator.sendBeacon(
        `${process.env.NEXT_PUBLIC_API_URL}/analytics/track`,
        blob
      );
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [params.shortId, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading Campaign...</h1>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavigationBar />

      <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Campaign Info */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">{campaign.title}</h1>
            {campaign.description && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">{campaign.description}</p>
            )}
          </div>
          {/* Campaign Assets */}
          <div className="mb-12">
            {campaign.contentAssets[0]?.type === "carousel" ? (
              <Carousel
                className="w-full"
                onSelect={(index) =>
                  analyticsService.trackCarouselSlide(
                    params.shortId,
                    index,
                    promoterId
                  )
                }
              >
                <CarouselContent>
                  {campaign.contentAssets
                    .sort(
                      (a, b) => (a.carouselIndex || 0) - (b.carouselIndex || 0)
                    )
                    .map((asset, index) => (
                      <CarouselItem key={index}>
                        <div className="relative aspect-video">
                          <Image
                            src={asset.url}
                            alt={`Slide ${index + 1}`}
                            fill
                            className="object-contain rounded-lg"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            ) : campaign.contentAssets[0]?.type === "video" ? (
              <div className="relative aspect-video">
                <video
                  ref={videoRef}
                  src={campaign.contentAssets[0].url}
                  controls
                  className="w-full h-full rounded-lg"
                  onPlay={() =>
                    analyticsService.trackVideoPlay(params.shortId, promoterId)
                  }
                  onTimeUpdate={() => {
                    const video = videoRef.current;
                    if (!video) return;
                    
                    // Track view duration at key intervals
                    const currentTime = Math.floor(video.currentTime);
                    if (currentTime === 3 || currentTime === 30 || currentTime === 60) {
                      analyticsService.trackVideoProgress(
                        params.shortId,
                        currentTime,
                        promoterId
                      );
                    }
                  }}
                  onEnded={() =>
                    analyticsService.trackVideoComplete(
                      params.shortId,
                      promoterId
                    )
                  }
                />
              </div>
            ) : (
              <div className="relative aspect-video">
                <Image
                  src={campaign.contentAssets[0].url}
                  alt={campaign.title}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            )}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <a
              href={campaign.promotionLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              onClick={() =>
                analyticsService.trackConversion(
                  params.shortId,
                  campaign.promotionLink,
                  promoterId
                )
              }
            >
              {campaign.requirements?.ctaLabel || "Learn More"}
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
