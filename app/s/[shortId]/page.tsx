'use server';

import { redirect } from 'next/navigation';
import axios from 'axios';

// This is now a Server Component that runs on the server
export default async function RedirectPage({ params, searchParams }: { 
  params: { shortId: string },
  searchParams: { utm_source?: string }
}) {
  try {
    // Get short URL details
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/url-shortener/campaign/${params.shortId}`
    );
    
    const campaignId = response.data.campaignId;
    const promoterId = response.data.promoterId;
    
    const utm_source = searchParams.utm_source || '';
    
    // Create query string with promoterId and utm_source
    let queryParams = `pId=${promoterId}`;
    if (utm_source) queryParams += `&utm_source=${utm_source}`;
    
    // Server-side redirect which will be followed by crawlers
    redirect(`/c/${campaignId}?${queryParams}`);
  } catch (error) {
    console.error('Failed to handle redirect:', error);
    redirect('/404');
  }
  
  // This return is unreachable but required by TypeScript
  return null;
}
