"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const organisation = [
    {
        image: '/images/founders/learn/one.png',
        body: 'Young Ambitious Talents'
    },
    {
        image: '/images/founders/learn/two.png',
        body: 'Problem solvers with scalable ideas'
    },
    {
        image: '/images/founders/learn/three.png',
        body: 'Open minded builders'
    },
    {
        image: '/images/founders/learn/four.png',
        body: 'Committed team players'
    },
]

export default function FoundersLearn() {
    return (
        <motion.section
            className="bg-white w-full py-[80px] "
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                    opacity: 1, y: 0,
                    transition: { duration: 0.8, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.15 }
                }
            }}
        >
            <div className="flex flex-col gap-6 sm:gap-8 lg:gap-[31px] items-center justify-center">
                <motion.h1
                    className="text-[#000] font-satoshi text-2xl sm:text-3xl lg:text-[32px] font-bold leading-[110%] capitalize text-center"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 }
                    }}
                >
                    Who Should Apply
                </motion.h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-[30px]">
                    {organisation.map((item, index) => (
                        <motion.div
                            key={index}
                            className="flex w-full sm:w-[calc(50%-12px)] lg:w-[263px] pt-6 sm:pt-8 lg:pt-[35px] px-4 sm:px-6 lg:px-[40px] pb-4 sm:pb-5 lg:pb-[16px] flex-col gap-3 sm:gap-4 lg:gap-[16px] items-center justify-center self-stretch rounded-2xl sm:rounded-3xl lg:rounded-[32px] bg-[#F9FAFB]"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 relative">
                                <Image
                                    src={item.image}
                                    alt={item.body}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            <p className="self-stretch font-figtree font-bold text-sm sm:text-base lg:text-[16px] leading-normal text-[#1D2939] text-center">
                                {item.body}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}