"use client";
import Image from "next/image";

export default function NewsHeroSection() {
    return (
        <section className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[398px] overflow-hidden">
            {/* Background Image */}
            <Image
                src="/images/news/image.png"
                alt="Events Background"
                fill
                className="object-cover"
                priority
                quality={100}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
            />

            {/* Overlay Image */}
            <Image
                src="/images/news/cover.png"
                alt="Overlay"
                fill
                className="object-cover"
                priority
                quality={100}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
            />

            {/* Content Container */}
            <div className="absolute z-10 flex flex-col items-start gap-3 sm:gap-4 md:gap-[15px] left-4 sm:left-8 md:left-12 lg:left-[80px] top-16 sm:top-24 md:top-32 lg:top-[120px] w-[calc(100%-32px)] sm:w-auto">
                <h1 className="font-black text-4xl sm:text-5xl md:text-6xl lg:text-[80px] leading-[1.1] sm:leading-[1.1] md:leading-[1.1] lg:leading-[89px] text-white font-satoshi">
                    IDCL News
                </h1>

                <div className="w-full max-w-[600px] p-2 sm:p-3 md:p-4 border-l-4 border-white">
                    <p className="font-satoshi text-base sm:text-lg md:text-xl lg:text-[24px] font-medium leading-relaxed md:leading-[34px] text-white">
                        Where Local Innovation Meets Global Technology
                    </p>
                </div>
            </div>
        </section>
    );
}