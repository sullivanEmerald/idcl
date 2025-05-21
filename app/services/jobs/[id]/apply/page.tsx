import JobForm from "@/components/sections/jobs/form"
import Image from "next/image"

export default function JobApplicationPage() {
    return (
        <div className="relative">
            {/* Background Images - fixed height */}
            <div className="relative h-[639px] w-full">
                <Image
                    src="/images/jobs/image.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
                <Image
                    src="/images/jobs/cover.png"
                    alt="Overlay"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Content Container - positioned over background but with proper flow */}
            <div className="relative container mx-auto px-4 -mt-80 mb-12 z-10">
                <JobForm />
            </div>
        </div>

    )
}