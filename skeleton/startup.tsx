import { Skeleton } from "@/components/ui/skeleton"

export function StartupSkeleton() {
    return (
        <div className="w-full px-4 sm:px-6 lg:px-0">
            <div className="w-full max-w-[1198px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-[33px]">
                {[...Array(8)].map((_, index) => (
                    <div
                        key={index}
                        className="relative border rounded-lg lg:rounded-[12px] bg-white w-full lg:w-[284px] pt-8 sm:pt-10 lg:pt-[30px] px-4 sm:px-5 lg:px-[20px] pb-5 sm:pb-6 lg:pb-[24px] flex flex-col items-start gap-4 sm:gap-5 lg:gap-[18px]"
                    >
                        {/* Tag */}
                        <Skeleton className="absolute right-4 sm:right-5 lg:right-[20px] top-4 sm:top-5 lg:top-[20px] w-[74px] h-[24px] lg:h-[28px] rounded-md lg:rounded-[8px] bg-gray-100" />

                        {/* Logo and Name */}
                        <div className="flex items-center gap-3 lg:gap-[11px] w-full">
                            <Skeleton className="w-16 h-16 rounded-full bg-gray-70" />
                            <Skeleton className="h-5 w-[100px] bg-gray-100" />
                        </div>

                        {/* Description */}
                        <Skeleton className="h-4 w-full bg-gray-100" />
                        <Skeleton className="h-4 w-3/4 bg-gray-100" />

                        {/* Case Study Box */}
                        <Skeleton className="w-full h-[60px] sm:h-[70px] lg:h-[80px] bg-gray-100 rounded" />

                        {/* Button */}
                        <Skeleton className="w-full lg:w-[159px] h-10 sm:h-12 rounded-full bg-gray-100" />
                    </div>
                ))}
            </div>
        </div>
    )
}