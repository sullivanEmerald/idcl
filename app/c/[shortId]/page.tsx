"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { NavigationBar } from "@/components/ui/navigation-bar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { analyticsService } from "@/services/analytics";
import { Campaign } from "@/types/campaign";

export default function CampaignPage({
  params,
  searchParams: initialSearchParams,
}: {
  params: { shortId: string };
  searchParams: { pId?: string; utm_source?: string };
}) {
  const router = useRouter();
  const searchParamsHook = useSearchParams();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [promoterCampaigns, setPromoterCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [campaignExpired, setCampaignExpired] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const promoterId = initialSearchParams.pId;
  const utmSource =
    initialSearchParams.utm_source ||
    searchParamsHook.get("utm_source") ||
    undefined;

  // Ref to track if analytics have been recorded
  const analyticsRecorded = useRef(false);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        // Get campaign details directly from campaigns endpoint
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/campaigns/public/${params.shortId}`
        );

        // Check if campaign has expired or is completed
        const campaignData = response.data;
        if (
          campaignData.status === "completed" ||
          campaignData.status === "expired" ||
          (campaignData.endDate && new Date(campaignData.endDate) < new Date())
        ) {
          setCampaignExpired(true);
          setCampaign(null);
        } else {
          setCampaign(campaignData);

          if (!analyticsRecorded.current) {
            await analyticsService.trackUserView(
              params.shortId,
              promoterId,
              utmSource
            );
            analyticsRecorded.current = true;
          }

          // If we have a promoterId, fetch all campaigns this promoter is promoting
          if (promoterId) {
            try {
              const promoterCampaignsResponse = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/promoter/campaigns/promoted/${promoterId}`
              );
              setPromoterCampaigns(
                promoterCampaignsResponse.data.campaigns || []
              );
            } catch (error) {
              console.error("Failed to fetch promoter campaigns:", error);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch campaign:", error);
        // router.push('/404');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [params.shortId, promoterId, utmSource]);

  // Update document title - simple client-side metadata update
  useEffect(() => {
    if (campaign?.title) {
      document.title = `${campaign.title} | Adminting`;
    }
  }, [campaign?.title]);

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

  if (campaignExpired) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <NavigationBar />

        <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto text-center bg-white p-8 rounded-lg shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-gray-400 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Campaign Expired
            </h1>
            <p className="text-gray-600 mb-6">
              This campaign is no longer active and has been completed or
              expired.
            </p>
            <button
              onClick={() => router.push("/")}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Return Home
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (!campaign) {
    return null;
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: "url(/desktop.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:gap-6">
            {/* Main content area */}
            <div className="w-full lg:flex-1">
              {/* Campaign Info */}
              <div className="mb-8 flex items-center justify-between w-full sm:w-[578px] mx-auto bg-white p-2 rounded-md">
                <div className="flex items-center gap-4">
                  <img src="/adl.png" alt="" />
                  <div>
                    <h1 className="text-[18px] font-bold tracking-tight text-black">
                      {campaign.title}
                    </h1>
                    {campaign.description && (
                      <p className="text-base text-black font-normal mx-auto">
                        {campaign.advertiser.companyName}
                      </p>
                    )}
                  </div>
                </div>
                <div
                  className={`text-[10px] min-w-[47px] h-[21px] rounded-sm font-semibold p-4 flex items-center justify-center ${campaign.campaignGoal === "awareness" ? "bg-[#C2FFDB] text-[#00A142]" : campaign.campaignGoal === "engagement" ? "bg-[#FFC2F8] text-[#8C00A1]" : "bg-[#FFF9C2] text-[#A19900]"}`}
                >
                  {campaign.campaignGoal}
                </div>
              </div>
              {/* Campaign Assets */}
              <div className="mb-12 w-full sm:w-[578px] mx-auto bg-white p-2 rounded-md h-auto sm:h-[551px]">
                {campaign.contentAssets.length > 0 ? (
                  campaign.contentAssets[0]?.type === "carousel" ? (
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
                            (a, b) =>
                              (a.carouselIndex || 0) - (b.carouselIndex || 0)
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
                    <div className="relative h-[420px] w-full bg-black rounded-lg overflow-hidden">
                      <video
                        ref={videoRef}
                        src={campaign.contentAssets[0].url}
                        controls
                        className="w-full h-full rounded-lg object-contain"
                        onPlay={() =>
                          analyticsService.trackVideoPlay(
                            params.shortId,
                            promoterId
                          )
                        }
                        onLoadedMetadata={(e) => {
                          const video = e.target as HTMLVideoElement;
                          const aspectRatio =
                            video.videoWidth / video.videoHeight;
                          video.parentElement?.style.setProperty(
                            "aspect-ratio",
                            `${aspectRatio}`
                          );
                        }}
                        onTimeUpdate={() => {
                          const video = videoRef.current;
                          if (!video) return;

                          // Track view duration at key intervals
                          const currentTime = Math.floor(video.currentTime);
                          if (
                            currentTime === 3 ||
                            currentTime === 30 ||
                            currentTime === 60
                          ) {
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
                      <img
                        src={campaign.contentAssets[0].url}
                        alt={campaign.title}
                        className="object-contain rounded-lg w-full h-auto sm:h-[420px]"
                      />
                    </div>
                  )
                ) : (
                  <div className="relative aspect-video">
                    <p>No campaign assets found</p>
                  </div>
                )}
                <p className="text-sm font-normal"> {campaign.description} </p>
              </div>

              <div className="w-full sm:w-[578px] mx-auto bg-white p-2 rounded-md flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <img src="/fir.png" alt="fire" />
                  <span className="text-[#FD650B] font-bold text-base">
                    {campaign.metrics?.totalViews}
                  </span>
                  <span className="text-[#FD650B] font-normal">
                    Impressions
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <button className="flex justify-center items-center gap-2 w-[109px] h-[41px] text-[14px] font-semibold rounded-lg bg-[#1E1E1E] text-white hover:bg-[#1E1E1E] transition-colors">
                    Share <img src="/share-white.png" alt="share white" />{" "}
                  </button>

                  {campaign.campaignGoal !== "awareness" && (
                    <div className="text-center">
                      <a
                        href={campaign.promotionLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex justify-center items-center w-[109px] h-[41px] text-[14px] font-semibold rounded-lg bg-[#0093DD] text-white hover:bg-[#0093DD] transition-colors"
                        onClick={() =>
                          analyticsService.trackConversion(
                            params.shortId,
                            campaign.promotionLink || "",
                            promoterId,
                            campaign.campaignGoal
                          )
                        }
                      >
                        {campaign.requirements?.ctaLabel || "Learn More"}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Promoter's Other Campaigns Section - Sidebar on desktop, below content on mobile */}
            {promoterId && promoterCampaigns.length > 0 && (
              <div className="w-full sm:w-[500px] lg:w-[222px] mx-auto lg:mx-0 bg-white p-2 rounded-lg mt-8 lg:mt-0">
                <div>
                  <h2 className="mb-2 text-[10px] font-bold">More Ads</h2>
                </div>

                <div className="space-y-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                  {promoterCampaigns
                    .filter((promoCampaign) => promoCampaign.id !== campaign.id)
                    .map((promoCampaign) => (
                      <div
                        key={promoCampaign.id}
                        className="bg-white p-1 border border-gray rounded-lg cursor-pointer w-full h-[195px] group"
                        onClick={() =>
                          router.push(
                            `/c/${promoCampaign.id}?pId=${promoterId}`
                          )
                        }
                      >
                        {/* Campaign image with elements overlaid on it */}
                        {promoCampaign.contentAssets?.length > 0 && (
                          <div className="relative aspect-video mb-3 w-full h-[195px]">
                            <Image
                              src={promoCampaign.coverImage}
                              alt={promoCampaign.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg"
                            />
                            {promoCampaign.contentAssets?.some(
                              (asset) => asset.type === "video"
                            ) && (
                              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <video
                                  src={
                                    promoCampaign.contentAssets.find(
                                      (asset) => asset.type === "video"
                                    )?.url
                                  }
                                  poster={promoCampaign.coverImage}
                                  preload="none"
                                  muted
                                  loop
                                  playsInline
                                  className="w-full h-full object-cover"
                                  onMouseEnter={(e) => e.currentTarget.play()}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.pause();
                                    e.currentTarget.currentTime = 0;
                                  }}
                                />
                              </div>
                            )}

                            {/* Top bar with logo on left and metrics on right */}
                            <div className="absolute top-0 w-full flex items-center justify-between p-2 z-10">
                              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                                <img
                                  src={
                                    promoCampaign.advertiser.logo || "/adl.png"
                                  }
                                  alt=""
                                  className="h-6 w-6 rounded-full object-cover"
                                />
                              </div>
                              <div className="h-8 bg-white flex items-center gap-4 px-3 rounded-md">
                                <div className="flex items-center gap-1">
                                  <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                      fill="black"
                                    />
                                  </svg>
                                  <span className="text-[12px] font-medium">
                                    {promoCampaign.metrics?.totalEngagements ||
                                      0}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                                      fill="black"
                                    />
                                  </svg>
                                  <span className="text-[12px] font-medium">
                                    {promoCampaign.metrics?.totalViews || 0}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Title and advertiser name in bottom overlay */}
                            <div className="absolute bottom-2 z-10 w-full bg-white rounded-lg px-2">
                              <div>
                                <h3 className="text-[14px] font-bold text-black truncate">
                                  {promoCampaign.title}
                                </h3>
                                <p className="text-[12px] text-gray-600 truncate">
                                  {promoCampaign.advertiser.companyName}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
