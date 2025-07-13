"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";

export const ScheduleFormData = [
    {
        label: 'Full Name',
        name: 'fullname',
        placeholder: 'Enter your full name',
        type: 'text'
    },
    {
        label: 'Company Name',
        name: 'company',
        placeholder: 'Enter your company name',
        type: 'text'
    },
    {
        label: 'Role You\'re Hiring For',
        name: 'role',
        placeholder: 'Enter the role you\'re hiring for',
        type: 'text'
    },
    {
        label: 'Skills Required',
        name: 'skills',
        placeholder: 'List required skills',
        type: 'text'
    },
    {
        label: 'Remote/On-site?',
        name: 'remote',
        placeholder: 'Select work arrangement',
        type: 'select',
        options: ['On-Site', 'Remote', 'Hybrid']
    },
    {
        label: 'Duration',
        name: 'duration',
        placeholder: 'Enter employment duration',
        type: 'text'
    },
    {
        label: 'Budget (optional)',
        name: 'budget',
        placeholder: 'Enter budget range',
        type: 'text'
    },
    {
        label: 'Preferred Start Date',
        name: 'startdate',
        placeholder: 'Select start date',
        type: 'text'
    },
    {
        label: 'Contact Info',
        name: 'contact',
        placeholder: 'Enter phone or email',
        type: 'text'
    },
];

export default function TalentHero() {
    const [iframeLoaded, setIframeLoaded] = useState(false);
    return (
        <motion.section
            className="relative w-full min-h-[400px] md:min-h-[618px] mb-0 px-4 py-4 md:py-0 sm:px-6 lg:px-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.15 }
                }
            }}
        >
            {/* Background Images */}
            <motion.div
                className="absolute inset-0 -z-10"
                initial={{ opacity: 0, scale: 1.05 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
            >
                <Image
                    src="/images/talent/image.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>
            <motion.div
                className="absolute inset-0 -z-10"
                initial={{ opacity: 0, scale: 1.05 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.1, delay: 0.1, ease: "easeOut" }}
            >
                <Image
                    src="/images/talent/cover.png"
                    alt="Overlay"
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>
            {/* Content */}
            <motion.div
                className="relative z-10 w-full lg:w-[896px] pt-8 md:pt-20 lg:top-[20px] lg:left-[110px] flex flex-col gap-4 md:gap-[15px] mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
                <motion.h1
                    className="font-satoshi font-black text-4xl sm:text-5xl md:text-6xl lg:text-[70px] leading-[1.2] md:leading-[89px] w-full lg:w-[896px] tracking-[0.007em] text-[#ffffff] text-center lg:text-left"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    Hire Certified Tech Talent from Across Africa—Fast.
                </motion.h1>
                <motion.div
                    className="flex items-center gap-4 md:gap-[24px] self-stretch border-l-4 border-[#ffffff] pl-4 md:pl-[25px]"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <p className="font-satoshi font-medium text-base sm:text-lg md:text-xl lg:text-[24px] leading-normal md:leading-[34px] tracking-[0.007em] text-[#ffffff] flex-[1_0_0]">
                        We produce top-tier, job-ready professionals ready to work on your most pressing digital needs. Tell us what you need—we'll match you with certified, reliable talent, quickly and efficiently.
                    </p>
                </motion.div>
                <motion.div
                    className="w-full md:w-[450px] flex flex-col sm:flex-row items-center gap-4 md:gap-[24px] justify-center lg:justify-start"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <Dialog>
                        <DialogTrigger asChild>
                            <button className="w-full h-[50px] rounded-[50px] py-3 md:py-[16px] px-4 md:px-[22px] bg-[#FFFFFF] hover:bg-[#f0f0f0] transition-colors flex items-center justify-center">
                                <p className="font-roboto font-medium text-sm md:text-[15.36px] text-[#373737] leading-[100%] tracking-normal text-center">
                                    Submit Talent Request
                                </p>
                            </button>
                        </DialogTrigger>
                        <DialogContent className="bg-[#fff] max-h-screen overflow-y-auto w-full max-w-[90vw] md:max-w-2xl lg:max-w-2xl">
                            <DialogHeader>
                                <DialogTitle className="font-satoshi text-2xl md:text-[30px] font-bold leading-normal text-[#344054]">
                                    Submit Talent Request
                                </DialogTitle>
                                <DialogDescription className="overflow-y-auto">
                                    {!iframeLoaded && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-20 rounded-[12px]">
                                            <Loader2 className="animate-spin text-blue-400" />
                                        </div>
                                    )}
                                    <iframe
                                        src="https://office.imodigitalcity.com/talents"
                                        title="Talent Application"
                                        width="100%"
                                        height="900"
                                        className="w-full min-h-[600px] rounded-[12px] border-0"
                                        allowFullScreen
                                        onLoad={() => {
                                            // Fix: Only set as loaded if the iframe's contentWindow is accessible and loaded
                                            setTimeout(() => setIframeLoaded(true), 500);
                                        }}
                                    ></iframe>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <Link
                        className="w-full h-[50px] rounded-[56px] py-3 md:py-[16px] px-4 md:px-[22px] bg-transparent border border-[#FFFFFF] hover:bg-white/10 transition-colors flex items-center justify-center gap-[10px]"
                        href="/talent/pools"
                    >
                        <p className="font-roboto font-medium text-sm md:text-[15px] text-[#F5F9FF] leading-[100%] tracking-normal text-center">
                            Browse Talent Pool
                        </p>
                    </Link>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}