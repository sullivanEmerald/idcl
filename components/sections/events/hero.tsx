"use client";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const ScheduleFormData = [
    {
        label: 'Full Name ',
        name: 'fullname',
        placeholder: 'fullname',
        type: 'text'
    },
    {
        label: 'Company Name',
        name: 'company',
        placeholder: 'company',
        type: 'text'
    },
    {
        label: 'Email Address',
        name: 'email',
        placeholder: 'mail',
        type: 'text'
    },
    {
        label: 'Phone Number',
        name: 'phone',
        placeholder: 'Phone Number',
        type: 'text'
    },
    {
        label: 'Website or Social Media Link',
        name: 'social',
        placeholder: 'website or social link',
        type: 'text'
    },
    {
        label: 'Event Name',
        name: 'event',
        placeholder: 'Event Name',
        type: 'text'
    },
    {
        label: 'Event Description',
        name: 'description',
        placeholder: 'description',
        type: 'text'
    },

    {
        label: 'Budget (optional)',
        name: 'budget',
        placeholder: 'Event Budget',
        type: 'text'
    },

]


export default function HeroSection() {
    return (
        <motion.section
            className="relative w-full overflow-hidden h-[420px] sm:h-[480px] md:h-[500px] lg:h-[601.34px]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
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
            <motion.div
                className="absolute inset-0 -z-10 w-full h-full"
                initial={{ opacity: 0, scale: 1.1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
            >
                <Image
                    src="/images/events/image.png"
                    alt="Events Background"
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>
            <motion.div
                className="absolute inset-0 -z-10 w-full h-full"
                initial={{ opacity: 0, scale: 1.1 }}
                whileInView={{ opacity: 0.85, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 1.3, delay: 0.1, ease: "easeOut" }}
            >
                <Image
                    src="/images/events/cover.png"
                    alt="Overlay"
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>
            <motion.div
                className="absolute z-10 w-full sm:max-w-[896px] px-4 sm:px-6 left-0 sm:left-20 right-0 top-20 md:top-40 flex flex-col items-start" // Ensures vertical centering on all screens
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
                <motion.h1
                    className="w-full max-w-2xl font-satoshi font-black text-3xl sm:text-4xl md:text-5xl lg:text-[80px] leading-tight lg:leading-[1.12] tracking-wide lg:tracking-[0.007em] text-white text-center sm:text-left"
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: "backOut" }}
                >
                    Events at IDCL
                </motion.h1>
                <motion.div
                    className="flex items-center mt-2 lg:mt-[15px] border-l-4 border-white pl-4 lg:pl-[25px] max-w-xl"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                >
                    <p className="font-satoshi w-full font-medium text-base sm:text-lg md:text-xl lg:text-[24px] leading-relaxed lg:leading-[1.42] tracking-wide lg:tracking-[0.007em] text-white sm:text-left">
                        Where innovation meets experience—host your event in a space built for the future.
                    </p>
                </motion.div>
                <motion.div
                    className="w-full max-w-xl flex flex-col sm:flex-row gap-4 lg:gap-[24px] mt-6 sm:mt-8 items-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                >
                    <Dialog>
                        <DialogTrigger asChild>
                            <button className="w-full sm:w-auto h-[50px] rounded-[50px] py-3 px-6 bg-white hover:bg-opacity-90 transition-opacity flex items-center justify-center">
                                <span className="font-roboto font-medium text-sm lg:text-[15px] text-[#373737] leading-[100%]">
                                    Submit an Event Request
                                </span>
                            </button>
                        </DialogTrigger>
                        <DialogContent className="bg-white max-h-screen overflow-y-auto w-full max-w-[95vw] lg:max-w-[50vw]">
                            <DialogHeader>
                                <DialogDescription>
                                    <form className="flex flex-col p-4 lg:px-[16px] justify-center items-start gap-8 lg:gap-[32px]">
                                        <h1 className="font-satoshi text-2xl lg:text-[30px] font-bold leading-normal text-[#344054]">
                                            Submit Event Request
                                        </h1>
                                        {ScheduleFormData.map((item, index) => (
                                            <div key={index} className="grid w-full items-center gap-2 lg:gap-1.5">
                                                <Label htmlFor={item.name} className="font-figtree text-base lg:text-[18px] leading-[27px] text-[#344054]">
                                                    {item.label}
                                                </Label>
                                                <Input
                                                    type={item.type}
                                                    id={item.name}
                                                    name={item.name}
                                                    placeholder={item.placeholder}
                                                    className="w-full"
                                                />
                                            </div>
                                        ))}
                                        <div className="flex items-start gap-4 lg:gap-[16px] self-end">
                                            <button type="button" className="flex py-2 lg:py-[10px] px-4 lg:px-[24px] items-center justify-center gap-2 bg-[#F9FAFB] rounded-[50px]">
                                                <span className="font-figtree font-semibold text-base lg:text-[18px] text-[#005DFF] leading-[24px]">
                                                    Cancel
                                                </span>
                                            </button>
                                            <button type="submit" className="flex py-2 lg:py-[10px] px-4 lg:px-[24px] items-center justify-center gap-2 bg-[#005DFF] shadow-sm rounded-[50px]">
                                                <span className="font-figtree font-semibold text-base lg:text-[18px] text-white leading-[24px]">
                                                    Submit
                                                </span>
                                            </button>
                                        </div>
                                    </form>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>

                    <Link className="w-full sm:w-auto h-[50px] rounded-[50px] py-3 px-6 bg-transparent border border-white hover:bg-white hover:bg-opacity-10 transition-colors flex items-center justify-center text-center" href="#">
                        <span className="font-roboto font-medium text-sm lg:text-[15px] text-[#F5F9FF] leading-[100%]">
                            Contact Our Events Team
                        </span>
                    </Link>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}