"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutUSVision() {
    return (
        <motion.section
            className="w-full min-h-[500px] lg:h-[612.54px] py-8 px-4 sm:py-12 sm:px-8 lg:py-[50px] lg:px-[121px] flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-[65px]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
        >
            {/* Image - responsive sizing with exact dimensions on lg+ */}
            <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
            >
                <Image
                    src='/images/vision/vision.png'
                    alt="vision"
                    width={535}
                    height={512}
                    className="object-contain rounded-[10px]"
                />
            </motion.div>

            {/* Content - responsive with exact styling on lg+ */}
            <motion.div
                className="w-full max-w-[599px] lg:w-[599.18px] lg:h-[309px] flex flex-col gap-6 sm:gap-8 lg:gap-[35px]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
            >
                <div className="w-full lg:w-[599px] flex items-start gap-4 sm:gap-6 lg:gap-[25px]">
                    <Image src='/images/vision/eyes.png' width={63} height={63} priority alt="vision-image" />
                    <div className="flex flex-col items-start gap-4 md:gap-[12px]">
                        <motion.h2
                            className="font-satoshi font-bold text-2xl sm:text-3xl lg:text-[32px] leading-[1.1] tracking-normal text-[#3B3B3B]"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            Our Vision
                        </motion.h2>
                        <motion.p
                            className="font-satoshi font-light text-base sm:text-lg lg:text-[20px] leading-[1.3] sm:leading-[1.2] lg:leading-[1] tracking-normal text-[#000000]"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            To become the leading hub for digital innovation and entrepreneurship in West Africa.
                        </motion.p>
                    </div>
                </div>

                <div className="w-full lg:w-[599.18px] flex items-start gap-4 sm:gap-6 lg:gap-[25px]">
                    <Image src='/images/vision/mission.png' width={63} height={63} priority alt="vision-image" />
                    <div className="flex flex-col items-start gap-4 md:gap-[12px]">
                        <motion.h2
                            className="font-satoshi font-bold text-2xl sm:text-3xl lg:text-[32px] leading-[1.1] tracking-normal text-[#3B3B3B]"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            Our Mission
                        </motion.h2>
                        <motion.p
                            className="font-satoshi font-light text-base sm:text-lg lg:text-[20px] leading-[1.3] sm:leading-[1.2] lg:leading-[1] tracking-normal text-[#000000]"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            To empower West Africa's digital ecosystem through innovation, skill development, and entrepreneurship support that connects talent with opportunity.
                        </motion.p>
                    </div>
                </div>
            </motion.div>
        </motion.section>
    )
}