import Image from "next/image";

export default function UpcomingHeroSection() {
    return (
        <div
            className="w-full h-[320px] sm:h-[380px] md:h-[420px] lg:h-[401px] relative flex-shrink-0 bg-[url('/images/upcoming/image.png')] bg-cover bg-no-repeat bg-center overflow-hidden"
        >
            <Image
                src="/images/upcoming/cover.png"
                alt="Background"
                fill
                className="object-cover"
                priority
            />

            <div
                className="
                    absolute z-10
                    top-1/2 left-1/2
                    transform -translate-x-1/2 -translate-y-1/2
                    w-full px-4
                    flex flex-col items-center gap-4
                    lg:top-[100px] lg:left-[120px] lg:transform-none lg:items-start lg:inline-flex lg:gap-[15px]
                "
            >
                <h1 className="font-satoshi font-black text-3xl sm:text-5xl md:text-6xl lg:text-[80px] leading-[1.12] tracking-[0.007em] text-white text-center lg:text-left">
                    Upcoming Events
                </h1>
                <div className="flex items-center border-l-4 border-white pl-4 w-full max-w-xl lg:pl-[25px] lg:w-auto">
                    <p className="font-satoshi font-medium text-base sm:text-lg md:text-xl lg:text-[24px] leading-[1.42] tracking-[0.007em] text-white text-center lg:text-left w-full lg:w-[552px]">
                        Where innovation meets experience—host your event in a space built for the future.
                    </p>
                </div>
            </div>
        </div>
    );
}