import Image from "next/image"
import Logo from "../general/logo"

const Solution = [
    {
        header: 'Solutions',
        data: [
            { name: "Appointment Booking", width: '149px' },
            { name: "Book A tour", width: '81px' },
            { name: "Vendor Registration", width: '136px' },
            { name: "Jobs & Recruitment", width: '134px' }
        ]
    },
    {
        header: 'Company',
        data: [
            { name: "About us", width: '61px' },
            { name: "Contact us", width: '73px' },
            { name: "Our Partners", width: '87px' },
            { name: "Global Partnerships", width: '134px' }
        ]
    },
    {
        header: 'Resource',
        data: [
            { name: "FAQs", width: '35px' },
            { name: "Hackathon", width: '75px' },
            { name: "Privacy Policy", width: '95px' },
            { name: "Terms & Condition", width: '124px' }
        ]
    },
]

const socials = [
    { src: '/images/socials/linkedin.png', href: '', alt: 'linkedin', width: 13.5, height: 13.5 },
    { src: '/images/socials/facebook.png', href: '', alt: 'facebook', width: 8.93, height: 14.39 },
    { src: '/images/socials/instagram.png', href: '', alt: 'instagram', width: 13, height: 13 },
    { src: '/images/socials/youtube.png', href: '', alt: 'youtube', width: 16, height: 11 }
]

export default function Footer() {
    return (
        <>
            <section className="w-full min-h-[356px] bg-[#F9FAFB] flex flex-start self-stretch gap-[134px] p-[80px]">
                <div className="w-full lg:w-[185px] h-auto lg:h-[112.8px] flex flex-col gap-4 lg:gap-[19px]">
                    <Logo />
                    <p className="w-full lg:w-[185px] font-lexend font-normal text-[16px] leading-[1.4] tracking-[-0.02em] text-[#827F7F]">
                        Driving Africa's Digital Transformation
                    </p>
                </div>

                <div className="w-full lg:w-[893px] h-auto flex flex-col md:flex-row gap-8 lg:gap-[67px]">
                    <div className="w-[610px] grid grid-cols-2 md:grid-cols-3 gap-8 lg:flex lg:gap-[67px]">
                        {Solution.map((item, index) => (
                            <section key={index} className='w-full lg:w-[149px] h-auto lg:h-[168px] flex flex-col gap-4 lg:gap-[16px]'>
                                <p className="font-lexend font-semibold text-[16px] leading-[24px] tracking-[-0.25px] text-[#3B3B3B]">
                                    {item.header}
                                </p>
                                <div className="w-full lg:w-[149px] h-auto lg:h-[128px] flex flex-col gap-4 lg:gap-[16px]">
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
                    </div>

                    <div className="w-full lg:w-[216px] h-auto lg:h-[45px] flex items-center justify-center lg:justify-start gap-3 lg:gap-[12px]">
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
        </>
    )
}