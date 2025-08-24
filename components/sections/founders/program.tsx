"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const TourProcess = [
    {
        stage: "01",
        header: "Founder Selection",
        body: "3-Day Bootcamp to stress test the founders (not the idea)",
        list: ["100 candidates", "1 week", "In person"],
        color: "#00008E",
    },
    {
        stage: "02",
        header: "Opportunity Discovery",
        body: "prototype validated through customer interviews",
        list: ["40 participants", "11 weeks", "Hybrid"],
        color: "#005F8E",
    },
    {
        stage: "03",
        header: "Solution Creation",
        body: "MVP and early traction in the form of actual customers",
        list: ["16 weeks", "12 teams", "Hybrid"],
        color: "#008E80",
    },
    {
        stage: "04",
        header: "Local Go To Market",
        body: "validate, refine, and execute market entry strategies",
        list: ["12 weeks", "six start-ups", "hybrid"],
        color: "#80008E",
    },
    {
        stage: "05",
        header: "Global Go to Market",
        body: "Repeatable sales model and good validation of the business model",
        list: ["3 weeks in silicon valley", "3 Teams", "Demo-day"],
        color: "#8E3E00",
    },
];

export default function FoundersProgram() {
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
                Program Journey at a Glance
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
                            className="font-poppins absolute top-[-30px] sm:top-[-45px] lg:top-[-70px] left-[-5px] sm:left-[-8px] lg:left-[-11px] font-bold text-[80px] sm:text-[120px] lg:text-[160px] leading-[100px] sm:leading-[150px] lg:leading-[200px]"
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
                            <div className="w-full flex flex-col gap-[10px] sm:gap-[12px] lg:gap-[15px]">
                                {item.list.map((listItem, listIndex) => (
                                    <div
                                        key={listIndex}
                                        className="flex items-start gap-2"
                                    >
                                        <div className="w-2 h-2 mt-1 rounded-full bg-[#000]" />
                                        <p className="font-satoshi text-[14px] sm:text-[15px] lg:text-[16px] leading-[18px] sm:leading-[19.5px] lg:leading-[21px] font-normal text-[#475467]">
                                            {listItem}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}