import Image from "next/image";

export default function AboutUSVision() {
    return (
        <section className="w-full min-h-[500px] lg:h-[612.54px] py-8 px-4 sm:py-12 sm:px-8 lg:py-[50px] lg:px-[121px] flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-[65px]">
            {/* Image - responsive sizing with exact dimensions on lg+ */}
            <div className="w-full max-w-[535px] lg:w-[535.32px] lg:h-[512.54px] relative aspect-[535/512]">
                <Image
                    src='/images/vision/vision.png'
                    alt="vision"
                    fill
                    className="object-contain"
                    quality={100}
                />
            </div>

            {/* Content - responsive with exact styling on lg+ */}
            <div className="w-full max-w-[599px] lg:w-[599.18px] lg:h-[309px] flex flex-col gap-6 sm:gap-8 lg:gap-[35px]">
                <div className="w-full lg:w-[599.18px] lg:h-[137px] flex flex-col gap-4 sm:gap-6 lg:gap-[17px]">
                    <h2 className="font-satoshi font-bold text-2xl sm:text-3xl lg:text-[32px] leading-[1.1] tracking-normal text-[#3B3B3B]">
                        Our Vision
                    </h2>
                    <p className="font-satoshi font-light text-base sm:text-lg lg:text-[20px] leading-[1.3] sm:leading-[1.2] lg:leading-[1] tracking-normal text-[#000000]">
                        To become the leading hub for digital innovation and entrepreneurship in West Africa.
                    </p>
                </div>

                <div className="w-full lg:w-[599.18px] lg:h-[137px] flex flex-col gap-4 sm:gap-6 lg:gap-[17px]">
                    <h2 className="font-satoshi font-bold text-2xl sm:text-3xl lg:text-[32px] leading-[1.1] tracking-normal text-[#3B3B3B]">
                        Our Mission
                    </h2>
                    <p className="font-satoshi font-light text-base sm:text-lg lg:text-[20px] leading-[1.3] sm:leading-[1.2] lg:leading-[1] tracking-normal text-[#000000]">
                        To empower West Africa's digital ecosystem through innovation, skill development, and entrepreneurship support that connects talent with opportunity.
                    </p>
                </div>
            </div>
        </section>
    )
}