"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
    return (
        <motion.section
            className="relative w-full h-screen min-h-[500px] max-h-[800px] overflow-hidden flex items-center justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
                hidden: { opacity: 0, scale: 1.05 },
                visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.9, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.18 }
                }
            }}
        >
            {/* Background Image Animation */}
            <motion.div
                className="absolute inset-0 -z-10"
                initial={{ opacity: 0, scale: 1.1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
            >
                <Image
                    src="/images/innovation/image.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>
            {/* Overlay Animation */}
            <motion.div
                className="absolute inset-0 -z-10"
                initial={{ opacity: 0, scale: 1.1 }}
                whileInView={{ opacity: 0.85, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.3, delay: 0.1, ease: "easeOut" }}
            >
                <Image
                    src="/images/about/cover.png"
                    alt="Overlay"
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>
            {/* Main Content Animation */}
            <motion.div
                className="relative z-10 w-full max-w-[1164px] px-4 flex flex-col gap-4 lg:gap-[15px] items-center lg:items-start"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
                <motion.h1
                    className="font-satoshi font-black text-4xl sm:text-5xl md:text-6xl lg:text-[80px] leading-tight lg:leading-[1.12] tracking-wide lg:tracking-[0.007em] text-white text-center lg:text-left"
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: "backOut" }}
                >
                    Powering Progress Through Smart Infrastructure
                </motion.h1>
                <motion.div
                    className="flex items-center mt-2 lg:mt-[15px] border-l-4 border-white pl-4 lg:pl-[25px] justify-center lg:justify-start"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                >
                    <p className="font-satoshi w-full lg:w-[552px] font-medium text-base sm:text-lg md:text-xl lg:text-[24px] leading-relaxed lg:leading-[1.42] tracking-wide lg:tracking-[0.007em] text-white text-center lg:text-left">
                        Modern facilities driving jobs, innovation, and digital service delivery across West Africa.
                    </p>
                </motion.div>
                <motion.div
                    className="w-full flex flex-col sm:flex-row gap-4 lg:gap-[24px] mt-4 lg:mt-0 items-center lg:items-start justify-center lg:justify-start"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                >
                    <Link
                        className="w-full sm:w-[130px] h-[50px] rounded-[50px] py-4 lg:py-[16px] px-6 lg:px-[22px] bg-white hover:bg-opacity-90 transition-opacity no-underline flex items-center justify-center"
                        href='/contact'
                    >
                        <p className="font-roboto font-medium text-sm lg:text-[15.36px] text-[#373737] leading-[100%]">
                            Contact Us
                        </p>
                    </Link>
                    <Link
                        className="w-full sm:w-[155px] h-[50px] rounded-[50px] py-4 lg:py-[16px] px-6 lg:px-[22px] bg-transparent border border-white hover:bg-white hover:bg-opacity-10 transition-colors no-underline flex items-center justify-center"
                        href='/infrastructure/tour'
                    >
                        <p className="font-roboto font-medium text-sm lg:text-[15.36px] text-white leading-[100%]">
                            Book A Tour
                        </p>
                    </Link>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}