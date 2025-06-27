"use client"
import Image from "next/image";
import { motion } from "framer-motion";

const PlacementProcesses = [
    {
        header: "Skill Development",
        body: "Candidates undergo world-class training via SkillUp Imo and IDCL-certified bootcamps.",
    },
    {
        header: "Assessment & Certification",
        body: "We test technical skills, soft skills, and real-world readiness.",
    },
    {
        header: "Talent Matching",
        body: "Our system matches talent to job roles based on skill, location, and industry fit.",
    },
    {
        header: "Placement & Support",
        body: "We assist with onboarding and provide continuous performance tracking.",
    },
];

export default function TalentDigital() {
    const containerVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.18 }
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
            className="flex flex-col items-center gap-[40px] lg:gap-[60px] mx-auto w-full lg:w-[1134px] px-4 pb-[60px] lg:pb-[80px]"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
        >
            <motion.h1
                className="text-[#3B3B3B] font-satoshi text-[24px] lg:text-[32px] font-bold leading-[110%] text-center lg:text-left capitalize"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                Our Digital Talent Funnel – From Training to Placement
            </motion.h1>
            <motion.div
                className="flex flex-col lg:flex-row gap-[26px] lg:gap-[26px] items-center lg:items-stretch self-stretch"
                variants={containerVariants}
            >
                {PlacementProcesses.map((item, index) => (
                    <motion.div
                        key={index}
                        className="relative flex flex-col items-center gap-[20px] py-[30px] px-[20px] w-full lg:w-[264px] h-auto lg:h-[203px] rounded-[10px] border border-solid border-[#E4E4E4]"
                        variants={cardVariants}
                        whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(0,93,255,0.12)" }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <h2 className="text-[#3B3B3B] text-center font-satoshi font-bold text-[18px] lg:text-[20px] leading-[100%] self-stretch">
                            {item.header}
                        </h2>
                        <p className="text-[#475467] text-center font-satoshi text-[14px] lg:text-[16px] font-medium leading-[135%] self-stretch">
                            {item.body}
                        </p>
                        <p className="absolute top-[-22px] left-1/2 -translate-x-1/2 bg-[#005DFF] rounded-full w-[41px] h-[41px] flex items-center justify-center font-satoshi text-[#fff] font-bold leading-[24px]">
                            {index + 1}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    );
}
