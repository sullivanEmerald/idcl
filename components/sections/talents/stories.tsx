"use client"
import Image from "next/image";
import { motion } from "framer-motion";

const TestimonialData = [
    {
        image: "/images/testimonial/chinedu.png",
        name: "Chinedu Ogulu",
        description: "Founder, GreenBox AI",
        text: `"IDCL was the turning point for our startup. Through their accelerator program, we secured seed funding, connected with global mentors, and gained exposure we never thought possible from Owerri. It's more than a tech hub—it's a launchpad."`,
    },
    {
        image: "/images/testimonial/fatima.png",
        name: "Fatima B.",
        description: "Software Engineering Intern, UniTech Owerri",
        text: `"Thanks to IDCL's internship partnership with my university, I had hands-on access to advanced tools like 3D printing labs and AI workshops. The experience gave me confidence and skills that now stand out in my CV."`,
    },
    {
        image: "/images/testimonial/tolu.png",
        name: "Tolu Aina",
        description: "Business Analyst, Lagos",
        text: `"I attended a cybersecurity training at IDCL and was blown away by the quality of instruction and global relevance. Their infrastructure rivals what you'd find in top cities, and their vision for digital Africa is inspiring."`,
    },
    {
        image: "/images/testimonial/tolu.png",
        name: "Tolu Aina",
        description: "Business Analyst, Lagos",
        text: `"I attended a cybersecurity training at IDCL and was blown away by the quality of instruction and global relevance. Their infrastructure rivals what you'd find in top cities, and their vision for digital Africa is inspiring."`,
    },
];

export default function TalentTestimonials() {
    const containerVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.15 }
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
    return (
        <motion.section
            className="w-full max-w-[1200px] mx-auto flex flex-col gap-10 lg:gap-[54px] items-center px-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            {/* Header */}
            <motion.header
                className="flex flex-col gap-5 lg:gap-[21px] items-center text-center w-full max-w-[620px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <p className="font-satoshi font-bold text-[24px] lg:text-[32px] leading-[1.2] text-[#3B3B3B]">
                    Success Stories from Our Hiring Partners
                </p>
                <span className="font-satoshi font-light text-[16px] lg:text-[20px] leading-[1.4] text-[#000000] max-w-[653px]">
                    Hear from the companies that hired with confidence..
                </span>
            </motion.header>
            <motion.section
                className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-4"
                variants={containerVariants}
            >
                {TestimonialData.map((item, index) => (
                    <motion.div
                        key={index}
                        className="relative w-full max-w-[287px] min-h-[376px] mx-auto sm:mx-0 flex flex-col gap-[10px] p-6 md:py-[30px] md:px-[22px] border border-[#EAEAEA] rounded-[10px]"
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
    );
}
