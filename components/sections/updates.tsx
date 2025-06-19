import Image from "next/image";
import { Button } from "../ui/button";

const UpdateData = [
    {
        image: '/images/home/update.png',
        name: 'Unlocking Africa\'s Potential Through Digital Transformation',
        text: 'Africa is at a tipping point. With a population set to double by 2050 and the fastest-growing youth demographic globally, the continent is uniquely positioned to leapfrog traditional development models through technology.',
        date: 'Published 24 April, 2025'
    },
    {
        image: '/images/home/update.png',
        name: 'Unlocking Africa\'s Potential Through Digital Transformation',
        text: 'Africa is at a tipping point. With a population set to double by 2050 and the fastest-growing youth demographic globally, the continent is uniquely positioned to leapfrog traditional development models through technology.',
        date: 'Published 24 April, 2025'
    },
    {
        image: '/images/home/update.png',
        name: 'Unlocking Africa\'s Potential Through Digital Transformation',
        text: 'Africa is at a tipping point. With a population set to double by 2050 and the fastest-growing youth demographic globally, the continent is uniquely positioned to leapfrog traditional development models through technology.',
        date: 'Published 24 April, 2025'
    }
]

export default function Updates() {
    return (
        <section className="w-full min-h-screen lg:h-[724px] bg-[#F5F9FF] py-8 sm:py-12 lg:py-[68px] flex flex-col items-center gap-6 sm:gap-8 lg:gap-[26px] px-4 sm:px-6">

            <div className="w-full sm:w-[238px] h-auto lg:h-[90px] flex flex-col items-center gap-4 sm:gap-5 lg:gap-[21px]">
                <div className="w-[104px] h-[34px] rounded-[20px] px-[14px] py-[5px] bg-[#D8F5FF] flex items-center justify-center">
                    <span className="font-satoshi font-normal text-sm sm:text-[16px] leading-[1.5] tracking-[0.08em] uppercase text-[#0000FF]">
                        Updates
                    </span>
                </div>
                <p className="w-full sm:w-[238px] h-auto font-satoshi font-bold text-2xl sm:text-3xl lg:text-[32px] leading-[1.1] tracking-normal text-[#3B3B3B] text-center">
                    Stay Up To Date
                </p>
            </div>
            <div className="relative">
                {/* <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" /> */}
                <div className="overflow-hidden relative">
                    <div className="w-full max-w-[1198px] h-auto lg:h-[407px] flex flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-[33.48px] animate-scroll animate-scroll ">
                        {UpdateData.map((item, index) => (
                            <div key={index} className='relative w-full sm:w-[calc(50%-16px)] lg:w-[381.77px] h-auto lg:h-[407.77px] flex flex-col gap-4 sm:gap-6 lg:gap-[15.76px]'>
                                <div className="relative w-full aspect-[381.77/246.2]">
                                    <Image
                                        src={item.image}
                                        alt='updates'
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="w-full lg:w-[381.77px] flex flex-col gap-1 sm:gap-2 lg:gap-[3.94px]">
                                    <p className="w-full font-satoshi font-bold text-lg sm:text-xl lg:text-[19.7px] leading-snug lg:leading-[1.31] tracking-tight lg:tracking-[0.17px] text-[#282A2D]">
                                        {item.name}
                                    </p>
                                    <p className="w-full font-satoshi font-normal text-base sm:text-lg lg:text-[17.73px] leading-normal lg:leading-[1.42] tracking-[0.007em] text-[#616771] line-clamp-2 overflow-hidden text-ellipsis">
                                        {item.text}
                                    </p>
                                </div>
                                <p className="w-full lg:w-[162px] font-lexend font-bold text-xs sm:text-sm lg:text-[13.79px] leading-tight lg:leading-[1.45] tracking-tight lg:tracking-[-0.02em] text-[#827F7F]">
                                    {item.date}
                                </p>
                            </div>
                        ))}
                        {UpdateData.map((item, index) => (
                            <div key={index} className='relative w-full sm:w-[calc(50%-16px)] lg:w-[381.77px] h-auto lg:h-[407.77px] flex flex-col gap-4 sm:gap-6 lg:gap-[15.76px]'>
                                <div className="relative w-full aspect-[381.77/246.2]">
                                    <Image
                                        src={item.image}
                                        alt='updates'
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="w-full lg:w-[381.77px] flex flex-col gap-1 sm:gap-2 lg:gap-[3.94px]">
                                    <p className="w-full font-satoshi font-bold text-lg sm:text-xl lg:text-[19.7px] leading-snug lg:leading-[1.31] tracking-tight lg:tracking-[0.17px] text-[#282A2D]">
                                        {item.name}
                                    </p>
                                    <p className="w-full font-satoshi font-normal text-base sm:text-lg lg:text-[17.73px] leading-normal lg:leading-[1.42] tracking-[0.007em] text-[#616771] line-clamp-2 overflow-hidden text-ellipsis">
                                        {item.text}
                                    </p>
                                </div>
                                <p className="w-full lg:w-[162px] font-lexend font-bold text-xs sm:text-sm lg:text-[13.79px] leading-tight lg:leading-[1.45] tracking-tight lg:tracking-[-0.02em] text-[#827F7F]">
                                    {item.date}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Button>View More News</Button>
        </section>
    )
}