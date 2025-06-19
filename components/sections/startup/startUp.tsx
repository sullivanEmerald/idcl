import Link from "next/link"
import Image from "next/image"

export interface StartUpInterface {
    id: string,
    track: string,
    reach: string,
    logo: string,
    date: string,
    name: string,
    story: string,
    type: string,
    isApproved: boolean,
    industry: string,
    region: string,
}

export default function ExploreStartup({ id, name, reach, logo, story, industry, region }: StartUpInterface) {
    return (
        <>
            <div className="relative border rounded-lg lg:rounded-[12px] bg-white w-full lg:w-[284px] pt-8 sm:pt-10 lg:pt-[37px] px-4 sm:px-5 lg:px-[20px] pb-5 sm:pb-6 lg:pb-[24px] flex flex-col items-start gap-4 sm:gap-5 lg:gap-[18px]">

                <div className="flex w-[74px] py-1 lg:py-[4px] px-1.5 lg:px-[6px] items-center justify-center gap-2 lg:gap-[10px] bg-[#1E1E1E] rounded-md lg:rounded-[8px] absolute right-4 sm:right-5 lg:right-[20px] top-4 sm:top-5 lg:top-[20px]">
                    <p className="text-[#F5F9FF] font-satoshi font-bold text-xs lg:text-[12px] leading-tight lg:leading-[16px] capitalize">{industry}</p>
                </div>


                <div className="flex items-center gap-3 lg:gap-[11px] w-full">
                    <div className="rounded-full border w-12 h-12 lg:w-[70px] lg:h-[70px] border-[#005DFF] p-2 lg:p-4">
                        <img
                            src={logo}
                            alt="Startup-logo"
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <p className="font-satoshi font-bold text-sm sm:text-base lg:text-[16px] leading-tight lg:leading-[21px] text-[#475467] capitalize">{name}</p>
                </div>


                <p className="font-satoshi text-sm lg:text-[14px] font-medium leading-normal lg:leading-[18px] text-[#475467] w-full truncate">
                    {story}
                </p>


                <div className="flex p-2 sm:p-3 lg:p-[10px] items-center justify-center gap-2 lg:gap-[10px] w-full bg-[#F9F9F9]">
                    <p className="text-[#475467] font-satoshi text-sm lg:text-[14px] font-medium leading-normal lg:leading-[18px] line-clamp-2">
                        {`Case study on how ${name} has served ${reach} patients across ${region}`}
                    </p>
                </div>


                <Link
                    href={`/services/startup/rising/${id}`}
                    className="flex py-2 sm:py-3 lg:py-[12px] px-6 sm:px-8 lg:px-[33px] w-full lg:w-[159px] items-center justify-center gap-2 lg:gap-[10px] rounded-full lg:rounded-[56px] border border-[#005DFF] hover:bg-[#005DFF]/10 transition-colors duration-200"
                >
                    <p className="text-[#005DFF] text-center font-roboto text-sm sm:text-base lg:text-[15px] font-medium leading-normal">View Profile</p>
                </Link>
            </div>
        </>
    )
}