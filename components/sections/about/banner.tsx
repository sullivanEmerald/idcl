import Image from "next/image"
import Link from "next/link"
const Address = [
    {
        text: '23 Egbu Road, Owerri, Imo State, Nigeria',
        icon: '/images/icons/location.png',
        alt: 'location',
        width: '14px',
        height: '20px'
    },

    {
        text: '+2348033369478',
        icon: '/images/icons/phone.png',
        alt: 'phone',
        width: '18px',
        height: '18px'
    },
    {
        text: 'info@imodigitalcity.com',
        icon: '/images/icons/mail.png',
        alt: 'mail',
        width: '25px',
        height: '11.57px'
    },
    {
        text: 'www.imodigitalcity.com',
        icon: '/images/icons/world.png',
        alt: 'mail',
        width: '25px',
        height: '16.5px'
    },
]

const SocialLink = [
    {
        icon: '/images/icons/twitter.png',
        href: '#',

    },
    {
        icon: '/images/icons/instagram.png',
        href: '#',

    },
    {
        icon: '/images/icons/discord.png',
        href: '#',

    }
]
export default function Banner() {
    return (
        <section className="w-full h-[402.65px] flex relative overflow-hidden">
            <div className="w-[656px] h-full py-[62px] px-[120px] bg-[linear-gradient(155deg,_rgba(0,0,142,1)_0%,_rgba(1,114,128,1)_80%)] flex-shrink-0 z-10">
                <div className="w-[416px] h-[278.65px] flex flex-col gap-[39px]">
                    {Address.map((item, index) => (
                        <div key={index} className="flex items-center w-[416px] h-[20px] gap-[10px]">
                            <img src={item.icon} alt={item.alt} className="w-auto h-auto" />
                            <p className="w-[496.81px] h-[20px]  font-satoshi font-black text-[20px] leading-[100%] tracking-[0px] text-[#FFFFFF]">{item.text}</p>
                        </div>
                    ))}
                    <div className="w-[194.86px] h-[42.65px] flex items-center gap-[33.45px]">
                        {SocialLink.map((item, index) => (
                            <Link href={item.href} key={index} className="w-[42.65px] h-[42.65px] rounded-full bg-[#FFFFFF] flex items-center justify-center">
                                <img src={item.icon} className="w-auto h-auto" alt="socials" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scrollable images (hidden scrollbar) */}
            <div className="flex h-full flex-1 overflow-x-auto scrollbar-hide">
                <div className="flex h-full">
                    <Image src='/images/about/first.png' alt="banner" width={340.09} height={402.65} className="object-cover block h-full w-auto" />
                    <Image src='/images/about/second.png' alt="banner" width={340.09} height={402.65} className="object-cover block h-full w-auto" />
                    <Image src='/images/about/third.png' alt="banner" width={340.09} height={402.65} className="object-cover h-full w-auto" />

                </div>
            </div>

        </section>
    );
}