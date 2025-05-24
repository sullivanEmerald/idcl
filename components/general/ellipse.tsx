import Image from "next/image"
import { EllipseData } from "@/data/elllipse"
import Link from "next/link"
import Footer from "../sections/footer"

export default function GeneralEllipse({ name, isComplete = true }: { name?: string | null, isComplete?: boolean }) {

    const object = EllipseData.find(item => item.name.toLowerCase() === name)

    return (
        <footer className="w-full flex flex-col items-center">
            {object ? (
                <div className="relative w-full lg:w-[1228px] h-auto min-h-[300px] sm:min-h-[350px] lg:h-[401px] rounded-tl-[20px] rounded-tr-[20px] sm:rounded-tl-[30px] sm:rounded-tr-[30px] lg:rounded-tl-[40px] lg:rounded-tr-[40px] p-4 sm:p-8 md:p-12 lg:p-[80px] bg-[#144DAF] overflow-hidden flex items-center">
                    <div className="w-full lg:w-[714px] flex flex-col items-start gap-4 sm:gap-5 lg:gap-[22px] shrink-0 z-10 relative">
                        <p className="self-stretch font-satoshi font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[43px] leading-[1.2] sm:leading-[1.25] lg:leading-[1.3] tracking-normal text-[#FFFFFF]">
                            {object?.header}
                        </p>
                        <p className="self-stretch font-vietnam font-normal text-sm sm:text-base md:text-lg lg:text-[20px] leading-relaxed sm:leading-[1.6] md:leading-[1.7] lg:leading-[37px] tracking-[-0.02px] sm:tracking-[-0.03px] lg:tracking-[-0.05px] text-[#FFFFFF]">
                            {object?.body}
                        </p>
                        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 lg:gap-[22px] w-full sm:w-auto">
                            <Link
                                href={object?.buttons.first.href!}
                                className="w-full sm:w-auto rounded-[28px] sm:rounded-[42px] lg:rounded-[56px] py-2.5 sm:py-3 lg:py-[12px] px-6 sm:px-7 lg:px-[33px] bg-[#FFFFFF] border-none flex gap-[10px] no-underline justify-center sm:justify-start"
                            >
                                <span className="font-roboto font-medium text-sm sm:text-[14px] lg:text-[15.36px] leading-[1] tracking-normal text-[#000000] self-stretch">
                                    {object?.buttons.first.name}
                                </span>
                            </Link>
                            {object?.buttons.second && (
                                <Link
                                    href={object?.buttons.second.href!}
                                    className="w-full sm:w-auto rounded-[28px] sm:rounded-[42px] lg:rounded-[56px] py-2.5 sm:py-3 lg:py-[12px] px-6 sm:px-7 lg:px-[33px] flex items-center justify-center gap-[10px] border border-[#FFF] no-underline"
                                >
                                    <span className="font-roboto font-medium text-sm sm:text-[14px] lg:text-[15.36px] leading-[1] tracking-normal text-[#FFFFFF] self-stretch">
                                        {object?.buttons.second.name}
                                    </span>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* IMAGES */}
                    <div className="hidden lg:block absolute w-[200px] h-[207px] sm:w-[280px] sm:h-[290px] md:w-[320px] md:h-[332px] lg:w-[397px] lg:h-[412px] aspect-[397.07/412.96] right-[-3px] sm:right-[-4px] md:right-[-5px] lg:right-[-6.136px] bottom-[-18px] sm:bottom-[-24px] md:bottom-[-30px] lg:bottom-[-36.043px] opacity-70 sm:opacity-80 lg:opacity-90">
                        <Image
                            fill
                            priority
                            alt="imo digital city"
                            src='/images/home/digital.png'
                            className="block object-contain"
                        />
                    </div>
                </div>
            ) : ""}
            <Footer />
            <p className="w-full py-4 font-lexend font-normal leading-[20px] tracking-normal text-[14px] text-[#3B3B3B] text-center">
                Copyright ©2025, Imo Digital City Limited
            </p>
        </footer>
    )
}