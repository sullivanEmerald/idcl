"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AwarenessHeroSection() {
    return (
        <motion.section
            className="relative w-full min-h-[618px] mb-0"
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
                    src="/images/awareness/image.png"
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
                    src="/images/awareness/cover.png"
                    alt="Overlay"
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>
            {/* Content */}
            <motion.div
                className="relative z-10 container mx-auto px-5 sm:px-6 lg:px-8 xl:px-[120px] pt-[80px]"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
                <motion.div
                    className="max-w-[896px] flex flex-col gap-[15px]"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: "backOut" }}
                >
                    <motion.h1
                        className="font-satoshi font-black text-[40px] leading-[1.2] sm:text-[50px] md:text-[60px] lg:text-[70px] xl:text-[80px] xl:leading-[89px] tracking-[0.007em] text-white"
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.7, delay: 0.35, ease: "backOut" }}
                    >
                        Empowering Creators Through Intellectual Property Education
                    </motion.h1>
                    <motion.div
                        className="flex items-center gap-[24px] self-stretch border-l-4 border-white pl-[15px] sm:pl-[25px]"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                    >
                        <p className="font-satoshi font-medium text-[18px] leading-[1.4] sm:text-[20px] md:text-[22px] lg:text-[24px] lg:leading-[34px] tracking-[0.007em] text-white">
                            Our training programs demystify IP rights for creators, entrepreneurs, and innovators. Learn how to legally protect your ideas and build confidently.
                        </p>
                    </motion.div>
                    <motion.div
                        className="w-full sm:w-[299px] h-[50px] flex items-center gap-[24px] mt-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                    >
                        {/* <Link
                            className="w-full sm:w-[221px] h-[50px] rounded-[50px] py-[16px] px-[22px] bg-white flex items-center justify-center border-none no-underline hover:bg-opacity-90 transition-all duration-200"
                            href="#"
                        >
                            <p className="font-roboto font-medium text-[15px] text-[#373737] leading-[100%] tracking-normal">
                                Join Upcoming Workshop
                            </p>
                        </Link> */}
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}