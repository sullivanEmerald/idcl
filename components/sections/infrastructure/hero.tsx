import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="relative w-full h-screen min-h-[500px] max-h-[800px] overflow-hidden">
            {/* Background Images */}
            <Image
                src="/images/innovation/image.png"
                alt="Background"
                fill
                className="object-cover"
                priority
            />
            <Image
                src="/images/about/cover.png"
                alt="Overlay"
                fill
                className="object-cover"
                priority
            />

            {/* Content Container */}
            <div className="absolute z-10 w-full px-4 lg:w-[1164px] lg:left-[110px] 
                top-1/2 lg:top-[140px] transform lg:transform-none -translate-y-1/2 lg:translate-y-0
                flex flex-col gap-4 lg:gap-[15px]">

                {/* Main Heading */}
                <h1 className="font-satoshi font-black text-4xl sm:text-5xl md:text-6xl lg:text-[80px] 
                    leading-tight lg:leading-[1.12] tracking-wide lg:tracking-[0.007em] text-white">
                    Powering Progress Through Smart Infrastructure
                </h1>

                {/* Border Left Text */}
                <div className="flex items-center mt-2 lg:mt-[15px] border-l-4 border-white pl-4 lg:pl-[25px]">
                    <p className="font-satoshi w-full lg:w-[552px] font-medium text-base sm:text-lg md:text-xl lg:text-[24px] 
                        leading-relaxed lg:leading-[1.42] tracking-wide lg:tracking-[0.007em] text-white">
                        Modern facilities driving jobs, innovation, and digital service delivery across West Africa.
                    </p>
                </div>

                {/* Buttons */}
                <div className="w-full flex flex-col sm:flex-row gap-4 lg:gap-[24px] mt-4 lg:mt-0">
                    <Link
                        className="w-full sm:w-[130px] h-[50px] rounded-[50px] py-4 lg:py-[16px] px-6 lg:px-[22px] 
                        bg-white hover:bg-opacity-90 transition-opacity no-underline flex items-center justify-center"
                        href='/contact'
                    >
                        <p className="font-roboto font-medium text-sm lg:text-[15.36px] text-[#373737] leading-[100%]">
                            Contact Us
                        </p>
                    </Link>
                    <Link
                        className="w-full sm:w-[155px] h-[50px] rounded-[50px] py-4 lg:py-[16px] px-6 lg:px-[22px] 
                        bg-transparent border border-white hover:bg-white hover:bg-opacity-10 transition-colors no-underline flex items-center justify-center"
                        href='/infrastructure/tour'
                    >
                        <p className="font-roboto font-medium text-sm lg:text-[15.36px] text-white leading-[100%]">
                            Book A Tour
                        </p>
                    </Link>
                </div>
            </div>
        </section>
    );
}