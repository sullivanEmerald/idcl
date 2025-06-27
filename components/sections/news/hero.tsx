"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function NewsHeroSection() {
    return (
        <motion.section
            className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[398px] overflow-hidden"
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
            {/* Background Image */}
            <motion.div
                className="absolute inset-0 -z-10"
                initial={{ opacity: 0, scale: 1.1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
            >
                <Image
                    src="/images/news/image.png"
                    alt="Events Background"
                    fill
                    className="object-cover"
                    priority
                    quality={100}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
                />
            </motion.div>
            {/* Overlay Image */}
            <motion.div
                className="absolute inset-0 -z-10"
                initial={{ opacity: 0, scale: 1.1 }}
                whileInView={{ opacity: 0.85, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 1.3, delay: 0.1, ease: "easeOut" }}
            >
                <Image
                    src="/images/news/cover.png"
                    alt="Overlay"
                    fill
                    className="object-cover"
                    priority
                    quality={100}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
                />
            </motion.div>
            {/* Content Container */}
            <motion.div
                className="absolute z-10 flex flex-col items-start gap-3 sm:gap-4 md:gap-[15px] left-4 sm:left-8 md:left-12 lg:left-[80px] top-16 sm:top-24 md:top-32 lg:top-[120px] w-[calc(100%-32px)] sm:w-auto"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
                <motion.h1
                    className="font-black text-4xl sm:text-5xl md:text-6xl lg:text-[80px] leading-[1.1] sm:leading-[1.1] md:leading-[1.1] lg:leading-[89px] text-white font-satoshi"
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: "backOut" }}
                >
                    IDCL News
                </motion.h1>
                <motion.div
                    className="w-full max-w-[600px] p-2 sm:p-3 md:p-4 border-l-4 border-white"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                >
                    <p className="font-satoshi text-base sm:text-lg md:text-xl lg:text-[24px] font-medium leading-relaxed md:leading-[34px] text-white">
                        Where Local Innovation Meets Global Technology
                    </p>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}