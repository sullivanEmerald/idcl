"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PublicHeroSection() {
    return (
        <motion.section
            className="relative w-full min-h-[400px] lg:min-h-[618px] mb-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={{
                hidden: { opacity: 0, scale: 1.05 },
                visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.9, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.18 }
                }
            }}
        >
            {/* Background Images */}
            <motion.div
                className="absolute inset-0 -z-10"
                initial={{ opacity: 0, scale: 1.1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
            >
                <Image
                    src="/images/public/image.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>
            <motion.div
                className="absolute inset-0 -z-10"
                initial={{ opacity: 0, scale: 1.1 }}
                whileInView={{ opacity: 0.85, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 1.3, delay: 0.1, ease: "easeOut" }}
            >
                <Image
                    src="/images/public/cover.png"
                    alt="Overlay"
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>
            {/* Content */}
            <motion.div
                className="relative z-10 w-full px-4 lg:w-[896px] top-4 md:top-[80px] lg:left-[120px] flex flex-col gap-3 lg:gap-[15px] lg:pt-0"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
                <motion.h1
                    className="font-satoshi font-black text-4xl sm:text-5xl md:text-6xl lg:text-[80px] leading-tight sm:leading-snug md:leading-normal lg:leading-[89px] w-full lg:w-[896px] tracking-wide lg:tracking-[0.007em] text-[#ffffff]"
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: "backOut" }}
                >
                    Smart Solutions for Government and Business
                </motion.h1>
                <motion.div
                    className="flex items-center gap-4 lg:gap-[24px] self-stretch border-l-4 border-[#ffffff] pl-4 lg:pl-[25px]"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                >
                    <p className="font-satoshi font-medium text-base sm:text-lg md:text-xl lg:text-[24px] leading-relaxed sm:leading-loose md:leading-loose lg:leading-[34px] tracking-normal lg:tracking-[0.007em] text-[#ffffff] flex-[1_0_0]">
                        From e-governance to business process automation, IDCL helps institutions transform digitally—improving efficiency, transparency, and service delivery.
                    </p>
                </motion.div>
                <motion.div
                    className="w-full sm:w-[299px] h-[50px] flex items-center gap-4 lg:gap-[24px]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                >
                    <Link
                        className="w-full sm:w-[204px] h-[50px] rounded-[50px] py-4 lg:py-[16px] px-4 lg:px-[22px] bg-[#fff] flex items-center justify-center border-none no-underline"
                        href="#"
                    >
                        <p className="w-full sm:w-[174px] font-roboto font-medium text-sm sm:text-[15px] text-[#373737] leading-[100%] tracking-normal">
                            Request a Consultation
                        </p>
                    </Link>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}