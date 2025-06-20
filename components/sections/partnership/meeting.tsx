import Image from "next/image";
import Link from "next/link";

const GlobalPartnersCollection = [
    {
        image: '/images/partners/imo.png',
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
        <section className="">
            <h1 className="font-satoshi font-bold text-2xl sm:text-3xl lg:text-[32px] text-center leading-[1.1] lg:leading-[35px]">
                Meet Our Global Allies
            </h1>
            <div>
                {GlobalPartnersCollection.map((item, index) => (
                    <div
                        key={index}
                        className="w-full border"
                    >
                        <Image
                            src={item.image}
                            alt={`${item.header} logo`}
                            width={107}
                            height={107}
                            className="h-auto object-contain"
                        />
                        <div className="">
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
                ))}
            </div>
        </section>
    );
}