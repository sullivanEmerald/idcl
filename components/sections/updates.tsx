"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const UpdateData = [
    {
        image: '/images/home/update.png',
        name: 'Unlocking Africa\'s Potential Through Digital Transformation',
        text: 'Africa is at a tipping point. With a population set to double by 2050 and the fastest-growing youth demographic globally, the continent is uniquely positioned to leapfrog traditional development models through technology.',
        date: 'Published 24 April, 2025'
    },
    {
        image: '/images/home/update.png',
        name: 'Unlocking Africa\'s Potential Through Digital Transformation',
        text: 'Africa is at a tipping point. With a population set to double by 2050 and the fastest-growing youth demographic globally, the continent is uniquely positioned to leapfrog traditional development models through technology.',
        date: 'Published 24 April, 2025'
    },
    {
        image: '/images/home/update.png',
        name: 'Unlocking Africa\'s Potential Through Digital Transformation',
        text: 'Africa is at a tipping point. With a population set to double by 2050 and the fastest-growing youth demographic globally, the continent is uniquely positioned to leapfrog traditional development models through technology.',
        date: 'Published 24 April, 2025'
    }
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

const cardVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 30 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

export default function Updates() {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;
        let req: number;
        let scrollAmount = 1.2; // px per frame
        let direction = 1;
        function animateScroll() {
            if (!scrollContainer) return;
            scrollContainer.scrollLeft += scrollAmount * direction;
            // If reached end, reverse direction for infinite loop
            if (scrollContainer.scrollLeft + scrollContainer.offsetWidth >= scrollContainer.scrollWidth) {
                direction = -1;
            } else if (scrollContainer.scrollLeft <= 0) {
                direction = 1;
            }
            req = requestAnimationFrame(animateScroll);
        }
        req = requestAnimationFrame(animateScroll);
        return () => cancelAnimationFrame(req);
    }, []);

    return (
        <motion.section
            className="w-full min-h-screen lg:h-[724px] bg-[#F5F9FF] py-8 sm:py-12 lg:py-[68px] flex flex-col items-center gap-6 sm:gap-8 lg:gap-[26px] px-4 sm:px-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="w-full sm:w-[238px] h-auto lg:h-[90px] flex flex-col items-center gap-4 sm:gap-5 lg:gap-[21px]">
                <motion.div
                    className="w-[104px] h-[34px] rounded-[20px] px-[14px] py-[5px] bg-[#D8F5FF] flex items-center justify-center"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.2 }}
                >
                    <span className="font-satoshi font-normal text-sm sm:text-[16px] leading-[1.5] tracking-[0.08em] uppercase text-[#0000FF]">
                        Updates
                    </span>
                </motion.div>
                <motion.p
                    className="w-full sm:w-[238px] h-auto font-satoshi font-bold text-2xl sm:text-3xl lg:text-[32px] leading-[1.1] tracking-normal text-[#3B3B3B] text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    Stay Up To Date
                </motion.p>
            </div>
            <div className="relative w-full">
                {/* Gradient overlays for scroll hint */}
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#F5F9FF] to-transparent z-10" />
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#F5F9FF] to-transparent z-10" />
                <div
                    className="overflow-x-auto scrollbar-thin scrollbar-thumb-[#D8F5FF] scrollbar-track-transparent relative"
                    ref={scrollRef}
                >
                    <motion.div
                        className="flex flex-row items-stretch gap-4 sm:gap-6 lg:gap-[33.48px] min-w-[340px] sm:min-w-[700px] md:min-w-[1000px] lg:min-w-[1198px]"
                        style={{ scrollSnapType: 'x mandatory' }}
                        variants={containerVariants}
                    >
                        {UpdateData.concat(UpdateData).map((item, index) => (
                            <motion.div
                                key={index}
                                className="relative flex-shrink-0 w-[90vw] sm:w-[340px] md:w-[380px] lg:w-[381.77px] h-auto lg:h-[407.77px] flex flex-col gap-4 sm:gap-6 lg:gap-[15.76px] bg-white rounded-[16px] shadow-md transition-shadow duration-300 hover:shadow-xl"
                                style={{ scrollSnapAlign: 'start' }}
                                variants={cardVariants}
                                whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(0,93,255,0.12)" }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <div className="relative w-full aspect-[381.77/246.2] rounded-t-[16px] overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt='updates'
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="w-full flex flex-col gap-1 sm:gap-2 lg:gap-[3.94px] px-3 pt-2">
                                    <p className="font-satoshi font-bold text-lg sm:text-xl lg:text-[19.7px] leading-snug lg:leading-[1.31] tracking-tight lg:tracking-[0.17px] text-[#282A2D]">
                                        {item.name}
                                    </p>
                                    <p className="font-satoshi font-normal text-base sm:text-lg lg:text-[17.73px] leading-normal lg:leading-[1.42] tracking-[0.007em] text-[#616771] line-clamp-2 overflow-hidden text-ellipsis">
                                        {item.text}
                                    </p>
                                </div>
                                <p className="w-full px-3 font-lexend font-bold text-xs sm:text-sm lg:text-[13.79px] leading-tight lg:leading-[1.45] tracking-tight lg:tracking-[-0.02em] text-[#827F7F]">
                                    {item.date}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
            <Button>View More News</Button>
        </motion.section>
    )
}