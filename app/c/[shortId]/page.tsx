'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import { NavigationBar } from '@/components/ui/navigation-bar';
import { Footer } from '@/components/layout/footer';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface ContentAsset {
  type: 'photo' | 'video' | 'carousel';
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
}

export default function CampaignPage({ params }: { params: { shortId: string } }) {
  const router = useRouter();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        // Get campaign details directly from campaigns endpoint
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/campaigns/public/${params.shortId}`);
        console.log(response.data);
        setCampaign(response.data);
      } catch (error) {
        console.error('Failed to fetch campaign:', error);
        // router.push('/404');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [params.shortId, router]);

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
        {/* Campaign Assets */}
        <div className="mb-12">
          {campaign.contentAssets[0]?.type === 'carousel' ? (
            <Carousel className="w-full">
              <CarouselContent>
                {campaign.contentAssets
                  .sort((a, b) => (a.carouselIndex || 0) - (b.carouselIndex || 0))
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
          ) : campaign.contentAssets[0]?.type === 'video' ? (
            <div className="relative aspect-video">
              <video
                src={campaign.contentAssets[0].url}
                controls
                className="w-full h-full rounded-lg"
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
            onClick={() => {
              // Track the click event
              axios.post(`${process.env.NEXT_PUBLIC_API_URL}/analytics/track`, {
                shortId: params.shortId,
                event: 'conversion'
              }).catch(console.error);
            }}
          >
            Learn More
          </a>
        </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
