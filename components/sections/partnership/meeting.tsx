import Image from "next/image";
import Link from "next/link";

const GlobalPartnersCollection = [
    {
        image: '/images/partners/partner.png',
        header: 'Imo State Government',
        body: "Driving digital transformation, the Imo State Government's initiatives like Skill-Up Imo aim to train over 100,000 youths in digital technologies, positioning the state as Nigeria's tech hub",
        website: 'https://www.adminting.com'
    },
    {
        image: '/images/partners/us.png',
        header: 'US Market Access Center (USMAC)',
        body: "Partnering with Imo State to establish a digital city, USMAC brings Silicon Valley expertise to empower Nigerian startups with global market access, mentorship, and investment opportunities.",
        website: 'https://www.adminting.com'
    },
    {
        image: '/images/partners/zinox.png',
        header: 'Zinox Technologies',
        body: "As Nigeria's leading tech manufacturer, Zinox collaborates with Imo State to equip 15,000 youths with digital skills and laptops, fostering a new generation of tech-savvy entrepreneurs.",
        website: 'https://www.adminting.com'
    },
    {
        image: '/images/partners/berkeley.png',
        header: 'University of California, Berkeley',
        body: "Through its SkyDeck accelerator, UC Berkeley offers Imo-based startups access to world-class incubation, mentorship, and funding, bridging Nigerian innovation with global opportunities",
        website: 'https://www.adminting.com'
    },
    {
        image: '/images/partners/silicon.png',
        header: 'Silicon Valley Ecosystem',
        body: "Driving digital transformation, the Imo State Government's initiatives like Skill-Up Imo aim to train over 100,000 youths in digital technologies, positioning the state as Nigeria's tech hub.",
        website: 'https://www.adminting.com'
    },
];

export default function GlobalPartners() {
    return (
        <section className="w-full max-w-[919px] mx-auto py-12 md:py-16 lg:py-[80px] flex flex-col items-center gap-8 md:gap-12 lg:gap-[67px] px-4 sm:px-6">
            <h1 className="font-satoshi font-bold text-2xl sm:text-3xl lg:text-[32px] text-center leading-[1.1] lg:leading-[35px]">
                Meet Our Global Allies
            </h1>

            <div className="w-full flex flex-col gap-8 md:gap-10 lg:gap-[43px]">
                {GlobalPartnersCollection.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col lg:flex-row items-center gap-6 md:gap-8 lg:gap-[43px] w-full"
                    >
                        <div className="w-full max-w-[200px] sm:max-w-[250px] lg:w-auto">
                            <Image
                                src={item.image}
                                alt={`${item.header} logo`}
                                width={200}
                                height={200}
                                className="w-full h-auto object-contain"
                            />
                        </div>

                        <div className="flex flex-col lg:flex-row pt-2 lg:pt-[10px] pb-6 lg:pb-[40px] items-center gap-6 md:gap-10 lg:gap-[74px] w-full">
                            <div className="flex flex-col w-full lg:w-[493px] items-start gap-3 md:gap-4 lg:gap-[17px]">
                                <h2 className="w-full text-[#3B3B3B] text-xl sm:text-2xl lg:text-[24px] font-bold leading-[1.2] lg:leading-[26px]">
                                    {item.header}
                                </h2>
                                <p className="text-[#000] font-satoshi text-base sm:text-lg lg:text-[20px] font-light leading-relaxed lg:leading-normal w-full text-justify">
                                    {item.body}
                                </p>
                            </div>

                            <Link
                                href={item.website}
                                className="w-full lg:w-[156px] flex py-3 lg:py-[12px] px-6 lg:px-[33px] gap-2 lg:gap-[10px] rounded-[56px] border border-[#005DFF] justify-center"
                            >
                                <p className="font-roboto text-center font-medium text-sm sm:text-[15px] leading-normal text-[#005DFF]">
                                    Visit Website
                                </p>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}