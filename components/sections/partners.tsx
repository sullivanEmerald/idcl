"use client"
import Image from "next/image"
import { motion } from "framer-motion";

const partners = [
    { src: '/images/partners/silicon.png', alt: 'Silicon Valley', w: 134.7, h: 58.08 },
    { src: '/images/partners/us.jpeg', alt: 'US', w: 183.18, h: 58.08 },
    { src: '/images/partners/zinox.png', alt: 'Zinox', w: 183.18, h: 58.08 },
    { src: '/images/partners/berkeley.png', alt: 'Berkeley', w: 134.7, h: 58.08 },
    { src: '/images/partners/imo.png', alt: 'Imo', w: 102.18, h: 101.26 },
];

const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: "easeOut",
            when: "beforeChildren",
            staggerChildren: 0.15
        }
    }
};

const logoVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 30 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

export default function Partners() {
    return (
        <motion.section
            className="w-full min-h-[436px] flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-[49px] bg-[#F5F9FF] py-16 lg:py-0 px-4 sm:px-6 mb-[40px]"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            {/* Partners Logo Grid - Maintains exact dimensions on large screens */}
            <motion.div
                className="w-full lg:w-[599.06px] h-auto lg:h-[178.34px] flex flex-wrap items-center gap-6 lg:gap-[19px]"
                variants={containerVariants}
            >
                {partners.map((p, i) => (
                    <motion.div
                        key={i}
                        className={`relative`} style={{ width: p.w, height: p.h }}
                        variants={logoVariants}
                    >
                        <Image
                            src={p.src}
                            style={{ objectFit: "contain" }}
                            fill
                            alt={p.alt}
                        />
                    </motion.div>
                ))}
            </motion.div>

            {/* Text Content - Pixel perfect on large screens */}
            <motion.section
                className="w-full lg:w-[557.44px] h-auto lg:h-[271px] flex flex-col gap-4 lg:gap-[17px]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
            >
                <motion.div
                    className="flex items-center w-[142px] h-[34px] gap-[10px] bg-[#D8F5FF] rounded-[20px] justify-center"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.2 }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <span className="font-satoshi font-normal text-[16px] leading-[1.5] tracking-[0.08em] uppercase text-[#0000FF]">
                        Partners
                    </span>
                </motion.div>
                <motion.h2
                    className="font-satoshi font-bold text-2xl sm:text-[32px] leading-[1.1] tracking-normal capitalize"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    viewport={{ once: false, amount: 0.3 }}
                >
                    Core Partners
                </motion.h2>
                <motion.p
                    className="w-full lg:w-[557.44px] font-vietnam font-normal text-sm sm:text-[14px] leading-6 sm:leading-[24px] tracking-[-0.0025em] text-[#616771]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    viewport={{ once: false, amount: 0.3 }}
                >
                    Achieving Africa's digital future is not the work of one actor—it demands the collective strength of governments, the private sector, development organizations, academia, and civil society. These core partners play complementary roles in enabling inclusive growth, scalable innovation, and sustainable digital infrastructure across the continent.
                </motion.p>
            </motion.section>
        </motion.section>
    )
}