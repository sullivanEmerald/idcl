import Image from "next/image"

export default function StartUpPartners() {
    return (
        <section className="px-4 sm:px-8 lg:px-[118px] py-8 sm:py-12 lg:py-[70px] flex flex-col gap-4 sm:gap-6 lg:gap-[27px] items-center w-full">
            <h1 className="text-[#3B3B3B] text-center font-satoshi text-xl sm:text-2xl lg:text-[32px] font-bold leading-tight lg:leading-[35px]">
                Our Partners & Backers
            </h1>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-0 lg:justify-between items-center w-full">
                {/* Partner logos with responsive sizing */}
                <div className="w-[120px] sm:w-[134.7px] h-[52px] sm:h-[58.08px] relative">
                    <Image
                        src='/images/partners/silicon.png'
                        alt='Silicon Valley'
                        fill
                        className="object-contain"
                    />
                </div>

                <div className="w-[160px] sm:w-[183.18px] h-[52px] sm:h-[58.08px] relative">
                    <Image
                        src='/images/partners/us.png'
                        alt='US'
                        fill
                        className="object-contain"
                    />
                </div>

                <div className="w-[160px] sm:w-[183.18px] h-[52px] sm:h-[58.08px] relative">
                    <Image
                        src='/images/partners/zinox.png'
                        alt='Zinox'
                        fill
                        className="object-contain"
                    />
                </div>

                <div className="w-[120px] sm:w-[134.7px] h-[52px] sm:h-[58.08px] relative">
                    <Image
                        src='/images/partners/berkeley.png'
                        alt='Berkeley'
                        fill
                        className="object-contain"
                    />
                </div>

                <div className="w-[90px] sm:w-[102.18px] h-[90px] sm:h-[101.26px] relative">
                    <Image
                        src='/images/partners/imo.png'
                        alt='Imo'
                        fill
                        className="object-contain"
                    />
                </div>
            </div>
        </section>
    )
}