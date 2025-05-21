import Image from "next/image"
import Link from "next/link"

export default function CommercializationImpact() {
    return (
        <section className="w-full flex flex-col items-center justify-center py-[100px] gap-[34px] shrink-0">
            <p className="self-stretch text-center text-[#3B3B3B] font-satoshi text-[32px] font-bold leading-[35px] ">Impact & Case Studies</p>
            <div className="">
                <div className="w-[1198px] flex items-start gap-[33px] self-stretch flex-wrap">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className=" w-[376px] relative border rounded-[12px] bg-[#fff] w-[376px] pt-[37px] pr-[20px] pb-[24px] pl-[20px] flex flex-col items-start gap-[18px]">
                            <div className="flex w-[74px] py-[4px] px-[6px] items-center justify-center gap-[10px] bg-[#1E1E1E] rounded-[8px] absolute right-[20px] top-[20px]">
                                <p className="text-[#F5F9FF] font-satoshi font-bold text-[12px] leading-[16px]">HealthTech</p>
                            </div>
                            <div className="flex items-center gap-[11px] self-stretch w-full">
                                <Image
                                    src="/images/commercializaton/impact/image.png"
                                    alt="Background"
                                    width={64}
                                    height={64}
                                    className="object-cover"
                                    priority
                                />
                                <p className="font-satoshi font-bold text-[16px] leading-[21px] text-[#475467]">Afrifarm</p>
                            </div>
                            <div className="flex flex-col py-[6px] px-[10px] justify-center items-start gap-[5px] self-stretch bg-[#F9F9F9] rounded-[5px]">
                                <h1 className="font-satoshi font-bold text-[14px] text-[#475467] leading-[18px]">Innovation:</h1>
                                <p className="text-[#475467] self-stretch text-[14px] font-medium text-[14px] leading-[18px]">Bridging rural communities to healthcare via mobile clinics.</p>
                            </div>
                            <div className="flex flex-col py-[6px] px-[10px] justify-center items-start gap-[5px] self-stretch bg-[#144DAF] rounded-[5px]">
                                <h1 className="font-satoshi font-bold text-[14px] text-[#fff] leading-[18px]">Innovation:</h1>
                                <p className="text-[#fff] self-stretch text-[14px] font-medium text-[14px] leading-[18px]">Bridging rural communities to healthcare via mobile clinics.</p>
                            </div>
                            <div className="flex flex-col py-[6px] px-[10px] justify-center items-start gap-[5px] self-stretch bg-[#F9F9F9] rounded-[5px]">
                                <h1 className="font-satoshi font-bold text-[14px] text-[#475467] leading-[18px]">Outcome:</h1>
                                <p className="text-[#475467] self-stretch text-[14px] font-medium text-[14px] leading-[18px]"> 3x revenue in 6 months, licensing deal closed</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}