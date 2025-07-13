"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const PartnersVoices = [
    {
        header: '“IDCL’s execution and local expertise made our pilot a success.”',
        body: 'Director, Zinox Education Program',
    },
    {
        header: '“IDCL’s execution and local expertise made our pilot a success.”',
        body: 'Director, Zinox Education Program',
    },
    {
        header: '“IDCL’s execution and local expertise made our pilot a success.”',
        body: 'Director, Zinox Education Program',
    },
    {
        header: '“IDCL’s execution and local expertise made our pilot a success.”',
        body: 'Director, Zinox Education Program',
    },
];

export default function PartnershipVoices() {
    return (
        <motion.section
            className="w-full max-w-[1200px] mx-auto py-12 md:py-16 lg:py-[80px] flex flex-col items-center gap-8 md:gap-12 lg:gap-[54px] px-4 sm:px-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.15 }
                }
            }}
        >
            <motion.h1
                className="text-[#3B3B3B] font-satoshi text-2xl sm:text-3xl lg:text-[32px] font-bold leading-[1.1] lg:leading-[32px]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
                Voices from Our Partners
            </motion.h1>
            <motion.div
                className="w-full flex flex-col md:flex-row items-center gap-6 md:gap-4 lg:gap-[24px]"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.12, delayChildren: 0.2 }
                    }
                }}
                initial="hidden"
                animate="visible"
            >
                {PartnersVoices.map((item, index) => (
                    <motion.div
                        key={index}
                        className="w-full md:w-1/2 lg:w-[384px] flex flex-col py-6 md:py-8 lg:py-[26px] px-6 md:px-8 lg:px-[32px] items-start gap-6 md:gap-8 lg:gap-[32px] border border-[#EAEAEA]"
                        initial={{ opacity: 0, scale: 0.92, y: 30 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(0,93,255,0.12)" }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <p className="text-[#616771] font-vietnam text-sm sm:text-[14px] font-normal leading-6 lg:leading-[24px] tracking-tight lg:tracking-[-0.035px]">
                            {item.header}
                        </p>
                        <p className="text-[#282A2D] font-vietnam text-base sm:text-lg lg:text-[18px] font-semibold leading-7 lg:leading-[28px] tracking-tight lg:tracking-[-0.45px]">
                            {item.body}
                        </p>

                        <div className="flex gap-2 lg:gap-[10px]">
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
            </motion.div>
        </motion.section>
    );
}