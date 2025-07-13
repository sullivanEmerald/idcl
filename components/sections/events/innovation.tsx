"use client";
import { motion } from "framer-motion";

export default function EventsInnovation() {
    return (
        <motion.section
            className="w-full h-auto lg:h-[361px] bg-[#F5F9FF] flex flex-col gap-6 lg:gap-[36px] items-center justify-center py-12 lg:py-0 px-4 lg:px-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.18 }
                }
            }}
        >
            <motion.h1
                className="w-full lg:w-[791px] font-satoshi font-bold text-2xl md:text-3xl lg:text-[32px] leading-[110%] tracking-normal lg:tracking-[0] text-[#3B3B3B] text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
                Your Innovation Event Deserves a World-Class Space
            </motion.h1>
            <motion.p
                className="w-full lg:w-[867px] font-satoshi font-light text-base md:text-lg lg:text-[20px] leading-normal lg:leading-[1] tracking-normal text-[#000000] text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            >
                Whether you're planning a hackathon, tech summit, product launch, or corporate workshop, IDCL offers a cutting-edge venue designed to elevate your experience. Our facilities are optimized for technology-focused gatherings that inspire, connect, and drive real impact across Africa's digital ecosystem.
            </motion.p>
        </motion.section>
    )
}