import Image from "next/image"
import Link from "next/link"

export default function StartUpRisingStars() {
    return (
        <section className="bg-[#F5F9FF] w-full h-[975px] flex flex-col items-center justify-center gap-[34px] shrink-0">
            <p className="self-stretch text-center text-[#3B3B3B] font-satoshi text-[32px] font-bold leading-[35px] ">Meet Our Rising Stars</p>
            <div className="">
                <div className="w-[1198px] flex items-start gap-[33px] self-stretch flex-wrap">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="relative border rounded-[12px] bg-[#fff] w-[376px] pt-[37px] pr-[20px] pb-[24px] pl-[20px] flex flex-col items-start gap-[18px]">
                            <div className="flex w-[74px] py-[4px] px-[6px] items-center justify-center gap-[10px] bg-[#1E1E1E] rounded-[8px] absolute right-[20px] top-[20px]">
                                <p className="text-[#F5F9FF] font-satoshi font-bold text-[12px] leading-[16px]">HealthTech</p>
                            </div>
                            <div className="flex items-center gap-[11px] self-stretch w-full">
                                <Image
                                    src="/images/startup/startup.png"
                                    alt="Background"
                                    width={64}
                                    height={64}
                                    className="object-cover"
                                    priority
                                />
                                <p className="font-satoshi font-bold text-[16px] leading-[21px] text-[#475467]">MediBridge</p>
                            </div>
                            <p className="font-satoshi text-[14px] font-medium leading-[18px] font-[#475467] self-stretch">Bridging rural communities to healthcare via mobile clinics.</p>
                            <div className="flex p-[10px] items-center justify-center gap-[10px] self-stretch bg-[#F9F9F9]">
                                <p className="text-[#475467] font-satoshi text-[14px] font-medium leading-[18px] flex-[1_0_0]">
                                    Case study on how MediBridge has served 50,000+ patients across 12 underserved regions.
                                </p>
                            </div>
                            <Link href='/' className="flex py-[12px] px-[33px] item-center justify-center gap-[10px] flex-[1_0_0] rounded-[56px] border border-[#005DFF]">
                                <p className="text-[#005DFF] text-center font-roboto text-[15px] font-medium leading-normal">View Profile</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <Link href='/startup/rising' className="flex py-[12px] px-[33px] items-center justify-center gap-[10px] rounded-[56px] bg-[#005DFF]">
                <p className="font-roboto font-medium text-[15px] text-[#fff] leading-normal">Explore Our Start-ups</p>
            </Link>
        </section>
    )
}