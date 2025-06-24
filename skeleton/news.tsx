"use client"
import { Skeleton } from "@/components/ui/skeleton"

export default function NewsSkeleton() {
    return (
        <div className="w-full sm:w-[1200px] py-10 mx-auto space-y-10">
            <div className="w-full space-y-4">
                {/* Latest News Skeleton */}
                <Skeleton className="h-6 w-[200px] bg-gray-100" />

                <div className="space-y-2">
                    <Skeleton className="w-full h-[500px] rounded-[10px] bg-gray-100" />
                    <div className="flex items-center justify-between w-full">
                        <Skeleton className="h-4 w-24 bg-gray-100" />
                        <Skeleton className="h-4 w-24 bg-gray-100" />
                    </div>
                </div>

                <Skeleton className="h-5 w-full bg-gray-100" />
                <Skeleton className="h-4 w-full bg-gray-100" />
                <Skeleton className="h-16 w-full bg-gray-100" />
            </div>

            {/* More News Skeleton */}
            <div className="space-y-4">
                <Skeleton className="h-6 w-[200px] bg-gray-100" />

                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-full border rounded-[10px] shadow-lg p-2 space-y-3">
                            <Skeleton className="w-full h-[200px] rounded-[10px] bg-gray-100" />

                            <div className="flex items-center justify-between w-full">
                                <Skeleton className="h-3 w-20 bg-gray-100" />
                                <Skeleton className="h-3 w-20 bg-gray-100" />
                            </div>

                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full bg-gray-100" />
                                <Skeleton className="h-3 w-full bg-gray-100" />
                                <Skeleton className="h-3 w-full bg-gray-100" />
                                <Skeleton className="h-3 w-full bg-gray-100" />
                                <Skeleton className="h-4 w-[120px] bg-gray-100" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}