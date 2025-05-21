import Image from "next/image";
import PartnershipForm from "./partnershipform";
export default function ApplyPartnershipHeroSection() {
    return (
        <section className="relative w-full h-auto">
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/partnership/image.png"
                    alt="Background"
                    width={1440}
                    height={618}
                    className="object-cover"
                    priority
                />
            </div>

            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/partnership/cover.png"
                    alt="Overlay"
                    width={1440}
                    height={618}
                    className="object-cover"
                    priority
                />
            </div>

            {/* Text Content (on top of both images) */}
            <div className="relative z-10 flex flex-col justify-center items-center gap-[50px] py-[80px]">
                <h1 className="font-satoshi text-[60px] font-black leading-[67px] text-[#fff]">Partnerships Application Form </h1>
                <PartnershipForm />
            </div>
        </section>
    );
}