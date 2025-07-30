"use client"
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Leaders = [
    {
        image: '/images/about/manager.png',
        name: 'Mrs Stella Ezenduka',
        position: 'General Manager',
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
        image: '/images/about/prime.png',
        name: 'Primus Amaefule',
        position: 'Hub Supervisor ',
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
        image: '/images/about/udoka.png',
        name: 'Udoka Onwueme',
        position: 'Admin',
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
        image: '/images/about/admin.png',
        name: 'Chibuike Mebrim',
        position: 'Learning Supervisor',
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
        image: '/images/about/accountant.png',
        name: 'Ngozi Ariwuzo',
        position: 'Accountant',
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
        image: '/images/about/team2.png',
        name: 'Anthony okonkwo',
        position: 'Facility Manager',
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
]

export default function AboutLeaderShip() {
    const cardVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.92 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };
    const imageVariants = {
        hidden: { opacity: 0, x: -40 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <>
            <section className="w-full max-w-[1200px] h-auto mx-auto flex flex-col items-center gap-[64px] pb-[80px] px-4 md:px-6 lg:px-8">
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

                <motion.section
                    className="w-full max-w-[1140px] h-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-[32px]"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {Leaders.map((item, index) => (
                        <motion.div
                            key={index}
                            className="w-full sm:w-[calc(50%-15px)] md:w-[calc(33.333%-20px)] lg:w-[261px] h-[220px] flex items-center flex-col justify-between p-2 bg-white rounded-[10px] shadow-lg"
                            variants={cardVariants}
                            whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(0,93,255,0.12)" }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <motion.img
                                src={item.image}
                                alt={item.name}
                                className="w-auto h-auto max-h-[120px]"
                                variants={imageVariants}
                            />
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
                        </motion.div>
                    ))}
                </motion.section>
            </section>
        </>
    )
}