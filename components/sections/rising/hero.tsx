import Image from "next/image";
import StartUpProfileDetails from "../startup/profile";
export default function RisingStartUpHeroSection() {
    return (
        <section className="relative w-full h-[391px]">
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/startup/heroimage.png"
                    alt="Background"
                    width={1440}
                    height={391}
                    className="object-cover"
                    priority
                />
            </div>

            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/startup/risecover.png"
                    alt="Overlay"
                    width={1440}
                    height={391}
                    className="object-cover"
                    priority
                />
            </div>

            {/* Text Content (on top of both images) */}
            <h1 className=" relative z-10 w-[896px] top-[160px] left-[120px] self-stretch font-satoshi font-black text-[80px] leading-[89px] tracking-[0.56px] text-white">
                Meet Our Rising Stars
            </h1>
        </section>
    );
}