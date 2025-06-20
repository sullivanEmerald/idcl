import Image from "next/image"
import Link from "next/link"

export default function CommercializationImpact() {
    return (
        <section className="w-full flex flex-col items-center justify-center py-[60px] sm:py-[80px] lg:py-[100px] gap-[24px] sm:gap-[29px] lg:gap-[34px] shrink-0 px-4 sm:px-6 lg:px-0">
            <p className="self-stretch text-center text-[#3B3B3B] font-satoshi text-[24px] sm:text-[28px] lg:text-[32px] font-bold leading-[26px] sm:leading-[31px] lg:leading-[35px]">
                Impact & Case Studies
            </p>
            <div className="w-full max-w-[1198px]">
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px] sm:gap-[26px] lg:gap-[33px]">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="w-full sm:w-[340px] lg:w-[290px] max-w-auto relative border rounded-[10px] bg-[#fff] pt-[30px] sm:pt-[33px] lg:pt-[37px] pr-[16px] sm:pr-[18px] lg:pr-[20px] pb-[20px] sm:pb-[22px] lg:pb-[24px] pl-[16px] sm:pl-[18px] lg:pl-[20px] flex flex-col items-start gap-[15px] sm:gap-[16px] lg:gap-[18px]">
                            <div className="flex w-[74px] py-[4px] px-[6px] items-center justify-center gap-[10px] bg-[#1E1E1E] rounded-[8px] absolute right-[16px] sm:right-[18px] lg:right-[20px] top-[16px] sm:top-[18px] lg:top-[20px]">
                                <p className="text-[#F5F9FF] font-satoshi font-bold text-[12px] leading-[16px]">HealthTech</p>
                            </div>
                            <div className="flex items-center gap-[9px] sm:gap-[10px] lg:gap-[11px] self-stretch w-full">
                                <Image
                                    src="/images/commercializaton/impact/image.png"
                                    alt="Background"
                                    width={64}
                                    height={64}
                                    className="w-[56px] h-[56px] sm:w-[60px] sm:h-[60px] lg:w-[64px] lg:h-[64px] object-cover"
                                    priority
                                />
                                <p className="font-satoshi font-bold text-[14px] sm:text-[15px] lg:text-[16px] leading-[18px] sm:leading-[19px] lg:leading-[21px] text-[#475467]">
                                    Afrifarm
                                </p>
                            </div>
                            <div className="flex flex-col py-[5px] sm:py-[5px] lg:py-[6px] px-[8px] sm:px-[9px] lg:px-[10px] justify-center items-start gap-[4px] sm:gap-[4px] lg:gap-[5px] self-stretch bg-[#F9F9F9] rounded-[5px]">
                                <h1 className="font-satoshi font-bold text-[13px] sm:text-[13px] lg:text-[14px] text-[#475467] leading-[17px] sm:leading-[17px] lg:leading-[18px]">
                                    Innovation:
                                </h1>
                                <p className="text-[#475467] self-stretch text-[13px] sm:text-[13px] lg:text-[14px] font-medium leading-[17px] sm:leading-[17px] lg:leading-[18px]">
                                    Bridging rural communities to healthcare via mobile clinics.
                                </p>
                            </div>
                            <div className="flex flex-col py-[5px] sm:py-[5px] lg:py-[6px] px-[8px] sm:px-[9px] lg:px-[10px] justify-center items-start gap-[4px] sm:gap-[4px] lg:gap-[5px] self-stretch bg-[#144DAF] rounded-[5px]">
                                <h1 className="font-satoshi font-bold text-[13px] sm:text-[13px] lg:text-[14px] text-[#fff] leading-[17px] sm:leading-[17px] lg:leading-[18px]">
                                    Innovation:
                                </h1>
                                <p className="text-[#fff] self-stretch text-[13px] sm:text-[13px] lg:text-[14px] font-medium leading-[17px] sm:leading-[17px] lg:leading-[18px]">
                                    Bridging rural communities to healthcare via mobile clinics.
                                </p>
                            </div>
                            <div className="flex flex-col py-[5px] sm:py-[5px] lg:py-[6px] px-[8px] sm:px-[9px] lg:px-[10px] justify-center items-start gap-[4px] sm:gap-[4px] lg:gap-[5px] self-stretch bg-[#F9F9F9] rounded-[5px]">
                                <h1 className="font-satoshi font-bold text-[13px] sm:text-[13px] lg:text-[14px] text-[#475467] leading-[17px] sm:leading-[17px] lg:leading-[18px]">
                                    Outcome:
                                </h1>
                                <p className="text-[#475467] self-stretch text-[13px] sm:text-[13px] lg:text-[14px] font-medium leading-[17px] sm:leading-[17px] lg:leading-[18px]">
                                    3x revenue in 6 months, licensing deal closed
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}