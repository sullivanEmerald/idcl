"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function InfrastructureMobile() {
    return (
        <motion.section
            className="w-full flex items-center justify-center py-12 lg:py-[80px] px-4 lg:px-0 mb-[40px]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
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
                className="w-full max-w-[960px] h-auto lg:h-[455px] flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-[66px]"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.12, delayChildren: 0.2 }
                    }
                }}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    className="w-full lg:w-[450px] h-auto lg:h-[241px] flex flex-col gap-4 lg:gap-[17px]"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                >
                    <h2 className="font-satoshi font-black text-2xl md:text-3xl lg:text-[32px] leading-[1.1] tracking-normal text-[#3B3B3B]">
                        Automobile Service Centre
                    </h2>
                    <p className="font-satoshi font-light text-base md:text-lg lg:text-[20px] leading-normal lg:leading-[1] tracking-normal">
                        The IDCL Auto Service Centre combines digital diagnostics with expert mechanical service, targeting government fleets and private sector partners. It is the region's first integrated auto innovation hub—offering vehicle maintenance, digital inspection, and repair in line with smart city goals. This facility supports workforce development and promotes safer, more efficient mobility solutions across Imo State.
                    </p>
                </motion.div>
                <motion.div
                    className="relative w-full lg:w-auto h-[300px] lg:h-auto"
                    initial={{ opacity: 0, scale: 0.92, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                >
                    <div className="relative w-[280px] h-[280px] lg:w-[336.53px] lg:h-[336.53px] mx-auto">
                        <Image
                            src='/images/innovation/car2.png'
                            alt="Automobile Service Centre"
                            fill
                            className="object-cover rounded-[10px]"
                            sizes="(max-width: 1024px) 280px, 336.53px"
                            priority
                        />
                        <div className="absolute left-[80px] top-[80px] lg:left-[100px] lg:top-[105px] w-[280px] h-[280px] lg:w-[336.53px] lg:h-[336.53px]">
                            <Image
                                src='/images/innovation/car1.png'
                                alt="Automobile Service Detail"
                                fill
                                className="object-cover rounded-[10px]"
                                sizes="(max-width: 1024px) 280px, 336.53px"
                                priority
                            />
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}