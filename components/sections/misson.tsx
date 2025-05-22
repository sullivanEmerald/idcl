import Image from "next/image";

const misson = [
    {
        name: 'Innovation',
        icon: '/images/icons/innovation.png',
        alt: 'innovation',
        text: 'We embrace creativity and continuous improvement'
    },
    {
        name: 'Collaboration',
        icon: '/images/icons/collaboration.png',
        alt: 'Collaboration',
        text: 'We work with global partners, communities, and governments to drive impact.'
    },
    {
        name: 'Sustainability',
        icon: '/images/icons/sustain.png',
        alt: 'Collaboration',
        text: 'We invest in people, the environment, and socially inclusive growth.'
    },
    {
        name: 'Integrity',
        icon: '/images/icons/intergrity.png',
        alt: 'Integrity',
        text: 'We operate with transparency, ethics, and accountability.'
    },
    {
        name: 'Excellence',
        icon: '/images/icons/excellence.png',
        alt: 'Collaboration',
        text: 'We deliver world-class services and strive for measurable results.'
    }
]

export default function Mission({ isMission }: { isMission: boolean }) {
    return (
        <section className="flex flex-col items-center justify-center w-full min-h-screen lg:h-[654px] py-12 lg:py-0">
            <header className="w-full px-6 lg:px-0 lg:w-[867px] h-auto lg:h-[198px] flex flex-col gap-4 lg:gap-[17px] items-center justify-center text-center">
                {isMission && (
                    <div className="flex items-center w-[142px] h-[34px] gap-[10px] bg-[#D8F5FF] rounded-[20px] justify-center">
                        <span className="font-satoshi font-normal text-[16px] leading-[1.5] tracking-[0.08em] uppercase text-[#0000FF]">
                            Our Mission
                        </span>
                    </div>
                )}
                <p className="font-satoshi font-bold text-3xl lg:text-[32px] leading-[1.1] tracking-normal capitalize">
                    Core Values
                </p>
                <span className="font-satoshi font-light text-lg lg:text-[20px] leading-normal lg:leading-[1] tracking-[0em] text-[#000000] w-full px-4 lg:px-0 lg:w-[867px]">
                    To empower West Africa's digital ecosystem through innovation, skill development, and entrepreneurship support that connects talent with opportunity
                </span>
            </header>

            <section className="w-full px-6 lg:px-0 lg:w-[1197px] h-auto lg:h-[265px] flex flex-col sm:flex-row flex-wrap items-center justify-center mt-8 lg:mt-0">
                {misson.map((item, index) => (
                    <div key={index} className="w-full sm:w-1/2 xl:w-[382px] h-auto lg:h-[99px] p-6 lg:p-10 flex items-center gap-6 lg:gap-[26px]">
                        <div className="min-w-[60px] lg:min-w-[73.21px]">
                            <Image
                                src={item.icon}
                                alt={item.alt}
                                height={73.21}
                                width={73.21}
                                className="w-full h-auto"
                            />
                        </div>
                        <div className="w-full lg:w-[262.79px] h-auto lg:h-[79px] flex flex-col gap-3 lg:gap-[14px]">
                            <p className="font-satoshi font-bold text-xl lg:text-[19.45px] leading-[1.2] tracking-normal">
                                {item.name}
                            </p>
                            <span className="font-satoshi font-normal text-base lg:text-[17.29px] leading-[1.2] tracking-normal text-[#1D2130]">
                                {item.text}
                            </span>
                        </div>
                    </div>
                ))}
            </section>
        </section>
    )
}