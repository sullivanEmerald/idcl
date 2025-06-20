import Image from "next/image";
import Link from "next/link";
import Logo from "../general/logo";

const Solution = [
    {
        header: "Solutions",
        data: [
            { name: "Appointment Booking", width: "149px", url: '/appointment' },
            { name: "Book A tour", width: "81px", url: '/infrastructure/tour' },
            { name: "Vendor Registration", width: "136px", url: '/vendor' },
            { name: "Jobs & Recruitment", width: "134px", url: '/jobs' },
        ],
    },
    {
        header: "Company",
        data: [
            { name: "About us", width: "61px", url: '/about' },
            { name: "Contact us", width: "73px", url: '/contact' },
            { name: "Our Partners", width: "87px", url: '/' },
            { name: "Global Partnerships", width: "134px", url: '/partnership' },
        ],
    },
    {
        header: "Resource",
        data: [
            { name: "FAQs", width: "35px", url: '#' },
            { name: "Hackathon", width: "75px", url: '#' },
            { name: "Privacy Policy", width: "95px", url: '#' },
            { name: "Terms & Condition", width: "124px", url: '#' },
        ],
    },
];

const socials = [
    {
        src: "/images/socials/linkedin.png",
        href: "",
        alt: "linkedin",
        width: 13.5,
        height: 13.5,
    },
    {
        src: "/images/socials/facebook.png",
        href: "",
        alt: "facebook",
        width: 8.93,
        height: 14.39,
    },
    {
        src: "/images/socials/instagram.png",
        href: "",
        alt: "instagram",
        width: 13,
        height: 13,
    },
    {
        src: "/images/socials/youtube.png",
        href: "",
        alt: "youtube",
        width: 16,
        height: 11,
    },
];

export default function Footer() {
    return (
        <footer className="w-full bg-[#F9FAFB] px-6 py-12 lg:px-[80px] lg:py-[80px]">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-[134px]">
                {/* Logo + Text */}
                <div className="flex flex-col gap-4 lg:gap-[19px] max-w-[185px]">
                    <Logo />
                    <p className="font-lexend font-normal text-[16px] leading-[1.4] tracking-[-0.02em] text-[#827F7F]">
                        Driving Africa's Digital Transformation
                    </p>
                </div>

                {/* Links & Socials */}
                <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-[67px] w-full">
                    {/* Links */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:flex lg:gap-[67px]">
                        {Solution.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col gap-4 lg:gap-[16px] min-w-[149px]"
                            >
                                <p className="font-lexend font-semibold text-[16px] leading-[24px] tracking-[-0.25px] text-[#3B3B3B]">
                                    {item.header}
                                </p>
                                <div className="flex flex-col gap-3">
                                    {item.data.map((link, i) => (
                                        <Link href={link.url}
                                            key={i}
                                            className="font-lexend font-normal leading-[20px] text-[14px] text-[#827F7F]"
                                            style={{ width: link.width }}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Socials */}
                    <div className="flex justify-center lg:justify-start gap-3 lg:gap-[12px]">
                        {socials.map((item, index) => (
                            <div
                                key={index}
                                className="w-[45px] h-[45px] border border-[#ECEFF3] rounded-full flex items-center justify-center"
                            >
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
            </div>
        </footer>
    );
}
