"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/carousel";

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

const textVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const buttonVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function HeroSection() {
    return (
        <section className="relative w-full h-screen min-h-[500px] md:h-[680px] overflow-hidden">
            <Carousel className="w-full h-full">
                <CarouselContent>
                    {/* Slide 1 */}
                    <CarouselItem className="w-full h-full">
                        <div className="relative w-full h-screen min-h-[500px] md:h-[680px] overflow-hidden">
                            <motion.div
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="w-full h-full"
                            >
                                <Image
                                    src="/images/home/image.png"
                                    alt="Background"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <Image
                                    src="/images/home/cover.png"
                                    alt="Background"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </motion.div>
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                className="absolute z-10 inset-0 px-4 sm:px-6 md:px-8 flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-[16px] text-center
                                    md:items-start md:justify-start md:left-[80px] md:top-[180px] md:text-left lg:w-[895px]"
                            >
                                <motion.div
                                    variants={textVariants}
                                    className="font-satoshi font-black text-4xl sm:text-4xl md:text-6xl lg:text-[80px] leading-[1.1] tracking-[0.56px] text-white"
                                >
                                    <div className="whitespace-nowrap">Driving Africa's</div>
                                    <div className="whitespace-nowrap">Digital Transformation</div>
                                </motion.div>
                                <motion.div
                                    variants={textVariants}
                                    className="flex items-center border-l-4 border-white pl-4 sm:pl-6 md:pl-[25px]"
                                >
                                    <p className="font-satoshi w-full font-medium text-base sm:text-lg md:text-xl lg:text-[24px] leading-[1.4] md:leading-[1.42] tracking-[0.007em] text-white">
                                        Where Local Innovation Meets Global Technology
                                    </p>
                                </motion.div>
                                <motion.div
                                    variants={buttonVariants}
                                    className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-[24px] w-full sm:w-auto"
                                >
                                    <Link
                                        href="/infrastructure"
                                        className="rounded-[56px] py-3 sm:py-4 md:py-[16px] px-4 sm:px-5 md:px-[22px] bg-white no-underline flex items-center justify-center gap-2 sm:gap-[10px] border-none font-roboto font-medium transition-all hover:bg-transparent hover:text-[#F5F9FF] hover:border hover:border-solid hover:border-[#F5F9FF] text-sm sm:text-base w-full sm:w-auto text-center h-[50px]"
                                    >
                                        Explore Our Ecosystem
                                    </Link>
                                    <Link
                                        href="/partnership"
                                        className="rounded-[56px] py-3 sm:py-4 md:py-[16px] px-4 sm:px-5 md:px-[22px] bg-transparent no-underline flex items-center justify-center gap-2 sm:gap-[10px] text-[#F5F9FF] text-sm sm:text-base hover:bg-white hover:border-none hover:text-[#373737] transition-all border border-white font-roboto font-medium w-full sm:w-auto h-[50px] text-center"
                                    >
                                        Partner With Us
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </div>
                    </CarouselItem>
                    {/* Slide 2 */}
                    <CarouselItem className="w-full h-full">
                        <div className="relative w-full h-screen min-h-[500px] md:h-[680px] overflow-hidden">
                            <motion.div
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="w-full h-full"
                            >
                                <Image
                                    src="/images/home/image.png"
                                    alt="Hackathon Background"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <Image
                                    src="/images/home/cover.png"
                                    alt="Hackathon Overlay"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </motion.div>
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                className="absolute z-10 inset-0 px-4 sm:px-6 md:px-8 flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-[16px] text-center
                                    md:items-start md:justify-start md:left-[80px] md:top-[180px] md:text-left lg:w-[895px]"
                            >
                                <motion.div
                                    variants={textVariants}
                                    className="font-satoshi font-black text-3xl sm:text-5xl md:text-6xl lg:text-[60px] leading-[1.1] tracking-[0.56px] text-white"
                                >
                                    IDCL founders development program
                                </motion.div>
                                <motion.div
                                    variants={textVariants}
                                    className="flex items-center border-l-4 border-white pl-4 sm:pl-6 md:pl-[25px]"
                                >
                                    <p className="font-satoshi w-full font-medium text-base sm:text-lg md:text-xl lg:text-[24px] leading-[1.4] md:leading-[1.42] tracking-[0.007em] text-white">
                                        Compete, connect, and grow through a year-long acceleration journey. Work with global mentors, pitch to world-class investors, and unlock opportunities beyond borders. Applications now open.
                                    </p>
                                </motion.div>
                                <motion.div
                                    variants={buttonVariants}
                                    className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-[24px] w-full sm:w-auto"
                                >
                                    <Link
                                        href="/founders-development-program"
                                        className="rounded-[56px] py-3 sm:py-4 md:py-[16px] px-4 sm:px-5 md:px-[22px] bg-[#005DFF] text-white no-underline flex items-center justify-center gap-2 sm:gap-[10px] font-roboto font-medium transition-all hover:bg-[#003399] text-sm sm:text-base w-full sm:w-auto text-center h-[50px]"
                                    >
                                        Apply Now
                                    </Link>
                                    <Link
                                        href="/hackathon/guide.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-[56px] py-3 sm:py-4 md:py-[16px] px-4 sm:px-5 md:px-[22px] bg-white text-[#005DFF] no-underline flex items-center justify-center gap-2 sm:gap-[10px] font-roboto font-medium transition-all hover:bg-gray-100 text-sm sm:text-base w-full sm:w-auto text-center h-[50px] border border-[#005DFF]"
                                    >
                                        Download Program Guide
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </div>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    );
}
