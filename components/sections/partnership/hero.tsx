"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PartnershipHeroSection() {
    return (
        <motion.section
            className="relative w-full sm:h-[450px] lg:h-[618px]"
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
            <motion.div
                className="absolute inset-0 -z-10"
                initial={{ opacity: 0, scale: 1.1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
            >
                <Image
                    src="/images/partnership/image.png"
                    alt="Background"
                    width={1440}
                    height={618}
                    className="w-full h-full object-cover"
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
                    src="/images/partnership/cover.png"
                    alt="Overlay"
                    width={1440}
                    height={618}
                    className="w-full h-full object-cover"
                    priority
                />
            </motion.div>
            <motion.div
                className="relative z-10 w-full lg:w-[1167px] mx-auto lg:mx-0 lg:left-[120px] top-[200px] lg:top-[150px] transform lg:transform-none -translate-y-1/2 lg:translate-y-0 px-6 sm:px-8 lg:px-0 py-8 sm:py-0 flex flex-col items-start gap-6 sm:gap-4 lg:gap-[15px]"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
                <motion.h1
                    className="w-full font-satoshi font-black text-4xl sm:text-5xl md:text-6xl lg:text-[80px] leading-[1.2] sm:leading-[1.1] lg:leading-[89px] tracking-wide lg:tracking-[0.56px] text-white"
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: "backOut" }}
                >
                    Together, We Go Further
                </motion.h1>
                <motion.div
                    className="flex flex-col items-start pl-4 sm:pl-5 lg:px-[20px] justify-center gap-6 sm:gap-6 lg:gap-[24px] border-l-2 sm:border-l-[3px] lg:border-l-[4px] border-l-white w-full"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                >
                    <p className="font-satoshi font-medium text-base sm:text-lg md:text-xl lg:text-[24px] leading-relaxed sm:leading-8 lg:leading-[34px] tracking-normal lg:tracking-[0.168px] text-white">
                        We partner with global leaders to co-create programs, drive innovation, and accelerate Africa's digital transformation. Explore our collaborations and see how your organization can plug in.
                    </p>
                </motion.div>
                <motion.div
                    className="flex flex-col sm:flex-row items-start gap-4 sm:gap-4 lg:gap-[24px] w-full mt-4 sm:mt-0"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                >
                    <Link
                        href='/partnership/apply'
                        className="flex py-3 sm:py-4 lg:py-[16px] px-4 sm:px-5 lg:px-[22px] w-full sm:w-full md:w-auto items-center justify-center gap-2 lg:gap-[10px] rounded-[56px] border-none bg-white hover:border hover:border-solid hover:border-white hover:bg-transparent group transition-all"
                    >
                        <p className="text-[#373737] group-hover:text-white font-roboto text-sm sm:text-[15px] font-medium leading-normal">
                            Apply Now
                        </p>
                    </Link>
                    <button className="flex py-3 sm:py-4 lg:py-[16px] px-4 sm:px-5 lg:px-[22px] w-full sm:w-full md:w-auto items-center justify-center gap-2 lg:gap-[10px] rounded-[56px] border border-white bg-transparent hover:bg-white hover:border-none group transition-all">
                        <p className="text-white group-hover:text-[#373737] font-roboto text-sm sm:text-[15px] font-medium leading-normal">
                            Download Program Guide
                        </p>
                    </button>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}