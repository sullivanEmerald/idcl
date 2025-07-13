"use client"
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const HireableSkills = [
    {
        image: "/images/talent/hire/one.png",
        header: "Software Development",
        body: "Frontend, Backend, Full-stack (JavaScript, Python, etc.)",
    },
    {
        image: "/images/talent/hire/two.png",
        header: "Data Science & AI",
        body: "Analysts, Machine Learning Engineers",
    },
    {
        image: "/images/talent/hire/three.png",
        header: "UI/UX Design",
        body: "Product Designers, Researchers",
    },
    {
        image: "/images/talent/hire/four.png",
        header: "Cybersecurity ",
        body: " Ethical Hackers, Risk Analysts",
    },
    {
        image: "/images/talent/hire/five.png",
        header: "Cloud Engineering ",
        body: "AWS, Azure, DevOps Engineers",
    },
    {
        image: "/images/talent/hire/six.png",
        header: "Blockchain/Web3 ",
        body: "Smart Contract Developers",
    },
    {
        image: "/images/talent/hire/seven.png",
        header: "IT Support ",
        body: "Desktop support, Network engineers",
    },
];

export default function TalentExpertise() {
    const containerVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.15 }
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
            className="bg-[#F5F9FF] flex flex-col items-center justify-center gap-[40px] lg:gap-[64px] px-4 py-10 lg:h-[1075px]"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <motion.h1
                className="text-[#3B3B3B] font-satoshi text-[24px] lg:text-[32px] font-bold leading-[110%] text-center capitalize"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                Expertise You Can Hire Today
            </motion.h1>
            <motion.div
                className="flex flex-wrap justify-center gap-[20px] lg:gap-[22px] w-full lg:w-[1198px]"
                variants={containerVariants}
            >
                {HireableSkills.map((item, index) => (
                    <motion.div
                        key={index}
                        className="rounded-[11px] w-full max-w-[335px] lg:w-[283px]"
                        variants={cardVariants}
                        whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(0,93,255,0.12)" }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <Image
                            src={item.image}
                            alt={item.header}
                            width={283}
                            height={180}
                            className="w-full object-cover rounded-tl-[11px] rounded-tr-[11px]"
                            priority
                        />
                        <div className="flex flex-col py-[20px] px-[22px] items-center justify-center gap-[10px] self-stretch border border-[#EAEAEA] bg-[#fff] h-auto lg:h-[194px]">
                            <div className="flex flex-col justify-between items-start gap-[10px] w-full">
                                <h1 className="text-[#282A2D] font-satoshi text-[18px] lg:text-[20px] font-bold leading-[28px] lg:leading-[32px] tracking-[0.14px]">
                                    {item.header}
                                </h1>
                                <p className="text-[#616771] font-satoshi text-[14px] lg:text-[16px] font-normal leading-[142%] tracking-[0.112px]">
                                    {item.body}
                                </p>
                                <Link
                                    href="/"
                                    className="flex py-[12px] px-[10px] items-center gap-[10px] rounded-[50px]"
                                >
                                    <span className="text-[#005DFF] text-center font-roboto text-[15px] font-medium leading-normal">
                                        Request Now
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    );
}
