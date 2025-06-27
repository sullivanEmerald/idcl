"use client"
import Image from "next/image";
import { motion } from "framer-motion";

const ObjectivesData = [
    'Digital skill development',
    'Intellectual property commercialization',
    'Tech-driven job creation',
    'Innovation & startup funding',
    'Public sector digitization',
    'Infrastructure for smart economy',
    'Global tech partnerships',
]

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

const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

export default function Objectives({ isObjective }: { isObjective: boolean }) {
    return (
        <motion.section
            className="w-full min-h-screen bg-[#F9FAFB] flex flex-col lg:flex-row py-12 lg:py-[115px] px-6 sm:px-8 lg:px-[119px] gap-12 lg:gap-[61px] items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
        >
            {/* Image - Responsive with exact LG dimensions */}
            <motion.div
                initial={{ opacity: 0, x: -60, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
                <Image
                    src='/images/home/objective.png'
                    alt='objective'
                    width={540}
                    height={500}
                    className="object-contain rounded-[10px]"
                />
            </motion.div>

            {/* Content - Exact LG dimensions when large */}
            <motion.div
                className="w-full max-w-[536px] lg:w-[536px] lg:h-[468px] flex flex-col gap-6 lg:gap-[24px]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.3 }}
            >
                {isObjective && (
                    <motion.div
                        className="w-[231px] h-[34px] flex items-center justify-center gap-[10px] bg-[#D8F5FF] rounded-[20px]"
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.4 }}
                        viewport={{ once: false, amount: 0.3 }}
                    >
                        <span className="font-satoshi font-normal text-sm lg:text-[16px] leading-[1.5] tracking-[0.08em] uppercase text-[#0000FF]">
                            Strategic Objectives
                        </span>
                    </motion.div>
                )}

                <motion.h2
                    className="font-satoshi font-bold text-2xl sm:text-3xl lg:text-[32px] leading-[1.1] tracking-normal capitalize"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    viewport={{ once: false, amount: 0.3 }}
                >
                    Our Blueprint for Impacts
                </motion.h2>

                <motion.ul
                    className="flex flex-col gap-4 lg:gap-[24px] list-disc pl-6 lg:pl-[38px]"
                    variants={containerVariants}
                >
                    {ObjectivesData.map((item, index) => (
                        <motion.li
                            key={index}
                            className="font-satoshi font-light text-base lg:text-[20px] leading-[1.3] lg:leading-[1] tracking-normal"
                            variants={itemVariants}
                        >
                            {item}
                        </motion.li>
                    ))}
                </motion.ul>
            </motion.div>
        </motion.section>
    )
}