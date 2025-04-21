import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OG() {
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
            Influencer Marketing Platform
          </h1>
          
          <p
            style={{
              fontSize: '32px',
              margin: '0',
              color: '#64748b',
              lineHeight: 1.5,
            }}
          >
            Connect brands with influential promoters to create engaging campaigns.
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
            width: 'calc(100% - 80px)',
          }}
        >
          <div
            style={{
              fontSize: '24px',
              color: '#3b82f6',
              fontWeight: 'medium',
            }}
          >
            www.adminting.co
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
} 