import Image from "next/image"
import Link from "next/link"

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
]

export default function GlobalPartners() {
    return (
        <section className="w-[919px] mx-auto py-[80px] flex flex-col items-center gap-[67px]">
            <h1 className="font-satoshi font-bold text-[32px] text-center leading-[35px]">Meet Our Global Allies</h1>
            {GlobalPartnersCollection.map((item, index) => (
                <div key={index} className='flex items-center gap-[43px] self-stretch'>
                    <div>
                        <img src={item.image} alt='partners-image' />
                    </div>
                    <div className="flex pt-[10px] pr-[0px] pb-[40px] pl-[0px] items-center gap-[74px]">
                        <div className="flex flex-col w-[493px] items-start gap-[17px]">
                            <h2 className="self-stretch text-[#3B3B3B] text-[24px] font-bold leading-[26px]">{item.header}</h2>
                            <p className="text-[#000] font-satoshi text-[20px] font-light leading-normal self-stretch text-justify ">{item.body}</p>
                        </div>
                        <Link href={item.website} className='w-[156px] flex py-[12px] px-[33px] gap-[10px] rounded-[56px] border border-[#005DFF]'>
                            <p className="font-roboto text-center font-medium text-[15px] leading-normal text-[#005DFF]">Visit Website</p>
                        </Link>
                    </div>
                </div>
            ))}
        </section>
    )
}