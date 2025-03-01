/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { brandService } from '@/services/brand';
import Link from 'next/link';
import { Search, Star, StarOff, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import type { Brand } from '@/services/brand';

// Predefined colors for brand avatars
const BRAND_COLORS = [
  'bg-blue-500',
  'bg-green-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-orange-500',
  'bg-teal-500',
  'bg-cyan-500',
  'bg-rose-500',
  'bg-emerald-500',
];

// Get consistent color based on brand ID
const getBrandColor = (brandId: string) => {
  const index = brandId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return BRAND_COLORS[index % BRAND_COLORS.length];
};

export default function BrandsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [filter, setFilter] = useState<'all' | 'following' | 'not-following'>('all');

  useEffect(() => {
    const loadBrands = async () => {
      try {
        setIsLoading(true);
        const data = await brandService.getBrands({ search: searchQuery });
        setBrands(data);
      } catch (error: any) {
        toast.error(error.message || 'Failed to load brands');
      } finally {
        setIsLoading(false);
      }
    };

    loadBrands();
  }, [searchQuery]);

  const handleFollowToggle = async (brandId: string, isFollowing: boolean) => {
    if (isUpdating) return;

    try {
      setIsUpdating(true);
      if (isFollowing) {
        await brandService.unfollowBrand(brandId);
        toast.success('Brand unfollowed successfully');
      } else {
        await brandService.followBrand(brandId);
        toast.success('Brand followed successfully');
      }

      setBrands(brands.map(brand => 
        brand.id === brandId 
          ? { ...brand, isFollowing: !isFollowing }
          : brand
      ));
    } catch (error: any) {
      toast.error(error.message || `Failed to ${isFollowing ? 'unfollow' : 'follow'} brand`);
    } finally {
      setIsUpdating(false);
    }
  };

  const getFilteredBrands = () => {
    switch (filter) {
      case 'following':
        return brands.filter(brand => brand.isFollowing);
      case 'not-following':
        return brands.filter(brand => !brand.isFollowing);
      default:
        return brands;
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Discover Brands</h1>
        <div className="relative w-72">
          <Input
            type="text"
            placeholder="Search brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      <Tabs value={filter} onValueChange={(value: any) => setFilter(value)} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="all">All Brands</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
          <TabsTrigger value="not-following">Not Following</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array(6).fill(0).map((_, i) => (
            <Card key={i} className="p-6 space-y-4 animate-pulse">
              <div className="h-16 w-16 bg-gray-200 rounded-full" />
              <div className="h-4 w-3/4 bg-gray-200 rounded" />
              <div className="h-4 w-1/2 bg-gray-200 rounded" />
            </Card>
          ))
        ) : (
          getFilteredBrands().map((brand) => (
            <Card key={brand.id} className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <Link href={`/promoter/brands/${brand.id}`} className="group">
                  <div className="flex items-center space-x-4">
                    {brand.logo ? (
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="h-16 w-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className={`h-16 w-16 rounded-full ${getBrandColor(brand.id)} flex items-center justify-center text-xl font-semibold text-white`}>
                        {brand.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold group-hover:text-primary">
                          {brand.name}
                        </h3>
                        {brand.isVerified && (
                          <Badge variant="secondary" className="flex items-center space-x-1">
                            <ShieldCheck className="h-3 w-3" />
                            <span>Verified</span>
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {brand.industry}
                      </p>
                    </div>
                  </div>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleFollowToggle(brand.id, brand.isFollowing)}
                  disabled={isUpdating}
                >
                  {brand.isFollowing ? (
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ) : (
                    <StarOff className="h-5 w-5" />
                  )}
                </Button>
              </div>
              <p className="text-sm line-clamp-2">{brand.description}</p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>{brand.followerCount} {brand.followerCount > 1 ? "followers" : "follower"}</span>
                <span>{brand.campaignCount} campaigns</span>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
