import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import axios from 'axios';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function og(request: NextRequest) {
  try {
    // Get shortId from the path
    const { pathname } = new URL(request.url);
    const shortId = pathname.split('/')[2];

    let campaignTitle = 'Adminting Campaign';
    let campaignDescription = 'View this campaign on Adminting';
    let campaignId = '';
    
    try {
      // First get the campaign ID from the URL shortener service
      const urlResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/url-shortener/campaign/${shortId}`
      );
      
      campaignId = urlResponse.data.campaignId;
      
      // Then fetch the campaign details using the campaign ID
      if (campaignId) {
        const campaignResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/campaigns/public/${campaignId}`
        );
        
        const campaign = campaignResponse.data;
        
        if (campaign) {
          campaignTitle = campaign.title || campaignTitle;
          campaignDescription = campaign.description || campaignDescription;
        }
      }
    } catch (error) {
      console.error('Failed to fetch campaign data for OG image:', error);
    }

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#f8fafc',
            padding: '48px',
            color: '#1e293b',
            fontFamily: 'Inter, sans-serif',
            background: 'linear-gradient(to bottom right, #f0f9ff, #e0f2fe)',
            position: 'relative',
          }}
        >
          {/* Logo */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              left: '40px',
              display: 'flex',
              alignItems: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
            }}
          >
            Adminting
          </div>
          
          {/* Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              maxWidth: '80%',
            }}
          >
            <h1
              style={{
                fontSize: '64px',
                fontWeight: 'bold',
                margin: '0 0 24px 0',
                lineHeight: 1.2,
              }}
            >
              {campaignTitle}
            </h1>
            
            <p
              style={{
                fontSize: '32px',
                margin: '0',
                color: '#64748b',
                lineHeight: 1.5,
              }}
            >
              {campaignDescription.length > 100 
                ? campaignDescription.substring(0, 100) + '...' 
                : campaignDescription}
            </p>
          </div>
          
          {/* Footer */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '1040px',
            }}
          >
            <div
              style={{
                fontSize: '24px',
                color: '#3b82f6',
                fontWeight: 'medium',
              }}
            >
              View this campaign on Adminting
            </div>
          </div>
        </div>
      ),
      { ...size }
    );
  } catch (error) {
    console.error('Error generating OpenGraph image:', error);
    
    // Fallback image
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#f8fafc',
            color: '#1e293b',
            fontFamily: 'Inter, sans-serif',
            background: 'linear-gradient(to bottom right, #f0f9ff, #e0f2fe)',
          }}
        >
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
            }}
          >
            Adminting Campaign
          </h1>
        </div>
      ),
      { ...size }
    );
  }
} 