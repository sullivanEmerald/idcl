'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function RedirectPage({ params }: { params: { shortId: string } }) {
  const router = useRouter();

  useEffect(() => {
    const redirect = async () => {
      try {
        // Get short URL details
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/url-shortener/campaign/${params.shortId}`);
        console.log(response?.data)
        const campaignId = response.data.campaignId;
        
        // Redirect to campaign page
        router.push(`/c/${campaignId}`);
      } catch (error) {
        console.error('Failed to handle redirect:', error);
        router.push('/404');
      }
    };

    redirect();
  }, [params.shortId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
      </div>
    </div>
  );
}
