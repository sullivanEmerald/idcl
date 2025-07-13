"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function InfrastructureMain() {
    return (
        <motion.section
            className="relative w-full py-12 md:py-[87px] flex flex-col items-center justify-center overflow-hidden bg-[#F5F9FF]"
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
            <motion.div
                className="w-full px-4 lg:w-[867px] lg:px-0 h-auto lg:h-[108px] flex items-center justify-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
                <p className="w-full lg:w-[867px] font-satoshi font-light text-base md:text-lg lg:text-[20px] leading-normal lg:leading-none tracking-normal text-center">
                    Explore the core physical infrastructures driving digital transformation at IDCL. From high-capacity printing to tech-enabled customer service and automotive repair, our facilities create jobs, power startups, and serve public and private institutions across West Africa.
                </p>
            </motion.div>
        </motion.section>
    )
}