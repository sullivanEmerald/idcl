import Image from "next/image";
import Link from "next/link";

export default function CommercializationHeroSection() {
    return (
        <section className="relative w-full min-h-[618px] mb-0">
            {/* Background Images */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/commercializaton/image.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/commercializaton/cover.png"
                    alt="Overlay"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Content */}
            <div className="relative z-10 top-[100px] lg:top-[180px] px-6 sm:px-10 md:px-16 lg:px-0 lg:left-[120px] w-full max-w-[896px] flex flex-col gap-[15px]">
                <h1 className="font-satoshi font-black text-[40px] sm:text-[56px] md:text-[64px] lg:text-[80px] leading-[48px] sm:leading-[60px] md:leading-[72px] lg:leading-[89px] tracking-[0.007em] text-[#ffffff]">
                    From Idea to Market.
                </h1>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-[16px] sm:gap-[24px] self-stretch border-l-4 border-[#ffffff] pl-4 sm:pl-[25px]">
                    <p className="font-satoshi font-medium text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] leading-[28px] sm:leading-[30px] md:leading-[32px] lg:leading-[34px] tracking-[0.007em] text-[#ffffff]">
                        We support inventors and startups in transforming their intellectual property into real-world products and profitable ventures through expert guidance, IP valuation, licensing, and go-to-market strategies.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-[24px] mt-4 w-full max-w-[313px]">
                    <Link
                        className="w-full sm:w-[127px] h-[50px] rounded-[50px] bg-[#FFFFFF] no-underline flex items-center justify-center gap-[10px]"
                        href="#"
                    >
                        <p className="font-roboto font-medium text-[15px] text-[#373737] leading-normal tracking-normal">
                            Get Support
                        </p>
                    </Link>
                    <Link
                        className="w-full sm:w-[162px] h-[50px] rounded-[50px] bg-transparent border border-[#FFFFFF] no-underline flex items-center justify-center"
                        href="/services/commercialization/idea"
                    >
                        <p className="font-roboto font-medium text-[15.36px] text-[#F5F9FF] leading-[100%] tracking-normal">
                            Submit Your Idea
                        </p>
                    </Link>
                </div>
            </div>
        </section>
    );
}
