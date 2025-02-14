export interface Advertiser {
  id: string;
  companyName: string;
  logo?: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  advertiser: Advertiser;
  pricePerPost: number;
  requiredPlatforms: string[];
  targetedNiches: string[];
  endDate: string;
  status?: 'active' | 'pending' | 'completed';
  applicationStatus?: 'pending' | 'approved' | 'rejected' | null;
  earnings?: number;
  reach?: number;
  engagement?: number;
}
