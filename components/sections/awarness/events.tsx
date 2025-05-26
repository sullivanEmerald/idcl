const EventsData = [
    {
        image: '/images/events/background.png',
        alt: 'Events',
        header: 'Imo State Innovation & Investment Forum 2025',
        text: 'Start-up Showcase',
        body: 'Start-up Showcase',
        day: 14,
        month: 'APR',
        time: '2:00 Pm'
    },
    {
        image: '/images/events/background.png',
        alt: 'Events',
        header: 'Imo State Innovation & Investment Forum 2025',
        text: 'Start-up Showcase',
        body: 'Start-up Showcase',
        day: 14,
        month: 'APR',
        time: '2:00 Pm'
    },
    {
        image: '/images/events/background.png',
        alt: 'Events',
        header: 'Imo State Innovation & Investment Forum 2025',
        text: 'Start-up Showcase',
        body: 'Start-up Showcase',
        day: 14,
        month: 'APR',
        time: '2:00 Pm'
    },
]

export default function AwarenessUpcomingEvents() {
    return (
        <section className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-12 md:py-16 lg:py-[80px]">
            <div className="max-w-[1198px] mx-auto flex flex-col items-center gap-8 md:gap-12 lg:gap-[50px]">
                <p className="font-satoshi font-bold text-2xl sm:text-3xl md:text-[32px] text-[#3B3B3B] leading-[1.1] tracking-normal">
                    Upcoming Events
                </p>

                <div className="w-full flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row items-center gap-6 md:gap-8 lg:gap-[54px] justify-center">
                    {EventsData.map((item, index) => (
                        <div key={index} className='w-full max-w-[362px]'>
                            <div className="relative w-full aspect-[362/205] rounded-t-[18px] overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.alt}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="w-full rounded-br-[18px] rounded-bl-[18px] border border-t-0 border-[#CACACA] py-3 md:py-[14px] px-4 md:px-[21px] bg-white flex flex-col gap-2 md:gap-[8px]">
                                <h2 className="font-satoshi font-bold text-sm sm:text-base md:text-[16px] leading-normal tracking-normal">
                                    {item.header}
                                </h2>

                                <div className="w-fit h-[21px] rounded-[15px] border border-black px-[10px] bg-black">
                                    <p className="font-satoshi font-bold text-xs sm:text-sm md:text-[14px] leading-normal tracking-normal text-white">
                                        {item.text}
                                    </p>
                                </div>

                                <p className="font-satoshi font-normal text-xs sm:text-sm md:text-[14px] leading-normal tracking-normal text-[#6A6A6A]">
                                    Uniting visionaries, investors, and innovators to drive digital transformation, youth empowerment, and sustainable growth in Imo State.
                                </p>

                                <div className="w-full flex items-center justify-between">
                                    <div className="flex items-center gap-2 md:gap-[10px]">
                                        <p className="font-satoshi font-bold text-xl sm:text-2xl md:text-[28px] leading-none tracking-normal text-black">
                                            {item.day}
                                        </p>
                                        <p className="font-satoshi font-bold text-sm sm:text-base md:text-[16px] text-[#0000FF] leading-none tracking-normal">
                                            {item.month}
                                        </p>
                                    </div>
                                    <p className="font-satoshi font-bold text-sm sm:text-base md:text-[16px] leading-none tracking-normal text-[#7C7C7C]">
                                        {item.time}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}