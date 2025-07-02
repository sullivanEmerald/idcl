"use client";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { FileUploader } from "@/components/ui/file-uploader";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";

interface FormField {
    label: string;
    name: string;
    placeholder: string;
    type: 'text' | 'select' | 'photo' | 'textarea';
    full?: boolean;
    options?: string[]; // optional property
}

// const PersonalInformation: FormField[] = [
//     {
//         label: 'Full Name',
//         name: 'fullname',
//         placeholder: 'Enter your full name',
//         type: 'text'
//     },
//     {
//         label: 'Organisation Name',
//         name: 'company',
//         placeholder: 'organisation name',
//         type: 'text'
//     },
//     {
//         label: 'Phone Number',
//         name: 'phone',
//         placeholder: 'Enter the role you\'re hiring for',
//         type: 'text'
//     },
//     {
//         label: 'Email Address',
//         name: 'email',
//         placeholder: 'email',
//         type: 'text'
//     },
//     {
//         label: 'Positon/Role',
//         name: 'position',
//         placeholder: 'e.g Managing Director',
//         type: 'text'
//     },
// ]

// const PartnershipDetails: FormField[] = [

//     {
//         label: 'Type of Partnership',
//         name: 'type',
//         placeholder: 'Select Partnership Type',
//         type: 'select',
//         options: ['Tech Brand', 'Investor', 'Development', 'Organization']
//     },
//     {
//         label: 'How would your organization contribute to the partnership?',
//         name: 'reason',
//         placeholder: 'organisational contribution',
//         type: 'text'
//     },
//     {
//         label: 'What impact would you like to see from this collaboration?',
//         name: 'expectation',
//         placeholder: 'Collaboration Expectation',
//         type: 'text'
//     },
//     {
//         label: "Any relevant case studies or projects you've worked on that demonstrate your capability? (Please upload any supporting documents or provide links)",
//         name: 'file',
//         type: 'photo',
//         placeholder: 'document',
//     },
//     {
//         label: 'References or Testimonials',
//         name: 'references',
//         placeholder: 'References or Testimonials',
//         type: 'textarea'
//     },
// ];
export default function ApplyPartnershipHeroSection() {
    return (
        <motion.section
            className="relative w-full h-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                    opacity: 1, y: 0,
                    transition: { duration: 0.8, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.15 }
                }
            }}
        >
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/partnership/image.png"
                    alt="Background"
                    width={1440}
                    height={618}
                    className="object-cover"
                    priority
                />
            </div>

            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/partnership/cover.png"
                    alt="Overlay"
                    width={1440}
                    height={618}
                    className="object-cover"
                    priority
                />
            </div>

            {/* Text Content (on top of both images) */}
            <div className="relative z-10 flex flex-col justify-center items-center gap-[50px] py-[80px]">
                <h1 className="font-satoshi text-[32px] sm:text-[40px] md:text-[48px] lg:text-[60px] font-black leading-tight lg:leading-[67px] text-[#fff] text-center">
                    Partnerships Application Form
                </h1>
                <div className="bg-[#fff] w-full max-w-[95vw] sm:max-w-[600px] md:max-w-[700px] lg:w-[834px] rounded-[16px] flex flex-col p-4 sm:p-6 md:p-8 lg:p-[32px] justify-center border border-[#E4E4E4]">
                    <form className="flex flex-col gap-[24px]">
                        <iframe
                            src="https://office.imodigitalcity.com/partner-with-us"
                            title="Partnership Application"
                            width="100%"
                            height="900"
                            className="w-full min-h-[600px] rounded-[12px] border-0"
                            allowFullScreen
                        ></iframe>
                    </form>
                </div>
            </div>
        </motion.section>
    );
}