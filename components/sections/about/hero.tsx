import Image from "next/image";

export default function AboutUsHeroSection() {
    return (
        <section className="relative w-full h-screen min-h-[500px] max-h-[800px] overflow-visible z-10">
            {/* Background Image */}
            <Image
                src='/images/about/image.png'
                alt="background"
                className="object-cover"
                fill
                quality={100}
                priority
            />

            {/* Overlay Image */}
            <Image
                src='/images/about/cover.png'
                alt="cover"
                className="object-cover"
                fill
                quality={100}
                priority
            />

            {/* Content Container */}
            <div className="absolute w-full md:max-w-[896px] h-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 sm:px-6 lg:left-[80px] lg:translate-x-0 lg:top-[170px]  lg:transform-none flex flex-col gap-3 md:gap-[15px]">
                <h1 className="w-[896px] font-satoshi font-black leading-[1.12] tracking-[0.007em] text-white text-4xl sm:text-5xl md:text-6xl lg:text-[80px] self-stretch">
                    About Us – Imo Digital City Ltd (IDCL)
                </h1>
                <p className="font-satoshi font-medium text-lg sm:text-xl md:text-2xl leading-[1.42] tracking-[0.007em] text-white border-l-4 border-l-white pl-4 md:pl-[25px] md:text-[24px]">
                    Driving Africa's Digital Transformation
                </p>
            </div>
        </section>
    )
}