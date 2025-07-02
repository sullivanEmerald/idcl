"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutUsHeroSection() {
    return (
        <motion.section
            className="relative w-full h-[70vh] min-h-[400px] max-h-[800px] sm:h-[80vh] md:h-[90vh] lg:h-screen overflow-visible z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {/* Background Image */}
            <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full"
            >
                <Image
                    src='/images/about/image.png'
                    alt="background"
                    className="object-cover"
                    fill
                    quality={100}
                    priority
                />
            </motion.div>

            {/* Overlay Image */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full"
            >
                <Image
                    src='/images/about/cover.png'
                    alt="cover"
                    className="object-cover"
                    fill
                    quality={100}
                    priority
                />
            </motion.div>

            {/* Content Container */}
            <motion.div
                className="absolute w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[700px] lg:max-w-[896px] h-auto top-40 md:top-1/2 left-2 md:left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 sm:px-6 lg:left-[80px] lg:translate-x-0 lg:top-[170px] lg:transform-none flex flex-col gap-3 md:gap-[15px]"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
            >
                <motion.h1
                    className="w-full font-satoshi font-black leading-[1.12] tracking-[0.007em] text-white text-3xl sm:text-4xl md:text-5xl lg:text-[70px] self-stretch text-center lg:text-left"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                >
                    About Imo Digital City Ltd (IDCL)
                </motion.h1>
                <motion.p
                    className="font-satoshi font-medium text-xl lg:text-2xl leading-[1.42] tracking-[0.007em] text-white border-l-4 border-l-white pl-3 sm:pl-4 md:pl-[25px] md:text-[24px] lg:text-left"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                >
                    Driving Africa&apos;s Digital Transformation
                </motion.p>
            </motion.div>
        </motion.section>
    )
}