"use client"
import Image from "next/image";
import { motion } from "framer-motion";

const ServicesData = [
    {
        name: 'Digital Skill Development',
        image: '/images/services/digital.png',
        text: 'Training for individuals and civil servants',
    },
    {
        name: 'Startup Incubation',
        image: '/images/services/startup.png',
        text: 'Hackathons, mentoring, equity funding',
    },
    {
        name: 'Business Process Outsourcing',
        image: '/images/services/business.png',
        text: 'Call centers, remote customer support jobs',
    },
    {
        name: 'Innovation Hubs & Infrastructure',
        image: '/images/services/innovation.png',
        text: 'Innovation Hubs & Infrastructure',
    },
    {
        name: 'Academic Partnerships',
        image: '/images/services/academic.png',
        text: 'Internships, research labs',
    },
    {
        name: 'Smart City Solutions & Cybersecurity',
        image: '/images/services/smart.png',
        text: 'Data protection, urban planning',
    },
    {
        name: 'Hospitality & Events',
        image: '/images/services/hospitality.png',
        text: 'Guest lodging, restaurants',
    },
    {
        name: 'Digital Infrastructure & ICT Training',
        image: '/images/services/ict.png',
        text: 'AI, blockchain, global-standard training',
    },
    {
        name: 'IP & Innovation Protection',
        image: '/images/services/ip.png',
        text: 'Patent support, IP law',
    },
];

const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: "easeOut",
            when: "beforeChildren",
            staggerChildren: 0.15
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 30 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

export default function Services({ isServices }: { isServices: boolean }) {
    return (
        <motion.section
            className="w-full max-w-[1197px] px-4 sm:px-6 md:px-8 lg:px-0 min-h-screen py-12 md:py-16 lg:py-[80px] mx-auto flex flex-col items-center gap-8 sm:gap-12 lg:gap-[64px]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <header className="w-full lg:w-[867px] h-auto lg:h-[161px] flex flex-col gap-4 sm:gap-[17px] items-center justify-center text-center">
                {isServices && (
                    <motion.div
                        className="flex items-center w-[153px] h-[34px] gap-[10px] bg-[#D8F5FF] rounded-[20px] justify-center"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.2 }}
                    >
                        <span className="font-satoshi font-normal text-sm sm:text-[16px] leading-[1.5] tracking-[0.08em] uppercase text-[#0000FF]">
                            Our Services
                        </span>
                    </motion.div>
                )}
                <motion.p
                    className="inline-block w-[189px] font-satoshi font-bold text-2xl sm:text-3xl lg:text-[32px] leading-[1.1] tracking-normal capitalize text-[#3B3B3B]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    What We Do
                </motion.p>
                <motion.span
                    className="font-satoshi font-light text-base sm:text-lg lg:text-[20px] leading-normal lg:leading-[1] tracking-[0em] text-[#000000] w-full lg:w-[867px] h-auto lg:h-[54px] inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    Unlocking opportunities through skill-building, innovation hubs, startup support, and smart city solutions.
                </motion.span>
            </header>
            <motion.section
                className="w-full h-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-[24px]"
                variants={containerVariants}
            >
                {ServicesData.map((item, index) => (
                    <motion.div
                        key={index}
                        className='w-full sm:w-auto h-auto shadow-lg rounded-[10px]'
                        variants={cardVariants}
                        whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(0,93,255,0.12)" }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false, amount: 0.5 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <Image
                                src={item.image}
                                alt='services'
                                width={281}
                                height={248}
                                className='object-contain rounded-tl-[10px] w-full rounded-tr-[10px] block'
                            />
                        </motion.div>
                        <div className="w-full h-auto border border-[#EAEAEA] pt-[22px] pr-[19px] pb-[34px] pl-[19px]">
                            <div className="w-full h-auto lg:h-[164px] flex flex-col justify-between gap-2">
                                <p className="font-satoshi font-bold text-lg sm:text-xl lg:text-[18px] tracking-[0.126px] leading-[23px] text-[#282A2D]">
                                    {item.name}
                                </p>
                                <span className="font-satoshi font-normal text-base sm:text-lg lg:text-[16px] leading-[22px] tracking-[0.112px] self-stretch text-[#616771]">
                                    {item.text}
                                </span>
                                <button className="py-2 sm:py-3 lg:py-[12px] px-4 sm:px-6 lg:px-[33px] gap-2 sm:gap-3 lg:gap-[10px] rounded-[56px] border border-[#005DFF] bg-transparent w-full sm:w-[145px] hover:bg-[#005DFF]  group">
                                    <p className="group-hover:text-white font-roboto font-medium leading-[1] tracking-normal text-sm sm:text-base lg:text-[15px] text-[#005DFF]">
                                        Get Started
                                    </p>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.section>
        </motion.section>
    )
}