import Image from "next/image"

export default function AboutUSVision() {
    return (
        <>
            <section className="w-full h-[612.54px] py-[50px] px-[121px] flex items-center gap-[65px]">
                <img src='/images/vision/vision.png' alt="vision" width={535.32} height={512.54} />
                <div className="w-[599.18px] h-[309px] flex flex-col gap-[35px] ">
                    <div className="w-[599.18px] h-[137px] flex flex-col gap-[17px]">
                        <p className="font-satoshi font-bold text-[32px] leading-[1.1] tracking-normal text-[#3B3B3B] w-[599.18px]">Our Vision</p>
                        <p className="font-satoshi font-light text-[20px] leading-[1] tracking-normal text-[#000000]">To become the leading hub for digital innovation and entrepreneurship in West Africa.</p>
                    </div>
                    <div className="w-[599.18px] h-[137px] flex flex-col gap-[17px]">
                        <p className="font-satoshi font-bold text-[32px] leading-[1.1] tracking-normal text-[#3B3B3B] w-[599.18px]">Our Mission</p>
                        <p className="font-satoshi font-light text-[20px] leading-[1] tracking-normal text-[#000000]">To empower West Africa’s digital ecosystem through innovation, skill development, and entrepreneurship support that connects talent with opportunity.</p>
                    </div>
                </div>
            </section>
        </>
    )
}