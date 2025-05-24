import Image from "next/image";
import Link from "next/link";

export default function TourHeroSection() {
    return (
        <section className="relative w-full h-[400px] md:h-[500px] lg:h-[601.34px] overflow-hidden">
            {/* Background Images */}
            <Image
                src="/images/tour/coverimage.png"
                alt="IDCL Campus"
                fill
                className="object-cover"
                priority
                quality={100}
            />
            <Image
                src="/images/about/cover.png"
                alt="Overlay"
                fill
                className="object-cover"
                priority
                quality={100}
            />

            {/* Content Container */}
            <div className="absolute z-10 w-full px-4 lg:w-[896.51px] lg:left-[110px] 
                top-1/2 lg:top-[130px] transform lg:transform-none -translate-y-1/2 lg:translate-y-0
                flex flex-col items-start gap-4 lg:gap-[15px]">

                {/* Main Heading */}
                <h1 className="font-satoshi font-black text-4xl sm:text-5xl md:text-6xl lg:text-[80px] 
                    leading-tight lg:leading-[1.12] tracking-wide lg:tracking-[0.007em] text-white w-full">
                    See Innovation Live at IDCL
                </h1>

                {/* Border Left Text */}
                <div className="flex items-center mt-2 lg:mt-[15px] border-l-4 border-white pl-4 lg:pl-[25px] w-full">
                    <p className="font-satoshi w-full lg:w-[552px] font-medium text-base sm:text-lg md:text-xl lg:text-[24px] 
                        leading-relaxed lg:leading-[1.42] tracking-wide lg:tracking-[0.007em] text-white">
                        Take a guided tour of our campus and experience firsthand the future of digital transformation — from cutting-edge training labs and innovation hubs to our state-of-the-art call centre.
                    </p>
                </div>
            </div>
        </section>
    );
}