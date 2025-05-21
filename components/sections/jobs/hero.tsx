import Image from "next/image"
import Link from "next/link"
export default function JobsHeroSection() {
    return (
        <section className="relative w-full min-h-[639px] mb-0">
            {/* Background Images */}
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

            {/* Content */}
            <div className="relative z-10 w-[896px] top-[125px] left-[120px] flex flex-col gap-[15px]">
                <h1 className="font-satoshi font-black text-[80px] leading-[89px] w-[896px] tracking-[0.007em] text-[#ffffff]">
                    Join Our Dynamic Team at Imo Digital City Ltd (IDCL)
                </h1>

                <div className="flex items-center gap-[24px] self-stretch border-l-4 border-[#ffffff] pl-[25px]">
                    <p className="font-satoshi font-medium text-[24px] leading-[34px] tracking-[0.007em] text-[#ffffff] flex-[1_0_0]">
                        Explore exciting career opportunities in the digital transformation ecosystem. Be part of a fast-growing hub shaping the future of technology in West Africa.
                    </p>
                </div>
            </div>
        </section>
    )
}