"use client";
import Image from "next/image";

export default function NewsHeroSection() {
    return (
        <section className="relative w-full h-[398px] overflow-hidden"> {/* Fixed dimensions */}
            {/* Background Image */}
            <Image
                src="/images/news/image.png"
                alt="Events Background"
                fill
                className="object-cover"
                priority
                quality={100}
                sizes="100vw"
            />

            {/* Overlay Image */}
            <Image
                src="/images/news/cover.png"
                alt="Overlay"
                fill
                className="object-cover"
                priority
                quality={100}
                sizes="100vw"
            />


            <div className="absolute z-10 flex flex-col items-start gap-[15px] left-[80px] top-[120px]">
                <h1 className="font-black text-sm md:text-md lg:text-[80px] leading-[89px] tracking-normal text-white font-satoshi">IDCL News</h1>
                <div className="w-full p-4 border-l border-white border-l-4">
                    <p className="font-satoshi text-sm sm:text-md md:text-[24px] font-medium leading-[34px] tracking-normal text-white">Where Local Innovation Meets Global Technology</p>
                </div>
            </div>
        </section>
    );
}