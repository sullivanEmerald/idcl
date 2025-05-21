import Image from "next/image";

export default function AboutUsHeroSection() {
    return (
        <section className="relative w-full h-[601.34px] overflow-visible z-10  ">
            <Image
                src='/images/about/image.png'
                alt="background"
                className="object-cover"
                fill
                quality={100}
            />

            <Image
                src='/images/about/cover.png'
                alt="cover"
                className="object-cover"
                fill
                quality={100}
            />


            <div className="absolute w-[896.51px] h-[297px] top-[160px] left-[120px] flex flex-col gap-[15px]">
                <p
                    className="w-[896px] h-[180px] font-satoshi font-black leading-[1.12] tracking-[0.007em] text-[#ffffff] text-[80px]">About Us – Imo Digital City Ltd (IDCL)
                </p>
                <p className=" font-satoshi font-medium text-[24px] leading-[1.42] tracking-[0.007em] text-[#FFFFFF] border-l border-l-4 border-l-white px-[25px]">
                    Driving Africa’s Digital Transformation
                </p>
            </div>
        </section>
    )
}