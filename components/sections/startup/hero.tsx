"use client";

import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";

const ScheduleFormData = [
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

export default function StartUpHeroSection() {
    return (
        <motion.section
            className="relative w-full min-h-[400px] sm:min-h-[500px] lg:min-h-[618px] mb-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
                hidden: { opacity: 0, scale: 1.05 },
                visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.9, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.18 }
                }
            }}
        >
            {/* Background Images */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/startup/heroimage.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/talent/cover.png"
                    alt="Overlay"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 xl:px-[120px] pt-12 sm:pt-16 lg:pt-[80px] pb-12">
                <div className="w-full lg:w-[896px] flex flex-col gap-3 sm:gap-4 lg:gap-[15px]">
                    <h1 className="font-satoshi font-black text-4xl sm:text-5xl md:text-6xl lg:text-[70px] leading-[1.1] sm:leading-[1.2] lg:leading-[89px] tracking-[0.007em] text-white">
                        Empowering African Startups to Scale with Confidence
                    </h1>

                    <div className="flex items-center gap-4 sm:gap-6 lg:gap-[24px] self-stretch border-l-2 sm:border-l-4 border-white pl-3 sm:pl-4 lg:pl-[25px]">
                        <p className="font-satoshi font-medium text-base sm:text-lg lg:text-[24px] leading-relaxed sm:leading-snug lg:leading-[34px] tracking-[0.007em] text-white">
                            Our incubation and acceleration programs are designed to help early-stage ventures secure funding, access mentorship, and reach global markets. Join a growing community of innovators making real impact.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 lg:gap-[24px] mt-4 sm:mt-6">
                        <Dialog>
                            <DialogTrigger asChild>
                                <button className="w-full sm:w-auto px-6 py-3 lg:w-[216px] lg:h-[50px] rounded-full lg:rounded-[50px] bg-white hover:bg-gray-100 transition-colors duration-200">
                                    <p className="font-roboto font-medium text-sm sm:text-base lg:text-[15.36px] text-[#373737] leading-none lg:leading-[100%]">
                                        Register Your Startup
                                    </p>
                                </button>
                            </DialogTrigger>

                            <DialogContent className="bg-white max-h-screen overflow-y-auto w-full max-w-[95vw] sm:max-w-md md:max-w-lg lg:max-w-xl">
                                <DialogHeader>
                                    <DialogDescription className="overflow-y-auto">
                                        <form className="flex flex-col px-4 sm:px-6 lg:px-[16px] py-4 gap-4 sm:gap-6 lg:gap-[32px]">
                                            <h1 className="font-satoshi text-xl sm:text-2xl lg:text-[30px] font-bold leading-normal text-[#344054]">
                                                Submit Startup Request
                                            </h1>
                                            <iframe
                                                src="https://office.imodigitalcity.com/startups"
                                                title="Startup Application"
                                                width="100%"
                                                height="900"
                                                className="w-full min-h-[600px] rounded-[12px] border-0"
                                                allowFullScreen
                                            ></iframe>
                                        </form>
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>

                        <Link
                            href="/services/startup/rising"
                            className="w-full sm:w-auto px-6 py-3 lg:w-[218px] lg:h-[50px] rounded-full lg:rounded-[50px] border border-white hover:bg-white/10 transition-colors duration-200 text-center"
                        >
                            <p className="font-roboto font-medium text-sm sm:text-base lg:text-[15.36px] text-[#F5F9FF] leading-none lg:leading-[100%]">
                                Explore Our Start-ups
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}