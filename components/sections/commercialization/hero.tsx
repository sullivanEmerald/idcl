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
            <div className="relative z-10 w-[896px] top-[180px] left-[120px] flex flex-col gap-[15px]">
                <h1 className="font-satoshi font-black text-[80px] leading-[89px] w-[896px] tracking-[0.007em] text-[#ffffff]">
                    From Idea to Market.
                </h1>

                <div className="flex items-center gap-[24px] self-stretch border-l-4 border-[#ffffff] pl-[25px]">
                    <p className="font-satoshi font-medium text-[24px] leading-[34px] tracking-[0.007em] text-[#ffffff] flex-[1_0_0]">
                        We support inventors and startups in transforming their intellectual property into real-world products and profitable ventures through expert guidance, IP valuation, licensing, and go-to-market strategies.
                    </p>
                </div>

                <div className="w-[313px] flex items-center gap-[24px]">
                    <Link className="w-[127px] h-[50px] rounded-[50px] bg-[#FFFFFF] no-underline flex items-center justify-center gap-[10px]" href='#'>
                        <p className="font-roboto font-medium text-[15px] text-[#373737] leading-normal tracking-normal">Get Support</p>
                    </Link>
                    <Link className="w-[162px] h-[50px] rounded-[50px] bg-transparent border border-[#FFFFFF] no-underline flex items-center justify-center" href='/services/commercialization/idea'>
                        <p className="font-roboto font-medium text-[15.36px] text-[#F5F9FF] leading-[100%] tracking-normal">Submit Your Idea</p>
                    </Link>
                </div>
            </div>
        </section>
    );
}