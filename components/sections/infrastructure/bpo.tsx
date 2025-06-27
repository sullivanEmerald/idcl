"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function InfrastructureBpo() {
    return (
        <motion.section
            className="w-full max-w-[1001px] h-auto mx-auto flex flex-col-reverse lg:flex-row items-center justify-center gap-8 lg:gap-[72px] px-4 lg:px-0 py-8 lg:py-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.18 }
                }
            }}
        >
            <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
                <Image
                    src='/images/innovation/bpo.png'
                    alt="BPO Call Centre"
                    width={479}
                    height={412}
                    className="object-cover rounded-[10px]"
                />
            </motion.div>
            <motion.div
                className="w-full lg:w-[450px] h-auto lg:h-[241px] flex flex-col gap-4 lg:gap-[17px] order-1 lg:order-none"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            >
                <h2 className="font-satoshi font-black text-2xl md:text-3xl lg:text-[32px] leading-[1.1] tracking-normal text-[#3B3B3B]">
                    BPO Call Centre
                </h2>
                <p className="font-satoshi font-light text-base md:text-lg lg:text-[20px] leading-normal lg:leading-[1] tracking-normal">
                    IDCL's Business Process Outsourcing (BPO) Call Centre is a fully equipped facility providing multilingual customer service, tech support, and inbound/outbound calling solutions for both local and international clients. It creates employment for trained digital professionals and helps SMEs and enterprises deliver seamless support at scale.
                </p>
            </motion.div>
        </motion.section>
    );
}