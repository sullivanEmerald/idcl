import Image from "next/image";
import Link from "next/link";

export default function JobsHeroSection() {
    return (
        <section className="relative w-full min-h-[639px] mb-0">
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/jobs/image.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/jobs/cover.png"
                    alt="Overlay"
                    fill
                    className="object-cover"
                    priority
                />
            </div>


            <div className="relative z-10 lg:w-[896px] w-full max-w-[90%] lg:top-[125px] top-[80px] lg:left-[120px] left-1/2 -translate-x-1/2 lg:translate-x-0 flex flex-col gap-[15px]">
                <h1 className="font-satoshi font-black text-[32px] sm:text-[48px] md:text-[64px] lg:text-[80px] leading-tight lg:leading-[89px] tracking-[0.007em] text-white">
                    Join Our Dynamic Team at Imo Digital City Ltd (IDCL)
                </h1>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-[16px] sm:gap-[24px] self-stretch border-l-4 border-white pl-[16px] sm:pl-[25px]">
                    <p className="font-satoshi font-medium text-[16px] sm:text-[20px] md:text-[22px] lg:text-[24px] leading-relaxed tracking-[0.007em] text-white flex-1">
                        Explore exciting career opportunities in the digital transformation ecosystem. Be part of a fast-growing hub shaping the future of technology in West Africa.
                    </p>
                </div>
            </div>
        </section>
    );
}
