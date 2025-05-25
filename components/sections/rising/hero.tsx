import Image from "next/image";

export default function RisingStartUpHeroSection() {
    return (
        <section className="relative w-full h-[200px] sm:h-[300px] lg:h-[391px]">
            {/* Background Images - unchanged at lg */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/startup/heroimage.png"
                    alt="Background"
                    width={1440}
                    height={391}
                    className="w-full h-full object-cover"
                    priority
                />
            </div>

            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/startup/risecover.png"
                    alt="Overlay"
                    width={1440}
                    height={391}
                    className="w-full h-full object-cover"
                    priority
                />
            </div>

            {/* Text Content - identical at lg */}
            <h1 className="relative z-10 w-full max-w-[896px] mx-auto lg:mx-0 lg:left-[120px] top-1/2 lg:top-[160px] transform -translate-y-1/2 lg:transform-none px-4 sm:px-6 lg:px-0 font-satoshi font-black text-4xl sm:text-5xl md:text-6xl lg:text-[80px] leading-[1.2] sm:leading-[1.1] lg:leading-[89px] tracking-wide lg:tracking-[0.56px] text-white">
                Meet Our Rising Stars
            </h1>
        </section>
    );
}