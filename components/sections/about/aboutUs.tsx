"use client";
import { motion } from "framer-motion";

export default function AboutUsWho() {
    return (
        <motion.section
            className="w-full py-12 px-4 sm:py-16 lg:pt-[87px] lg:pr-[139px] lg:pb-[68px] lg:pl-[139px] flex flex-col gap-6 sm:gap-8 lg:gap-[36px] items-center justify-center min-h-[300px] sm:min-h-[350px] lg:h-[423px]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
        >
            <motion.div
                className="w-full max-w-[867px] flex flex-col justify-center items-center gap-4 sm:gap-6 lg:gap-[17px]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
            >
                <motion.h2
                    className="w-full font-satoshi font-bold leading-[110%] tracking-[0em] text-[#3B3B3B] text-2xl sm:text-3xl lg:text-[32px] text-center lg:h-[35px]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    Who We Are
                </motion.h2>

                <motion.p
                    className="w-full font-satoshi font-normal leading-[1.5] sm:leading-[1.3] lg:leading-[100%] tracking-[0em] text-[#000000] text-base sm:text-lg lg:text-[18px] text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    Imo Digital City Ltd (IDCL) is where local innovation meets global technology. Based in Owerri, Imo State, Nigeria, IDCL is a privately-owned company with equity from the state government. As West Africa's leading tech incubation and acceleration hub, we foster entrepreneurship, talent development, and innovation through strategic partnerships—most notably with stakeholders from Silicon Valley.
                </motion.p>

                <motion.p
                    className="w-full font-satoshi font-normal leading-[1.5] sm:leading-[1.3] lg:leading-[100%] tracking-[0em] text-[#000000] text-base sm:text-lg lg:text-[20px] text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    Our mission is simple: to build a vibrant digital economy by empowering people, startups, and institutions to succeed in the global tech space. Through mentorship, funding, infrastructure, and global partnerships, we are redefining what it means to innovate from Africa.
                </motion.p>
            </motion.div>
        </motion.section>
    )
}