import Image from "next/image"
import { EllipseData } from "@/data/elllipse"
import Link from "next/link"
import Footer from "../sections/footer"

export default function GeneralEllipse({ name }: { name: string }) {
    const object = EllipseData.find(item => item.name.toLowerCase() === name)
    return (
        <footer className="w-full flex flex-col items-center">
            <div className="relative w-[1228px] h-[401px] rounded-tl-[40px] rounded-tr-[40px] p-[80px] bg-[#144DAF] overflow-hidden flex items-center gap-[72px] ">
                <div className="w-[714px] flex flex-col items-start gap-[22px] shrink-0">
                    <p className="self-stretch font-satoshi font-bold text-[43px] leading-[1.3] tracking-normal text-[#FFFFFF]">
                        {object?.header}
                    </p>
                    <p className="self-stretch font-vietnam font-normal text-[20px] leading-[37px] tracking-[-0.05px] text-[#FFFFFF]">{object?.body}</p>
                    <div className="flex items-start gap-[22px]">
                        <Link href={object?.buttons.first.href!} className="rounded-[56px] py-[12px] px-[33px] bg-[#FFFFFF] border-none flex gap-[10px] no-underline">
                            <span className="font-roboto font-medium text-[15.36px] leading-[1] tracking-normal text-[#000000] self-stretch">
                                {object?.buttons.first.name}
                            </span>
                        </Link>
                        {object?.buttons.second && <Link href={object?.buttons.second.href!} className="rounded-[56px] py-[12px] px-[33px] flex items-center justify-center gap-[10px] border border-[#FFF] no-underline">
                            <span className="font-roboto font-medium text-[15.36px] leading-[1] tracking-normal text-[#FFFFFF] self-stretch">
                                {object?.buttons.second.name}
                            </span>
                        </Link>}
                    </div>
                </div>
                {/* IMAGES */}
                <div className="absolute w-[397px] h-[412px] aspect-[397.07/412.96] right-[-6.136px] bottom-[-36.043px]" style={{ opacity: '0.9' }}>
                    <Image
                        fill
                        priority
                        alt="imo digital city"
                        src='/images/home/digital.png'
                        className="block object-contain"
                    />

                </div>
            </div>
            <Footer />
            <p className="w-full py-4 font-lexend font-normal leading-[20px] tracking-normal text-[14px] text-[#3B3B3B] text-center">
                Copyright ©2025, Imo Digital City Limited
            </p>
        </footer>
    )
}