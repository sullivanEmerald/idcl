import Image from "next/image"
import Link from "next/link"

export default function VendorHeroSection() {
    return (
        <section className="relative w-full min-h-[400px] sm:min-h-[500px] lg:min-h-[639px] mb-0">
            {/* Background Images */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/vendor/image.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/vendor/cover.png"
                    alt="Overlay"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Content */}
            <div className="relative z-10 px-4 sm:px-8 md:px-12 lg:w-[896px] lg:left-[80px] pt-16 sm:pt-24 md:pt-32 lg:top-[70px] flex flex-col gap-3 sm:gap-4 lg:gap-[15px]">
                <h1 className="font-satoshi font-black text-3xl sm:text-4xl md:text-5xl lg:text-[80px] leading-tight sm:leading-tight md:leading-tight lg:leading-[89px] max-w-full lg:w-[896px] tracking-[0.007em] text-white">
                    Become an IDCL Verified Vendor
                </h1>

                <div className="flex items-center gap-4 sm:gap-5 lg:gap-[24px] self-stretch border-l-2 sm:border-l-3 lg:border-l-4 border-white pl-4 sm:pl-5 lg:pl-[25px]">
                    <p className="font-satoshi font-medium text-base sm:text-lg md:text-xl lg:text-[24px] leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-[34px] tracking-[0.007em] text-white flex-[1_0_0]">
                        Register your business or professional service and tap into West Africa's fastest-growing digital ecosystem.
                    </p>
                </div>
            </div>
        </section>
    )
}