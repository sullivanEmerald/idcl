"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const Engagements = [
    {
        number: "300+",
        division: "Startups Incubated",
    },
    {
        number: "15",
        division: "Countries Represented",
    },
    {
        number: "$5M+",
        division: "in Total Funding Facilitated",
    },
    {
        number: "100+",
        division: "Mentors & Advisors",
    },
];

export default function StartUpAnalytics() {
    return (
        <motion.section
            className="relative w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.8,
                        ease: "easeOut",
                        when: "beforeChildren",
                        staggerChildren: 0.15,
                    },
                },
            }}
        >
            {/* Decorative top image - matches original at lg */}
            <div className="w-full h-[116px]">
                <Image
                    src="/images/startup/upper.png"
                    alt="Decorative top element"
                    width={1440}
                    height={116}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Main content section - matches original at lg */}
            <div className="relative w-full h-[274px] flex items-center">
                {/* Background pattern */}
                <div className="absolute inset-0 -z-10">
                    <Image
                        src="/images/startup/pattern.png"
                        alt="Background pattern"
                        fill
                        className="object-cover"
                        quality={100}
                    />
                </div>

                {/* Engagement items - responsive below lg, original at lg */}
                <div className="w-full mx-auto px-4 lg:px-0">
                    <div className="grid grid-cols-2 lg:flex lg:flex-row lg:items-center lg:self-stretch lg:gap-20 lg:justify-center gap-6 md:gap-10 justify-items-center">
                        {Engagements.map((item, index) => (
                            <motion.div
                                key={index}
                                className="flex flex-col items-center lg:items-start gap-2 lg:gap-[10px]"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <p className="text-[#2A3342] text-center lg:text-center font-satoshi font-bold text-3xl sm:text-4xl lg:text-[48px] lg:leading-[60px] lg:tracking-[-0.96px]">
                                    {item.number}
                                </p>
                                <p className="text-[#556987] text-center lg:text-center font-satoshi text-base sm:text-lg lg:text-[20px] lg:font-medium lg:leading-[30px] max-w-[180px] lg:max-w-none">
                                    {item.division}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Decorative bottom image - matches original at lg */}
            <div className="w-full h-[116px]">
                <Image
                    src="/images/startup/down.png"
                    alt="Decorative bottom element"
                    width={1440}
                    height={116}
                    className="w-full h-full object-cover"
                />
            </div>
        </motion.section>
    );
}