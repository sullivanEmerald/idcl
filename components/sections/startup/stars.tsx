import Image from "next/image"
import Link from "next/link"

export default function StartUpRisingStars() {
    return (
        <section className="bg-[#F5F9FF] w-full min-h-screen lg:h-[975px] flex flex-col items-center justify-center gap-6 sm:gap-8 lg:gap-[34px] py-12 sm:py-16 lg:py-0">
            <p className="w-full text-center text-[#3B3B3B] font-satoshi text-2xl sm:text-3xl lg:text-[32px] font-bold leading-normal lg:leading-[35px] px-4">
                Meet Our Rising Stars
            </p>

            <div className="w-full px-4 sm:px-6 lg:px-0">
                <div className="w-full max-w-[1198px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-[33px]">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="relative border rounded-lg lg:rounded-[12px] bg-white w-full lg:w-[376px] pt-8 sm:pt-10 lg:pt-[37px] px-4 sm:px-5 lg:px-[20px] pb-5 sm:pb-6 lg:pb-[24px] flex flex-col items-start gap-4 sm:gap-5 lg:gap-[18px]">
                            {/* Category Badge */}
                            <div className="flex w-[74px] py-1 lg:py-[4px] px-1.5 lg:px-[6px] items-center justify-center gap-2 lg:gap-[10px] bg-[#1E1E1E] rounded-md lg:rounded-[8px] absolute right-4 sm:right-5 lg:right-[20px] top-4 sm:top-5 lg:top-[20px]">
                                <p className="text-[#F5F9FF] font-satoshi font-bold text-xs lg:text-[12px] leading-tight lg:leading-[16px]">HealthTech</p>
                            </div>

                            {/* Company Info */}
                            <div className="flex items-center gap-3 lg:gap-[11px] w-full">
                                <Image
                                    src="/images/startup/startup.png"
                                    alt="Startup logo"
                                    width={64}
                                    height={64}
                                    className="object-cover"
                                    priority
                                />
                                <p className="font-satoshi font-bold text-sm sm:text-base lg:text-[16px] leading-tight lg:leading-[21px] text-[#475467]">MediBridge</p>
                            </div>

                            {/* Description */}
                            <p className="font-satoshi text-sm lg:text-[14px] font-medium leading-normal lg:leading-[18px] text-[#475467] w-full">
                                Bridging rural communities to healthcare via mobile clinics.
                            </p>

                            {/* Case Study */}
                            <div className="flex p-2 sm:p-3 lg:p-[10px] items-center justify-center gap-2 lg:gap-[10px] w-full bg-[#F9F9F9]">
                                <p className="text-[#475467] font-satoshi text-sm lg:text-[14px] font-medium leading-normal lg:leading-[18px]">
                                    Case study on how MediBridge has served 50,000+ patients across 12 underserved regions.
                                </p>
                            </div>

                            {/* View Profile Button */}
                            <Link
                                href={`/services/startup/rising/${index}`}
                                className="flex py-2 sm:py-3 lg:py-[12px] px-6 sm:px-8 lg:px-[33px] w-full lg:w-[159px] items-center justify-center gap-2 lg:gap-[10px] rounded-full lg:rounded-[56px] border border-[#005DFF] hover:bg-[#005DFF]/10 transition-colors duration-200"
                            >
                                <p className="text-[#005DFF] text-center font-roboto text-sm sm:text-base lg:text-[15px] font-medium leading-normal">View Profile</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Explore Button */}
            <Link
                href='/services/startup/rising'
                className="flex py-2 sm:py-3 lg:py-[12px] px-6 sm:px-8 lg:px-[33px] items-center justify-center gap-2 lg:gap-[10px] rounded-full lg:rounded-[56px] bg-[#005DFF] hover:bg-[#004ACC] transition-colors duration-200"
            >
                <p className="font-roboto font-medium text-sm sm:text-base lg:text-[15px] text-white leading-normal">Explore Our Start-ups</p>
            </Link>
        </section>
    )
}