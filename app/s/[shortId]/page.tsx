'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function RedirectPage({ params }: { params: { shortId: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const redirect = async () => {
      try {
        // Get short URL details
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/url-shortener/campaign/${params.shortId}`);
        const campaignId = response.data.campaignId;
        const promoterId = response.data.promoterId;
        
        const utm_source = searchParams.get('utm_source') || '';
        
        // Create query string with promoterId and utm_source
        let queryParams = `pId=${promoterId}`;
        if (utm_source) queryParams += `&utm_source=${utm_source}`;
        
        // Redirect to campaign page with parameters
        router.push(`/c/${campaignId}?${queryParams}`);
      } catch (error) {
        console.error('Failed to handle redirect:', error);
        router.push('/404');
      }
    };

    redirect();
  }, [params.shortId, router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
      </div>
    </div>
  );
}
