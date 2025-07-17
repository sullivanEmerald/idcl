"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogDescription,
} from "@/components/ui/dialog";

const textVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const buttonVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function FoundersDevelopmentProgramPage() {
    return (
        <motion.section
            className="relative w-full h-[70vh] min-h-[400px] max-h-[800px] sm:h-[80vh] md:h-[90vh] lg:h-screen overflow-hidden z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {/* Background Image */}
            <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full"
            >
                <Image
                    src='/images/founders/image.png'
                    alt="background"
                    className="object-cover"
                    fill
                    quality={100}
                    priority
                />
            </motion.div>

            {/* Overlay Image */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full"
            >
                <Image
                    src='/images/founders/cover.png'
                    alt="cover"
                    className="object-cover"
                    fill
                    quality={100}
                    priority
                />
            </motion.div>

            {/* Content Container */}
            <motion.div
                className="absolute top-8 md:top-[100px] left-0 md:left-10 right-0 w-full px-4 sm:px-6 md:px-8 max-w-full flex flex-col gap-6 sm:gap-8 md:gap-[15px] items-center lg:items-start z-20"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
            >
                <motion.h1
                    className="font-satoshi font-black leading-[1.12] tracking-[0.007em] text-white text-2xl sm:text-4xl md:text-5xl lg:text-[70px] text-center lg:text-left"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                >
                    IDCL founders development program
                </motion.h1>

                <motion.div
                    variants={textVariants}
                    className="flex items-start border-l-4 border-white pl-3 sm:pl-6 md:pl-[25px] w-full max-w-[900px]"
                >
                    <p className="font-satoshi font-medium text-sm sm:text-lg md:text-xl lg:text-[24px] leading-[1.4] md:leading-[1.42] tracking-[0.007em] text-white text-center lg:text-left">
                        Compete, connect, and grow through a year-long acceleration journey. Work with global mentors, pitch to world-class investors, and unlock opportunities beyond borders. Applications now open.
                    </p>
                </motion.div>

                <motion.div
                    variants={buttonVariants}
                    className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-[24px] w-full justify-center lg:justify-start"
                >
                    <Dialog>
                        <DialogTrigger asChild>
                            <button
                                className="rounded-[56px] py-3 sm:py-4 md:py-[16px] px-4 sm:px-5 md:px-[22px] bg-[#005DFF] text-white flex items-center justify-center gap-2 sm:gap-[10px] font-roboto font-medium transition-all hover:bg-[#003399] text-sm sm:text-base w-full sm:w-auto h-[50px]"
                                type="button"
                            >
                                Apply Now
                            </button>
                        </DialogTrigger>
                        <DialogContent
                            className="bg-white max-w-[98vw] sm:max-w-[95vw] lg:max-w-[600px] border border-[#E4E4E4] shadow-xl p-0 overflow-y-auto max-h-[90vh] rounded-[16px]"
                        >
                            <DialogHeader>
                                <DialogDescription>
                                    <div className="relative z-10 flex flex-col justify-center items-center gap-[32px] py-[32px] px-4 sm:px-6">
                                        <h3 className="font-satoshi text-[24px] sm:text-[32px] md:text-[36px] font-black leading-tight lg:leading-[50px] text-[#005DFF] text-center">
                                            Founders Development Application Form
                                        </h3>
                                        <div className="w-full max-w-[500px] md:max-w-[550px] lg:w-[534px] rounded-[12px] flex flex-col p-3 sm:p-6 md:p-8 border border-[#E4E4E4] bg-white">
                                            <form className="flex flex-col gap-[18px]">
                                                <iframe
                                                    src="https://office.imodigitalcity.com/partner-with-us"
                                                    title="Partnership Application"
                                                    width="100%"
                                                    height="600"
                                                    className="w-full min-h-[400px] rounded-[12px] border-0"
                                                    allowFullScreen
                                                ></iframe>
                                            </form>
                                        </div>
                                    </div>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>

                    <Link
                        href="/hackathon/guide.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-[56px] py-3 sm:py-4 md:py-[16px] px-4 sm:px-5 md:px-[22px] bg-white text-[#005DFF] flex items-center justify-center gap-2 sm:gap-[10px] font-roboto font-medium transition-all hover:bg-gray-100 text-sm sm:text-base w-full sm:w-auto h-[50px] border border-[#005DFF]"
                    >
                        Download Program Guide
                    </Link>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}
