import Image from "next/image"

export default function Partners() {
    return (
        <section className="w-full min-h-[436px] flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-[49px] bg-[#F5F9FF] py-16 lg:py-0 px-4 sm:px-6 mb-[40px]">
            {/* Partners Logo Grid - Maintains exact dimensions on large screens */}
            <div className="w-full lg:w-[599.06px] h-auto lg:h-[178.34px] flex flex-wrap items-center gap-4 lg:gap-[19px]">
                <div className="relative w-[134.7px] h-[58.08px]">
                    <Image
                        src='/images/partners/silicon.png'
                        style={{ objectFit: "cover" }}
                        fill
                        alt='Silicon Valley'
                    />
                </div>
                <div className="relative w-[183.18px] h-[58.08px]">
                    <Image
                        src='/images/partners/us.png'
                        fill
                        style={{ objectFit: "cover" }}
                        alt='US'
                    />
                </div>
                <div className="relative w-[183.18px] h-[58.08px]">
                    <Image
                        src='/images/partners/zinox.png'
                        fill
                        style={{ objectFit: "cover" }}
                        alt='Zinox'
                    />
                </div>
                <div className="relative w-[134.7px] h-[58.08px]">
                    <Image
                        src='/images/partners/berkeley.png'
                        fill
                        style={{ objectFit: "cover" }}
                        alt='Berkeley'
                    />
                </div>
                <div className="relative w-[102.18px] h-[101.26px]">
                    <Image
                        src='/images/partners/imo.png'
                        fill
                        style={{ objectFit: "cover" }}
                        alt='Imo'
                    />
                </div>
            </div>

            {/* Text Content - Pixel perfect on large screens */}
            <section className="w-full lg:w-[557.44px] h-auto lg:h-[271px] flex flex-col gap-4 lg:gap-[17px]">
                <div className="flex items-center w-[142px] h-[34px] gap-[10px] bg-[#D8F5FF] rounded-[20px] justify-center">
                    <span className="
                        font-satoshi 
                        font-normal 
                        text-[16px] 
                        leading-[1.5] 
                        tracking-[0.08em] 
                        uppercase
                        text-[#0000FF]
                    ">
                        Partners
                    </span>
                </div>
                <h2 className="font-satoshi font-bold text-2xl sm:text-[32px] leading-[1.1] tracking-normal capitalize">
                    Core Partners
                </h2>
                <p className="w-full lg:w-[557.44px] font-vietnam font-normal text-sm sm:text-[14px] leading-6 sm:leading-[24px] tracking-[-0.0025em] text-[#616771]">
                    Achieving Africa's digital future is not the work of one actor—it demands the collective strength of governments, the private sector, development organizations, academia, and civil society. These core partners play complementary roles in enabling inclusive growth, scalable innovation, and sustainable digital infrastructure across the continent.
                </p>
            </section>
        </section>
    )
}