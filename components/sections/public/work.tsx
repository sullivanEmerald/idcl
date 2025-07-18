"use client";
import Image from "next/image";
import { motion } from "framer-motion";
const organisation = [
    {
        image: '/images/public/icons/one.png',
        body: 'Proven track record with public/private institutions'
    },
    {
        image: '/images/public/icons/two.png',
        body: 'Local context + global tech expertise'
    },
    {
        image: '/images/public/icons/three.png',
        body: 'Deep focus on transparency and user-centric design'
    },
    {
        image: '/images/public/icons/four.png',
        body: 'Rapid deployment and long-term support'
    },
]


export default function PublicWork() {
    return (
        <motion.section
            className="w-full py-16 md:py-24 lg:py-[112px] flex flex-col items-center gap-6 md:gap-8 lg:gap-[31px] px-4 lg:px-0"
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
            <motion.h1
                className="font-satoshi font-bold text-2xl md:text-3xl lg:text-[32px] md:leading-[35px] text-[#3B3B3B] text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            >
                Why Work With Us
            </motion.h1>
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:flex items-center justify-center w-full gap-4 md:gap-6 lg:gap-[31px] self-stretch max-w-screen-xl mx-auto"
                variants={{ visible: { transition: { staggerChildren: 0.13 } } }}
            >
                {organisation.map((item, index) => (
                    <motion.div
                        key={index}
                        className="flex w-full sm:w-[calc(50%-16px)] lg:w-[263px] pt-6 md:pt-8 lg:pt-[35px] px-6 md:px-8 lg:pr-[40px] lg:pl-[40px] pb-4 md:pb-5 lg:pb-[16px] flex-col gap-3 md:gap-4 lg:gap-[16px] items-center justify-center self-stretch rounded-2xl md:rounded-[10px] bg-[#F9FAFB]"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7, delay: 0.1 * index, ease: "easeOut" }}
                    >
                        <Image
                            src={item.image}
                            alt={item.body}
                            width={64}
                            height={64}
                            className="object-cover"
                            priority
                        />
                        <p className="self-stretch font-figtree font-bold text-sm md:text-base lg:text-[16px] leading-normal text-[#1D2939] text-center">
                            {item.body}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    );
}