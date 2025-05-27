import Image from "next/image";
import Link from "next/link";
const Leaders = [
    {
        image: '/images/about/leader.png',
        name: 'John Doe',
        position: 'position',
        social: [
            {
                icon: '/images/about/icons/Facebook.png',
                href: ''
            },
            {
                icon: '/images/about/icons/Twitter.png',
                href: ''
            },
            {
                icon: '/images/about/icons/Instagram.png',
                href: ''
            },
        ]
    },
    {
        image: '/images/about/leader.png',
        name: 'John Doe',
        position: 'position',
        social: [
            {
                icon: '/images/about/icons/Facebook.png',
                href: ''
            },
            {
                icon: '/images/about/icons/Twitter.png',
                href: ''
            },
            {
                icon: '/images/about/icons/Instagram.png',
                href: ''
            },
        ]
    },
    {
        image: '/images/about/leader.png',
        name: 'John Doe',
        position: 'position',
        social: [
            {
                icon: '/images/about/icons/Facebook.png',
                href: ''
            },
            {
                icon: '/images/about/icons/Twitter.png',
                href: ''
            },
            {
                icon: '/images/about/icons/Instagram.png',
                href: ''
            },
        ]
    },
    {
        image: '/images/about/leader.png',
        name: 'John Doe',
        position: 'position',
        social: [
            {
                icon: '/images/about/icons/Facebook.png',
                href: ''
            },
            {
                icon: '/images/about/icons/Twitter.png',
                href: ''
            },
            {
                icon: '/images/about/icons/Instagram.png',
                href: ''
            },
        ]
    },
    {
        image: '/images/about/leader.png',
        name: 'John Doe',
        position: 'position',
        social: [
            {
                icon: '/images/about/icons/Facebook.png',
                href: ''
            },
            {
                icon: '/images/about/icons/Twitter.png',
                href: ''
            },
            {
                icon: '/images/about/icons/Instagram.png',
                href: ''
            },
        ]
    },
    {
        image: '/images/about/leader.png',
        name: 'John Doe',
        position: 'position',
        social: [
            {
                icon: '/images/about/icons/Facebook.png',
                href: ''
            },
            {
                icon: '/images/about/icons/Twitter.png',
                href: ''
            },
            {
                icon: '/images/about/icons/Instagram.png',
                href: ''
            },
        ]
    },
    {
        image: '/images/about/leader.png',
        name: 'John Doe',
        position: 'position',
        social: [
            {
                icon: '/images/about/icons/Facebook.png',
                href: ''
            },
            {
                icon: '/images/about/icons/Twitter.png',
                href: ''
            },
            {
                icon: '/images/about/icons/Instagram.png',
                href: ''
            },
        ]
    },
    {
        image: '/images/about/leader.png',
        name: 'John Doe',
        position: 'position',
        social: [
            {
                icon: '/images/about/icons/Facebook.png',
                href: ''
            },
            {
                icon: '/images/about/icons/Twitter.png',
                href: ''
            },
            {
                icon: '/images/about/icons/Instagram.png',
                href: ''
            },
        ]
    }
]
export default function AboutLeaderShip() {
    return (
        <>
            <section className="w-full max-w-[1200px] h-auto min-h-[892px] mx-auto flex flex-col items-center gap-[64px] pb-[80px] px-4 md:px-6 lg:px-8">
                <header className="w-full max-w-[867px] h-auto flex flex-col gap-[17px] items-center justify-center text-center">
                    <div className="flex items-center w-[232px] h-[34px] gap-[10px] bg-[#D8F5FF] rounded-[20px] justify-center">
                        <span className="
                            font-satoshi 
                            font-normal 
                            text-[16px] 
                            leading-[1.5] 
                            tracking-[0.08em] 
                            uppercase
                            text-[#0000FF]
                        ">
                            Leadership Highlight
                        </span>
                    </div>

                    <p className="font-satoshi font-bold text-[32px] leading-[1.1] tracking-normal capitalize">
                        Meet Our Visionary Team
                    </p>
                    <span className="font-satoshi font-light text-[20px] leading-[1] tracking-[0em] text-[#000000] w-full max-w-[867px]">
                        At the helm of IDCL is a forward-thinking leadership team driven by a shared passion for digital transformation in Africa. Learn more about the individuals building West Africa's most ambitious tech ecosystem.
                    </span>
                </header>

                <section className="w-full max-w-[1140px] h-auto flex items-center justify-center flex-wrap gap-[30px]">
                    {Leaders.map((item, index) => (
                        <div key={index} className="w-full sm:w-[calc(50%-15px)] md:w-[calc(33.333%-20px)] lg:w-[261px] h-[220px] flex items-center flex-col justify-between">
                            <img src={item.image} alt={item.name} className="w-auto h-auto max-h-[120px]" />
                            <div className="text-center">
                                <p className="text-[18px] leading-[28px] font-poppins font-semibold tracking-normal">{item.name}</p>
                                <p className="font-poppins font-medium text-[18px] leading-[28px] tracking-normal text-[#005DFF]">{item.position}</p>
                            </div>
                            <div className="w-[104px] h-[24px] flex items-center justify-between">
                                {item.social.map((socialItem, socialIndex) => (
                                    <Link key={socialIndex} href={socialItem.href}>
                                        <img src={socialItem.icon} alt={`${item.name} social`} />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>
            </section>
        </>
    )
}