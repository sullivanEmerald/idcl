import { Skeleton } from "@/components/ui/skeleton"


export default function StartupProfileSkeleton() {
    const skeletonItems = [
        { label: "Stage" },
        { label: "Location" },
        { label: "Date Founded" },
        { label: "Program Track" },
        { label: "Audience Reached" },
        { label: "Regions Covered" },
        { label: "Team Size" },
        { label: "Funding Raised" },
        { label: "Support Received" },
    ];

    return (
        <div className="space-y-2 w-full absolute top-1/2">
            {skeletonItems.map((item, index) => (
                <div key={index} className='flex flex-col sm:flex-row items-start sm:items-center gap-2 lg:gap-[9px] w-full'>
                    {/* Label Skeleton */}
                    <div className="w-full sm:w-[158px]">
                        <Skeleton className="h-10 w-full bg-gray-100 rounded-none border border-gray-200" />
                    </div>

                    {/* Value Skeleton */}
                    <div className="w-full sm:flex-1">
                        <Skeleton className="h-10 w-full bg-gray-100 rounded-none border border-gray-200" />
                    </div>
                </div>
            ))}
        </div>
    )
}