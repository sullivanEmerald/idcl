import { Metadata, ResolvingMetadata } from 'next';
import axios from 'axios';

type Props = {
  params: { shortId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Get shortId from URL params
  const shortId = params.shortId;
  
  // Fetch campaign data
  let campaign;
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'}/campaigns/public/${shortId}`
    );
    campaign = response.data;
  } catch (error) {
    console.error('Failed to fetch campaign metadata:', error);
  }
  
  // Fallback values if campaign fetch fails
  const title = campaign?.title || 'Campaign';
  const description = campaign?.description || 'View this campaign on Adminting';
  
  // Get image URL - use first campaign asset if available, fallback to default OG
  const imageUrl = campaign?.contentAssets?.length > 0
    ? campaign.contentAssets[0].url
    : new URL('opengraph-image.png', process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://adminting.co').toString();
  
  // Get parent metadata from layout
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [imageUrl, ...previousImages],
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://adminting.co'}/c/${shortId}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
} 