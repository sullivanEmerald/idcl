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
            <section className="w-[1198px] h-[585px] mx-auto flex flex-col items-center gap-[50px]">
                <div className="relative w-[867px] h-[160px] flex flex-col gap-[17px]">
                    <div className="w-full h-[35px] flex items-center justify-center ">
                        <p className="font-satoshi font-bold text-[32px] text-[#3B3B3B] leading-[1.1] tracking-normal ">A Hub for Global & Local Innovation Events</p>
                    </div>
                    <p className="font-satoshi font-light text-[20px] leading-[1] tracking-normal text-center">We’ve proudly hosted events in partnership with leading organizations from Silicon Valley to Lagos. From international pitch competitions to grassroots developer meetups, IDCL’s calendar stays packed with energy and innovation.</p>
                </div>
                <div className="w-full h-[402px] flex items-center gap-[54px]">
                    {EventsData.map((item, index) => (
                        <div key={index} className='w-[362px] h-[402px]'>
                            <img src={item.image} alt={item.alt} className="block" />
                            <div className="w-[362px] h-[205] rounded-br-[18px] rounded-bl-[18px] border-r border-b border-l py-[14px] px-[21px] bg-[#FFFFFF] border-[#CACACA] flex flex-col gap-[8px] ">
                                <h2 className="w-[298px] font-satoshi font-bold text-[16px] leading-normal tracking-normal">Imo State Innovation & Investment Forum 2025</h2>
                                <div className="w-[143px] h-[21px] rounded-[15px] border border-[#000000] px-[10px] bg-[#000000]">
                                    <p className="w-[123px] font-satoshi font-bold text-[14px] leading-normal tracking-normal text-[#FFFFFF]">Start-up Showcase</p>
                                </div>
                                <span className="inline-block w-[298px] font-satoshi font-normal text-[14px] leading-normal tracking-normal text-[#6A6A6A]">
                                    Uniting visionaries, investors, and innovators to drive digital transformation, youth empowerment, and sustainable growth in Imo State.
                                </span>
                                <div className="w-[298px] h-[38px] flex items-center justify-between">
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
