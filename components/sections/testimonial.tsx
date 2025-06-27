"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const TestimonialData = [
    {
        image: '/images/testimonial/chinedu.png',
        name: 'Chinedu Ogulu',
        description: 'Founder, GreenBox AI',
        text: `"IDCL was the turning point for our startup. Through their accelerator program, we secured seed funding, connected with global mentors, and gained exposure we never thought possible from Owerri. It's more than a tech hub—it's a launchpad."`
    },
    {
        image: '/images/testimonial/fatima.png',
        name: 'Fatima B.',
        description: 'Software Engineering Intern, UniTech Owerri',
        text: `"Thanks to IDCL's internship partnership with my university, I had hands-on access to advanced tools like 3D printing labs and AI workshops. The experience gave me confidence and skills that now stand out in my CV."`
    },
    {
        image: '/images/testimonial/tolu.png',
        name: 'Tolu Aina',
        description: 'Business Analyst, Lagos',
        text: `"I attended a cybersecurity training at IDCL and was blown away by the quality of instruction and global relevance. Their infrastructure rivals what you'd find in top cities, and their vision for digital Africa is inspiring."`
    },
    {
        image: '/images/testimonial/fatima.png',
        name: 'Fatima B.',
        description: 'Software Engineering Intern, UniTech Owerri',
        text: `"Thanks to IDCL's internship partnership with my university, I had hands-on access to advanced tools like 3D printing labs and AI workshops. The experience gave me confidence and skills that now stand out in my CV."`
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
            staggerChildren: 0.18
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 30 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

export default function Testimonials() {
    return (
        <motion.section
            className="w-full max-w-[1200px] px-4 mx-auto py-16 flex flex-col gap-12 md:gap-[54px] items-center justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <header className="w-full max-w-[867px] flex flex-col gap-5 md:gap-[21px] items-center justify-center text-center">
                <motion.div
                    className="flex items-center w-[153px] h-[34px] gap-[10px] bg-[#D8F5FF] rounded-[20px] justify-center"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.2 }}
                >
                    <span className="font-satoshi font-normal text-[16px] leading-[1.5] tracking-[0.08em] uppercase text-[#0000FF]">
                        Testimonials
                    </span>
                </motion.div>
                <motion.h2
                    className="w-full max-w-[318px] font-satoshi font-bold text-2xl md:text-[32px] leading-[1.1] tracking-normal capitalize text-[#3B3B3B]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    What Our Clients Say
                </motion.h2>
                <motion.p
                    className="font-satoshi font-light text-base md:text-[20px] leading-[1] md:leading-[1.3] tracking-[0em] text-[#000000] w-full max-w-[653px]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    Trusted by innovators, learners, and partners across West Africa and beyond.
                </motion.p>
            </header>

            <motion.section
                className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-4"
                variants={containerVariants}
            >
                {TestimonialData.map((item, index) => (
                    <motion.div
                        key={index}
                        className="relative w-full max-w-[287px] min-h-[376px] mx-auto sm:mx-0 flex flex-col gap-[10px] p-6 md:py-[30px] md:px-[22px] border border-[#EAEAEA] rounded-[10px] bg-white shadow-md"
                        variants={cardVariants}
                        whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(0,93,255,0.12)" }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <div className="flex items-center gap-4 md:gap-[20px]">
                            <Image
                                src={item.image}
                                alt={item.name}
                                height={72}
                                width={72}
                                className="rounded-full"
                            />
                            <div>
                                <p className="font-vietnam font-semibold text-lg md:text-[18px] leading-[28px] tracking-[-0.0025em] text-[#282A2D]">
                                    {item.name}
                                </p>
                                <p className="font-vietnam font-normal text-sm md:text-[12px] leading-[22px] tracking-[-0.0025em] text-[#616771]">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                        <blockquote className="font-vietnam font-normal text-sm md:text-[12px] text-[#616771] leading-6 md:leading-[24px] tracking-[-0.0025em]">
                            {item.text}
                        </blockquote>
                        <div className="flex gap-2 md:gap-[10px] mt-4 md:absolute md:bottom-[50px]">
                            {[...Array(5)].map((_, i) => (
                                <Image
                                    key={i}
                                    src='/images/testimonial/star.png'
                                    width={22}
                                    height={22}
                                    alt='star'
                                />
                            ))}
                        </div>
                    </motion.div>
                ))}
            </motion.section>
        </motion.section>
    )
}