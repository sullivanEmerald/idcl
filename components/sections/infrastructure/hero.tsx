import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="relative w-full h-[601.34px] overflow-hidden">
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

            <div className="absolute z-10 w-[896.51px] h-[297px] top-[90px] left-[110px] flex flex-col gap-[15px]">
                <h1 className="font-satoshi font-black text-[80px] leading-[1.12] tracking-[0.007em] text-[#ffffff]">
                    Powering Progress Through Smart Infrastructure
                </h1>
                <div className="flex items-center mt-[15px] border-l-4 border-[#ffffff] pl-[25px]">
                    <p className="font-satoshi w-[552px] font-medium text-[24px] leading-[1.42] tracking-[0.007em] text-[#ffffff]">
                        Modern facilities driving jobs, innovation, and digital service delivery across West Africa.
                    </p>
                </div>
                <div className="w-[299px] h-[50px] flex items-center gap-[24px]">
                    <Link className="w-[120px] h-[50px] rounded-[50px] py-[16px] px-[22px] bg-[#FFFFFF] no-underline" href='#'>
                        <p className="w-[76px] font-roboto font-medium text-[15.36px] text-[#373737] leading-[100%] tracking-normal">Contact Us</p>
                    </Link>
                    <Link className="w-[155px] h-[50px] rounded-[50px] py-[16px] px-[22px] bg-transparent border border-[#FFFFFF] no-underline" href='#'>
                        <p className="w-[111px] font-roboto font-medium text-[15.36px] text-[#F5F9FF] leading-[100%] tracking-normal">Schedule a Visit</p>
                    </Link>
                </div>
            </div>
        </section>
    );
}