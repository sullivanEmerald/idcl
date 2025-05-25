import Image from "next/image";
import StartUpProfileDetails from "../startup/profile";

export default function StartUpProfileHero() {
    return (
        <section className="relative w-full h-auto sm:h-[391px] lg:h-[500px]">
            {/* Background Image - Hidden on mobile, shown on sm+ */}
            <div className="absolute inset-0 -z-10 hidden sm:block">
                <Image
                    src="/images/startup/heroimage.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Overlay Image - Hidden on mobile, shown on sm+ */}
            <div className="absolute inset-0 -z-10 hidden sm:block">
                <Image
                    src="/images/startup/risecover.png"
                    alt="Overlay"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Mobile Background - Only shown on mobile */}
            <div className="absolute inset-0 -z-10 sm:hidden bg-gray-100">
                {/* You might want to add a mobile-specific background here */}
            </div>

            {/* Content Container */}
            <div className="relative px-4 sm:px-8 md:px-12 lg:px-[200px] py-8 sm:py-12 md:py-16 lg:py-[139px]">
                <StartUpProfileDetails />
            </div>

            {/* Optional: If you want to show the "Meet Our Rising Stars" text responsively */}
            {/* <h1 className="relative z-10 w-full px-4 sm:px-8 md:px-12 lg:w-[896px] lg:top-[160px] lg:left-[120px] self-stretch font-satoshi font-black text-3xl sm:text-4xl md:text-5xl lg:text-[80px] leading-tight sm:leading-snug md:leading-normal lg:leading-[89px] tracking-wide lg:tracking-[0.56px] text-white">
                Meet Our Rising Stars
            </h1> */}
        </section>
    );
}