import Image from "next/image"
import Logo from "../general/logo"

const Solution = [
    {
        header: 'Solutions',
        data: [
            {
                name: "Appointment Booking",
                width: '149px',
            },
            {
                name: "Book A tour",
                width: '81px',
            },
            {
                name: "Vendor Registration",
                width: '136px',
            },
            {
                name: "Jobs & Recruitment",
                width: '134px',
            }


        ]
    },

    {
        header: 'Company',
        data: [
            {
                name: "About us",
                width: '61px',
            },
            {
                name: "Contact us",
                width: '73px',
            },
            {
                name: "Our Partners",
                width: '87px',
            },
            {
                name: "Global Partnerships",
                width: '134px',
            },

        ]
    },

    {
        header: 'Resource',
        data: [
            {
                name: "FAQs",
                width: '35px',
            },
            {
                name: "Hackathon",
                width: '75px',
            },
            {
                name: "Privacy Policy",
                width: '95px',
            },
            {
                name: "Terms & Condition",
                width: '124px',
            },
        ]
    },
]

const socials = [
    {
        src: '/images/socials/linkedin.png',
        href: '',
        alt: 'linkedin',
        width: 13.5,
        height: 13.5

    },
    {
        src: '/images/socials/facebook.png',
        href: '',
        alt: 'facebook',
        width: 8.93,
        height: 14.39
    },
    {
        src: '/images/socials/instagram.png',
        href: '',
        alt: 'instagram',
        width: 13,
        height: 13
    },
    {
        src: '/images/socials/youtube.png',
        href: '',
        alt: 'youtube',
        width: 16,
        height: 11
    },
]
export default function Footer() {
    return (
        <>
            <section className="w-full mt-auto h-[356px] bg-[#F9FAFB] flex items-center justify-center gap-[134px]">
                <div className="w-[185px] h-[112.8px] flex flex-col gap-[19px]">
                    <Logo />
                    <p className="w-[185px] h-[51px] font-lexend font-normal text-[16px] leading-[1.4] tracking-[-0.02em] text-[#827F7F]">Driving Africa’s Digital Transformation</p>
                </div>
                <div className="w-[893px] h-[168px] flex gap-[67px]">
                    {Solution.map((item, index) => (
                        <section key={index} className='w-[149px] h-[168px] flex flex-col gap-[16px]'>
                            <p className="font-lexend font-semibold w-[72px] h-[24px] text-[16px] leading-[24px] tracking-[-0.25px] text-[#3B3B3B]">{item.header}
                            </p>
                            <div className="w-[149px] h-[128px] flex flex-col gap-[16px]">
                                {item.data.map((link, i) => (
                                    <p
                                        key={i}
                                        className="font-lexend font-normal leading-[20px] text-[14px] text-[#827F7F] tracking-normal"
                                        style={{ width: link.width }}
                                    >
                                        {link.name}
                                    </p>
                                ))}
                            </div>
                        </section>
                    ))}
                    <div className="w-[216px] h-[45px] flex items-center gap-[12px]">
                        {socials.map((item, index) => (
                            <div key={index} className='w-[45px] h-[45px] border border-[#ECEFF3] rounded-full flex items-center justify-center'>
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    width={item.width}
                                    height={item.height}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <p className="w-[285] h-[20px] font-lexend font-normal leading-[20px] tracking-normal text-[14px] text-[#3B3B3B] text-center">Copyright ©2025, Imo Digital City Limited</p>
        </>
    )
}