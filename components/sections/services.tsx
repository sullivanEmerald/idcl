import Image from "next/image"

const ServicesData = [
    {
        name: 'Digital Skill Development ',
        image: '/images/services/digital.png',
        text: 'Training for individuals and civil servants',
    },
    {
        name: 'Startup Incubation',
        image: '/images/services/startup.png',
        text: 'Hackathons, mentoring, equity funding',
    },
    {
        name: 'Business Process Outsourcing ',
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
        <>
            <section className="w-[1200px] h-[1936.67px] py-[80px] mx-auto flex flex-col items-center gap-[64px]">
                <header className="w-[867px] h-[161px] flex flex-col gap-[17px] items-center justify-center text-center">
                    {isServices && (
                        <div className="flex items-center w-[153px] h-[34px] gap-[10px] bg-[#D8F5FF] rounded-[20px] justify-center">
                            <span className="
                        font-satoshi 
                        font-normal 
                        text-[16px] 
                        leading-[1.5] 
                        tracking-[0.08em] 
                        uppercase
                        text-[#0000FF]
                    ">
                                Our Services
                            </span>
                        </div>
                    )}
                    <p className="inline-block w-[189px] font-satoshi font-bold text-[32px] leading-[1.1] tracking-normal capitalize text-[#3B3B3B]">
                        What We Do
                    </p>
                    <span className="font-satoshi font-light text-[20px] leading-[1] tracking-[0em] text-[#000000] w-[867px] h-[54px] inline-block">Unlocking opportunities through skill-building, innovation hubs, startup support, and smart city solutions.</span>
                </header>
                <section className="w-[1200px] h-[474.56px] flex flex-wrap gap-[24px]">
                    {ServicesData.map((item, index) => (
                        <div key={index} className='w-[384px] h-[474.56px] p-1'>
                            <Image src={item.image} alt='services' height={248.56} width={384} className='block' />
                            <div className="w-[384px] h-[224px] border border-[#EAEAEA]  p-[32px] flex flex-col gap-[10px]">
                                <div className="w-[320px] h-[164px] flex flex-col justify-between">
                                    <p className="font-satoshi font-bold text-[20px] tracking-[0.007em] leading-[32px] text-[#282A2D]">{item.name}</p>
                                    <span className="w-[320px] inline-block font-satoshi font-normal text-[18px] leading-[1.42] tracking-[0.007em] text-[#616771]">{item.text}</span>
                                    <button className=" flex py-[12px] px-[33px] gap-[10px] items-center justify-center rounded-[56px] border border-[#0000FF] bg-transparent w-[145px]"
                                    >
                                        <p className="font-roboto font-medium leading-[1] tracking-normal text-[15px] text-[#0000FF] self-stretch">Get Started</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </section>
        </>
    )
}