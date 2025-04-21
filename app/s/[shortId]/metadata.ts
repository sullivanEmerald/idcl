import axios from 'axios';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { shortId: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
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
        metadata = {
          title: campaign.title || 'Adminting Campaign',
          description: campaign.description || 'View this campaign on Adminting',
          openGraph: {
            title: campaign.title || 'Adminting Campaign',
            description: campaign.description || 'View this campaign on Adminting',
            url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/s/${shortId}`,
            siteName: 'Adminting',
            locale: 'en_US',
            type: 'website',
          },
          twitter: {
            card: 'summary_large_image',
            title: campaign.title || 'Adminting Campaign',
            description: campaign.description || 'View this campaign on Adminting',
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
                alt: campaign.title,
              },
            ],
          };
          
          metadata.twitter = {
            ...metadata.twitter,
            images: [campaign.coverImage],
          };
        }
      }
    }
  } catch (error) {
    console.error('Failed to fetch campaign metadata:', error);
  }
  
  return metadata;
} 