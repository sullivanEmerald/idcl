"use client";
import Image from "next/image";
import PartnershipForm from "./partnershipform";
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

const PersonalInformation: FormField[] = [
    {
        label: 'Full Name',
        name: 'fullname',
        placeholder: 'Enter your full name',
        type: 'text'
    },
    {
        label: 'Organisation Name',
        name: 'company',
        placeholder: 'organisation name',
        type: 'text'
    },
    {
        label: 'Phone Number',
        name: 'phone',
        placeholder: 'Enter the role you\'re hiring for',
        type: 'text'
    },
    {
        label: 'Email Address',
        name: 'email',
        placeholder: 'email',
        type: 'text'
    },
    {
        label: 'Positon/Role',
        name: 'position',
        placeholder: 'e.g Managing Director',
        type: 'text'
    },
]

const PartnershipDetails: FormField[] = [

    {
        label: 'Type of Partnership',
        name: 'type',
        placeholder: 'Select Partnership Type',
        type: 'select',
        options: ['Tech Brand', 'Investor', 'Development', 'Organization']
    },
    {
        label: 'How would your organization contribute to the partnership?',
        name: 'reason',
        placeholder: 'organisational contribution',
        type: 'text'
    },
    {
        label: 'What impact would you like to see from this collaboration?',
        name: 'expectation',
        placeholder: 'Collaboration Expectation',
        type: 'text'
    },
    {
        label: "Any relevant case studies or projects you've worked on that demonstrate your capability? (Please upload any supporting documents or provide links)",
        name: 'file',
        type: 'photo',
        placeholder: 'document',
    },
    {
        label: 'References or Testimonials',
        name: 'references',
        placeholder: 'References or Testimonials',
        type: 'textarea'
    },
];
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
                <h1 className="font-satoshi text-[60px] font-black leading-[67px] text-[#fff]">Partnerships Application Form </h1>
                <div className="bg-[#fff] w-[834px] rounded-[16px] flex flex-col p-[32px] justify-center border border-[#E4E4E4]">
                    <form className="flex flex-col gap-[24px]">
                        <h1 className="font-figtree font-bold text-[21px] text-[#344054] leading-[31px]">Personal Information</h1>
                        <div className="grid grid-cols-2 gap-x-6">
                            {PersonalInformation.map((item, index) => (
                                <div key={index} className="grid w-full items-center gap-1.5 mb-4">
                                    <Label htmlFor={item.name} className="font-figtree text-[18px] leading-[27px] text-[#344054]">
                                        {item.label}
                                    </Label>
                                    <Input
                                        type={item.type}
                                        id={item.name}
                                        name={item.name}
                                        placeholder={item.placeholder}
                                        className="w-full placeholder:font-figtree "
                                    />
                                </div>
                            ))}
                        </div>
                        <h1 className="font-figtree font-bold text-[21px] text-[#344054] leading-[31px]">Partnership Details</h1>
                        <div>
                            {PartnershipDetails.map((item, index) => (
                                <div key={index} className="grid w-full items-center gap-1.5 mb-4">
                                    <Label htmlFor={item.name} className="font-figtree text-[18px] leading-[27px] text-[#344054]">
                                        {item.label}
                                    </Label>

                                    {item.type === 'select' ? (
                                        <Select>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder={item.placeholder} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {item.options?.map((option, i) => (
                                                    <SelectItem key={i} value={option.toLowerCase().replace(' ', '-')}>
                                                        {option}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    ) : item.type === 'photo' ? (
                                        <FileUploader
                                            accept=".pdf"
                                            maxSize={5 * 1024 * 1024}
                                            onDrop={(files) => {
                                                const file = files[0];
                                                if (file) {
                                                    // Set the mediaFiles for UI preview
                                                    console.log(file)
                                                }
                                            }}
                                        />
                                    ) : item.type === 'textarea' ? (
                                        <Textarea
                                            id={item.name}
                                            name={item.name}
                                            placeholder={item.placeholder}
                                            className="w-full min-h-[120px]"
                                        />
                                    ) : (
                                        <Input
                                            type={item.type}
                                            id={item.name}
                                            name={item.name}
                                            placeholder={item.placeholder}
                                            className="w-full placeholder:font-figtree "
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </form>
                </div>
            </div>
        </motion.section>
    );
}