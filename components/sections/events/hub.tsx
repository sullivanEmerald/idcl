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

export default function EventsHub() {
    return (
        <>
            <section className="w-full px-4 sm:px-6 lg:px-0 lg:w-[1198px] h-auto lg:h-[585px] mx-auto flex flex-col items-center gap-6 lg:gap-[50px] py-8 lg:py-0">
                <div className="relative w-full lg:w-[867px] h-auto flex flex-col gap-4 lg:gap-[17px]">
                    <div className="w-full h-auto flex items-center justify-center">
                        <h2 className="font-satoshi font-bold text-2xl sm:text-3xl lg:text-[32px] text-[#3B3B3B] leading-[1.1] tracking-normal text-center">
                            A Hub for Global & Local Innovation Events
                        </h2>
                    </div>
                    <p className="font-satoshi font-light text-base lg:text-[20px] leading-normal lg:leading-[1] tracking-normal text-center">
                        We've proudly hosted events in partnership with leading organizations from Silicon Valley to Lagos. From international pitch competitions to grassroots developer meetups, IDCL's calendar stays packed with energy and innovation.
                    </p>
                </div>
                <div className="w-full h-auto lg:h-[402px] flex flex-col lg:flex-row items-center gap-6 lg:gap-[54px]">
                    {EventsData.map((item, index) => (
                        <div key={index} className='w-full sm:w-[362px] h-auto lg:h-[402px]'>
                            <img src={item.image} alt={item.alt} className="block w-full" />
                            <div className="w-full sm:w-[362px] h-auto rounded-br-[18px] rounded-bl-[18px] border-r border-b border-l py-3 lg:py-[14px] px-4 lg:px-[21px] bg-[#FFFFFF] border-[#CACACA] flex flex-col gap-2 lg:gap-[8px]">
                                <h2 className="w-full lg:w-[298px] font-satoshi font-bold text-[16px] leading-normal tracking-normal">{item.header}</h2>
                                <div className="w-[143px] h-[21px] rounded-[15px] border border-[#000000] px-[10px] bg-[#000000]">
                                    <p className="w-[123px] font-satoshi font-bold text-[14px] leading-normal tracking-normal text-[#FFFFFF]">{item.text}</p>
                                </div>
                                <span className="inline-block w-full lg:w-[298px] font-satoshi font-normal text-[14px] leading-normal tracking-normal text-[#6A6A6A]">
                                    Uniting visionaries, investors, and innovators to drive digital transformation, youth empowerment, and sustainable growth in Imo State.
                                </span>
                                <div className="w-full lg:w-[298px] h-[38px] flex items-center justify-between">
                                    <div className="w-[72px] h-[38px] flex items-center gap-[10px]">
                                        <p className="w-[30px] font-satoshi font-bold text-[28px] leading-none tracking-normal text-[#000000]">{item.day}</p>
                                        <p className="w-[32px] font-satoshi font-bold text-[16px] text-[#0000FF] leading-none tracking-normal">{item.month}</p>
                                    </div>
                                    <p className="w-[66px] font-satoshi font-bold text-[16px] leading-none tracking-normal text-[#7C7C7C]">{item.time}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}