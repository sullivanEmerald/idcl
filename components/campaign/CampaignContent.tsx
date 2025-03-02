"use client";

import { useState } from "react";
import Image from "next/image";
import { Carousel } from "@/components/ui/carousel";
import { analyticsService } from "@/services/analytics";

interface CampaignContentProps {
  campaign: {
    name: string;
    description: string;
    contentType: "photo" | "video" | "carousel";
    contentAssets: Array<{
      url: string;
      type: string;
      thumbnail?: string;
    }>;
    goal: "awareness" | "engagement" | "conversion";
    promotionLink: string;
    brandName: string;
  };
  shortUrlId: string;
  promoterId: string;
}

export function CampaignContent({
  campaign,
  shortUrlId,
  promoterId,
}: CampaignContentProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const trackInteraction = async (type: string) => {
    try {
      // For engagement goals, track interactions with content
      if (campaign.goal === "engagement") {
        await analyticsService.trackEvent(
          shortUrlId,
          "view",
          {
            metadata: { interactionType: type },
          },
          promoterId
        );
      }
    } catch (error) {
      console.error("Failed to track interaction:", error);
    }
  };

  const handlePromotionClick = async (type: string) => {
    try {
      // For conversion goals, track when users click through
      if (campaign?.goal === "conversion") {
        await analyticsService.trackEvent(
          shortUrlId,
          "conversion",
          {
            metadata: { interactionType: type },
          },
          promoterId
        );
      }
    } catch (error) {
      console.error("Failed to track conversion:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Brand and Campaign Info */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">{campaign.name}</h1>
          <p className="text-muted-foreground">{campaign.description}</p>
          <p className="text-sm mt-2">Presented by {campaign.brandName}</p>
        </div>

        {/* Content Display */}
        <div className="mb-8 rounded-lg overflow-hidden bg-card">
          {campaign.contentType === "photo" && (
            <div className="relative aspect-video">
              <Image
                src={campaign.contentAssets[0].url}
                alt={campaign.name}
                fill
                className="object-cover"
                onLoadingComplete={() => trackInteraction("photo_view")}
              />
            </div>
          )}

          {campaign.contentType === "video" && (
            <video
              className="w-full aspect-video"
              controls
              poster={campaign.contentAssets[0].thumbnail}
              onPlay={() => trackInteraction("video_play")}
              onEnded={() => trackInteraction("video_complete")}
            >
              <source src={campaign.contentAssets[0].url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          {campaign.contentType === "carousel" && (
            <Carousel>
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {campaign.contentAssets.map((asset, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    {asset.type === "video" ? (
                      <video
                        src={asset.url}
                        controls
                        className="w-full h-auto"
                        poster={asset.thumbnail}
                        onPlay={() => trackInteraction("video_play")}
                      />
                    ) : (
                      <Image
                        src={asset.url}
                        alt={`${campaign.name} content ${index + 1}`}
                        width={800}
                        height={600}
                        className="w-full h-auto object-cover"
                        onClick={() => trackInteraction("image_click")}
                      />
                    )}
                  </div>
                ))}
              </div>
              {campaign.contentAssets.length > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  {campaign.contentAssets.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? "bg-primary" : "bg-gray-300"}`}
                      onClick={() => {
                        setCurrentIndex(index);
                        trackInteraction("carousel_dot_click");
                      }}
                    />
                  ))}
                </div>
              )}
            </Carousel>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <a
            href={campaign.promotionLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handlePromotionClick("learn_more")}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}
