import Image from "next/image";

const ServicesData = [
    {
        name: 'Digital Skill Development',
        image: '/images/services/digital.png',
        text: 'Training for individuals and civil servants',
    },
    {
        name: 'Startup Incubation',
        image: '/images/services/startup.png',
        text: 'Hackathons, mentoring, equity funding',
    },
    {
        name: 'Business Process Outsourcing',
        image: '/images/services/business.png',
        text: 'Call centers, remote customer support jobs',
    },
    {
        name: 'Innovation Hubs & Infrastructure',
        image: '/images/services/innovation.png',
        text: 'Innovation Hubs & Infrastructure',
    },
    {
        name: 'Academic Partnerships',
        image: '/images/services/academic.png',
        text: 'Internships, research labs',
    },
    {
        name: 'Smart City Solutions & Cybersecurity',
        image: '/images/services/smart.png',
        text: 'Data protection, urban planning',
    },
    {
        name: 'Hospitality & Events',
        image: '/images/services/hospitality.png',
        text: 'Guest lodging, restaurants',
    },
    {
        name: 'Digital Infrastructure & ICT Training',
        image: '/images/services/ict.png',
        text: 'AI, blockchain, global-standard training',
    },
    {
        name: 'IP & Innovation Protection',
        image: '/images/services/ip.png',
        text: 'Patent support, IP law',
    },
]

export default function Services({ isServices }: { isServices: boolean }) {
    return (
        <section className="w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-0 min-h-screen lg:h-[1936.67px] py-12 md:py-16 lg:py-[80px] mx-auto flex flex-col items-center gap-8 sm:gap-12 lg:gap-[64px]">
            <header className="w-full lg:w-[867px] h-auto lg:h-[161px] flex flex-col gap-4 sm:gap-[17px] items-center justify-center text-center">
                {isServices && (
                    <div className="flex items-center w-[153px] h-[34px] gap-[10px] bg-[#D8F5FF] rounded-[20px] justify-center">
                        <span className="font-satoshi font-normal text-sm sm:text-[16px] leading-[1.5] tracking-[0.08em] uppercase text-[#0000FF]">
                            Our Services
                        </span>
                    </div>
                )}
                <p className="inline-block w-[189px] font-satoshi font-bold text-2xl sm:text-3xl lg:text-[32px] leading-[1.1] tracking-normal capitalize text-[#3B3B3B]">
                    What We Do
                </p>
                <span className="font-satoshi font-light text-base sm:text-lg lg:text-[20px] leading-normal lg:leading-[1] tracking-[0em] text-[#000000] w-full lg:w-[867px] h-auto lg:h-[54px] inline-block">
                    Unlocking opportunities through skill-building, innovation hubs, startup support, and smart city solutions.
                </span>
            </header>
            <section className="w-full lg:w-[1200px] h-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-[24px]">
                {ServicesData.map((item, index) => (
                    <div key={index} className='w-full sm:w-auto lg:w-[384px] h-auto lg:h-[474.56px] p-1'>
                        <div className="relative w-full aspect-[384/248.56]">
                            <Image
                                src={item.image}
                                alt='services'
                                fill
                                className='object-cover block'
                            />
                        </div>
                        <div className="w-full lg:w-[384px] h-auto lg:h-[224px] border border-[#EAEAEA] p-4 sm:p-6 lg:p-[32px] flex flex-col gap-2 sm:gap-3 lg:gap-[10px]">
                            <div className="w-full lg:w-[320px] h-auto lg:h-[164px] flex flex-col justify-between gap-4">
                                <p className="font-satoshi font-bold text-lg sm:text-xl lg:text-[20px] tracking-[0.007em] leading-normal lg:leading-[32px] text-[#282A2D]">
                                    {item.name}
                                </p>
                                <span className="w-full lg:w-[320px] inline-block font-satoshi font-normal text-base sm:text-lg lg:text-[18px] leading-normal lg:leading-[1.42] tracking-[0.007em] text-[#616771]">
                                    {item.text}
                                </span>
                                <button className="flex py-2 sm:py-3 lg:py-[12px] px-4 sm:px-6 lg:px-[33px] gap-2 sm:gap-3 lg:gap-[10px] items-center justify-center rounded-[56px] border border-[#0000FF] bg-transparent w-full sm:w-[145px]">
                                    <p className="font-roboto font-medium leading-[1] tracking-normal text-sm sm:text-base lg:text-[15px] text-[#0000FF]">
                                        Get Started
                                    </p>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </section>
    )
}