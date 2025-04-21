import axios from 'axios';
import { Metadata } from 'next';

type Props = {
  params: { shortId: string };
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  // Get the shortId from params
  const shortId = params.shortId;
  
  // Default metadata
  let metadata: Metadata = {
    title: 'Adminting Campaign',
    description: 'View this campaign on Adminting',
  };
  
  try {
    // First get the campaign ID from the URL shortener service
    const urlResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/url-shortener/campaign/${shortId}`
    );
    
    const campaignId = urlResponse.data.campaignId;
    
    // Then fetch the campaign details using the campaign ID
    if (campaignId) {
      const campaignResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/campaigns/public/${campaignId}`
      );
      
      const campaign = campaignResponse.data;
      
      if (campaign) {
        const title = campaign.title || 'Adminting Campaign';
        const description = campaign.description || 'View this campaign on Adminting';
        
        metadata = {
          title,
          description,
          openGraph: {
            title,
            description,
            url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/s/${shortId}`,
            siteName: 'Adminting',
            locale: 'en_US',
            type: 'website',
          },
          twitter: {
            card: 'summary_large_image',
            title,
            description,
          },
          // Add alternate URLs to help SEO
          alternates: {
            canonical: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/c/${campaignId}`,
          }
        };
        
        // Add cover image if available
        if (campaign.coverImage) {
          metadata.openGraph = {
            ...metadata.openGraph,
            images: [
              {
                url: campaign.coverImage,
                width: 1200,
                height: 630,
                alt: title,
              },
            ],
          };
          
          metadata.twitter = {
            ...metadata.twitter,
            images: [campaign.coverImage],
          };
        } else if (campaign.contentAssets?.length > 0) {
          // Fallback to first content asset
          const imageUrl = campaign.contentAssets[0].url;
          
          metadata.openGraph = {
            ...metadata.openGraph,
            images: [
              {
                url: imageUrl,
                width: 1200,
                height: 630,
                alt: title,
              },
            ],
          };
          
          metadata.twitter = {
            ...metadata.twitter,
            images: [imageUrl],
          };
        }
      }
    }
  } catch (error) {
    console.error('Failed to fetch campaign metadata:', error);
  }
  
  return metadata;
} 