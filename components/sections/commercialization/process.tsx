"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const TourProcess = [
    {
        stage: "01",
        header: "Idea Submission",
        body: "Pitch your concept to our team of experts.",
        color: "#00008E",
    },
    {
        stage: "02",
        header: "IP Valuation & Assessment",
        body: "Determine the potential value of your innovation.",
        color: "#005F8E",
    },
    {
        stage: "03",
        header: "Mentorship & Business Development",
        body: "Get paired with mentors to shape your product and business model.",
        color: "#008E80",
    },
    {
        stage: "04",
        header: " Licensing & Legal Support",
        body: "Ensure your IP is protected and ready for licensing deals.",
        color: "#80008E",
    },
    {
        stage: "05",
        header: "Market Entry Support",
        body: "Launch into local and global markets with confidence.",
        color: "#8E3E00",
    },
];

export default function CommercializationProcess() {
    return (
        <motion.section
            className="w-full max-w-[1014px] flex flex-col gap-[50px] md:gap-[75px] items-center mx-auto py-[40px] md:py-[80px] px-4 sm:px-6 lg:px-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
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
            <motion.h1 className="text-[#3B3B3B] text-center font-satoshi font-bold text-[24px] sm:text-[28px] lg:text-[32px] leading-[26.4px] sm:leading-[30.8px] lg:leading-[35.2px]">
                Our Support Process
            </motion.h1>
            <div className="w-full flex gap-x-[20px] sm:gap-x-[40px] lg:gap-x-[95px] gap-y-[60px] sm:gap-y-[80px] justify-center items-start flex-wrap">
                {TourProcess.map((item, index) => (
                    <motion.div
                        key={index}
                        className="relative w-full sm:w-[280px] lg:w-[264px] flex-shrink-0"
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
                        <h1
                            className="font-poppins absolute top-[-30px] sm:top-[-45px] lg:top-[-59px] left-[-5px] sm:left-[-8px] lg:left-[-11px] font-bold text-[80px] sm:text-[120px] lg:text-[160px] leading-[100px] sm:leading-[150px] lg:leading-[200px]"
                            style={{ color: item.color, opacity: "0.1" }}
                        >
                            {item.stage}
                        </h1>
                        <div className="flex w-full sm:w-[280px] lg:w-[264px] h-auto lg:h-[203px] py-[24px] sm:py-[30px] lg:py-[36px] px-[20px] sm:px-[25px] lg:px-[30px] flex-col justify-center items-center gap-[15px] sm:gap-[20px] lg:gap-[25px]">
                            <p className="text-[#000] text-center font-satoshi text-[16px] sm:text-[18px] lg:text-[20px] font-bold">
                                {item.header}
                            </p>
                            <p className="font-satoshi text-[14px] sm:text-[15px] lg:text-[16px] leading-[18px] sm:leading-[19.5px] lg:leading-[21px] font-medium text-center text-[#475467] self-stretch">
                                {item.body}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}