import Image from "next/image"
import Link from "next/link"
export default function TourHeroSection() {
    return (
        <section className="relative w-full h-[601.34px] overflow-hidden">
            <Image
                src="/images/tour/coverimage.png"
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

            <div className="absolute z-10 w-[896.51px] h-[297px] top-[130px] left-[110px] flex-inline flex-col items-start gap-[15px]">
                <h1 className="font-satoshi font-black text-[80px] leading-[1.12] tracking-[0.007em] text-[#ffffff] self-stretch">
                    See Innovation Live at IDCL
                </h1>
                <div className="flex items-center mt-[15px] border-l-4 border-[#ffffff] pl-[25px]">
                    <p className="font-satoshi w-[552px] font-medium text-[24px] leading-[1.42] tracking-[0.007em] text-[#ffffff]">
                        Take a guided tour of our campus and experience firsthand the future of digital transformation — from cutting-edge training labs and innovation hubs to our state-of-the-art call centre.
                    </p>
                </div>
            </div>
        </section>
    )
}