import GeneralEllipse from "@/components/general/ellipse"
import JobForm from "@/components/sections/jobs/form"
import Image from "next/image"

export default function JobApplicationPage() {
    return (
        <>
            <div className="relative">
                {/* Background Images */}
                <div className="relative h-[400px] sm:h-[500px] lg:h-[639px] w-full">
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

                {/* Content Overlap Container */}
                <div className="relative container top-[-200px] md:top-[-100px] mx-auto px-4 lg:-mt-80 -mt-12 mb-12 z-10">
                    <JobForm />
                </div>
            </div>
            <GeneralEllipse />
        </>
    )
}
