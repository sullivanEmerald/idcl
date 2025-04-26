/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { brandService } from "@/services/brand";
import Link from "next/link";
import { Search } from "lucide-react";
import { toast } from "sonner";
import type { Brand } from "@/services/brand";

const BRAND_COLORS = [
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-orange-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-rose-500",
  "bg-emerald-500",
];

// Get consistent color based on brand ID
const getBrandColor = (brandId: string) => {
  const index = brandId
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return BRAND_COLORS[index % BRAND_COLORS.length];
};

function BrandCard({
  brand,
  onFollowToggle,
  isUpdating,
}: {
  brand: Brand;
  onFollowToggle: (brandId: string, isFollowing: boolean) => Promise<void>;
  isUpdating: boolean;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-4">
        {/* Left side - Logo */}
        <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
          {brand.logo ? (
            <img
              src={brand.logo}
              alt={`${brand.name} logo`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className={`w-full h-full ${getBrandColor(brand.id)} flex items-center justify-center text-xl font-semibold text-white`}
            >
              {brand.name.slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>

        {/* Right side - Content */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <Link href={`/promoter/dashboard/brands/${brand.id}`}>
                <h3 className="font-bold text-[12px]">{brand.name}</h3>
              </Link>
              <span className="mt-2 w-[48px] h-[18px] flex items-center justify-center border border-gray-300 rounded-md text-sm text-gray-600">
                {brand.industry}
              </span>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                onFollowToggle(brand.id, brand.isFollowing);
              }}
              disabled={isUpdating}
              className={`text-sm font-medium transition-colors ${
                brand.isFollowing
                  ? "text-red-500 hover:text-red-600"
                  : "text-blue-500 hover:text-blue-600"
              } ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {brand.isFollowing ? "Unfollow -" : "Follow +"}
            </button>
          </div>

          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-[14px]">
                {brand.followerCount || 0}
              </span>
              <span className="text-gray-500 text-[12px]">Followers</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-[14px]">
                {brand.campaignCount || 0}
              </span>
              <span className="text-gray-500 text-[12px]">Campaigns</span>
            </div>
          </div>

          <p className="text-[12px] text-gray-600 line-clamp-2">
            {brand.description || "No description available"}
          </p>
        </div>
      </div>
    </Card>
  );
}

export default function BrandsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [filter, setFilter] = useState<"all" | "following" | "not-following">(
    "all"
  );

  const loadBrands = async () => {
    try {
      setIsLoading(true);
      const data = await brandService.getBrands({ search: searchQuery });
      setBrands(data);
    } catch (error: any) {
      toast.error(error.message || "Failed to load brands");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBrands();
  }, [searchQuery]);

  const handleFollowToggle = async (brandId: string, isFollowing: boolean) => {
    if (isUpdating) return;

    try {
      setIsUpdating(true);
      if (isFollowing) {
        await brandService.unfollowBrand(brandId);
        toast.success("Brand unfollowed successfully");
      } else {
        await brandService.followBrand(brandId);
        toast.success("Brand followed successfully");
      }

      setBrands(
        brands.map((brand) =>
          brand.id === brandId ? { ...brand, isFollowing: !isFollowing } : brand
        )
      );
      loadBrands();
    } catch (error: any) {
      toast.error(
        error.message ||
          `Failed to ${isFollowing ? "unfollow" : "follow"} brand`
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const getFilteredBrands = () => {
    switch (filter) {
      case "following":
        return brands.filter((brand) => brand.isFollowing);
      case "not-following":
        return brands.filter((brand) => !brand.isFollowing);
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

      <Tabs
        value={filter}
        onValueChange={(value: any) => setFilter(value)}
        className="w-full"
      >
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="all">All Brands</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
          <TabsTrigger value="not-following">Not Following</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array(6)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="p-6 space-y-4 animate-pulse">
                  <div className="h-16 w-16 bg-gray-200 rounded-full" />
                  <div className="h-4 w-3/4 bg-gray-200 rounded" />
                  <div className="h-4 w-1/2 bg-gray-200 rounded" />
                </Card>
              ))
          : getFilteredBrands().map((brand) => (
              <BrandCard
                key={brand.id}
                brand={brand}
                onFollowToggle={handleFollowToggle}
                isUpdating={isUpdating}
              />
            ))}
      </div>
    </div>
  );
}
