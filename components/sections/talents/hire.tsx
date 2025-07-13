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
import { ScheduleFormData } from "./hero";
import { motion } from "framer-motion";

const HiringMethods = [
    "Fill the Employer Request Form",
    "Specify Job Role, Skillset, and Duration",
    "Review Shortlisted Profiles",
    "Schedule Interviews or Request Direct Placement",
];

export default function TalentHire() {
    return (
        <motion.section
            className="mx-auto px-4 py-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                    opacity: 1, y: 0,
                    transition: { duration: 0.8, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.15 }
                }
            }}
        >
            <section className="flex flex-col items-center justify-center gap-[40px] lg:gap-[53px] w-full lg:w-[1201px] mx-auto relative">
                {/* Header */}
                <div className="flex flex-col items-center gap-[14px] lg:gap-[21px] w-full lg:w-[620px] text-center">
                    <h1 className="font-satoshi font-bold text-[24px] lg:text-[32px] leading-[32px] lg:leading-[35px] text-[#3B3B3B]">
                        Looking to hire?
                    </h1>
                    <p className="font-satoshi text-[16px] lg:text-[20px] text-[#000] font-light leading-normal">
                        Submit your talent request in just a few steps
                    </p>
                </div>

                {/* Steps */}
                <div className="w-full flex flex-col items-start self-stretch relative">
                    {HiringMethods.map((item, index, arr) => (
                        <div
                            key={index}
                            className={`border-t py-[20px] lg:py-[25px] border-[#C5C5C5] w-full ${index === arr.length - 1 ? "border-b" : ""
                                }`}
                        >
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-[10px] sm:gap-[20px] lg:gap-[40px]">
                                <h1 className="font-satoshi font-medium text-[28px] lg:text-[38px] text-[#030303B2]">
                                    {`0${index + 1}`}
                                </h1>
                                <p className="font-satoshi font-medium text-[18px] lg:text-[30px] text-[#030303B2]">
                                    {item}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* Background Image */}
                    <Image
                        src="/images/talent/overlay.png"
                        alt="Overlay Graphic"
                        width={348}
                        height={274}
                        className="hidden lg:block object-cover absolute top-[45px] right-[35px]"
                        priority
                    />
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <button className="flex py-[12px] px-[24px] lg:px-[33px] justify-center items-center gap-[10px] rounded-[56px] bg-[#005DFF]">
                            <p className="font-roboto text-[14px] lg:text-[15px] font-medium text-white">
                                Submit a Request Now
                            </p>
                        </button>
                    </DialogTrigger>

                    <DialogContent className="bg-[#fff] max-h-screen overflow-y-auto w-full max-w-[90vw] md:max-w-2xl">
                        <DialogHeader>
                            <DialogTitle className="font-satoshi text-2xl md:text-[30px] font-bold leading-normal text-[#344054]">
                                Submit Talent Request
                            </DialogTitle>
                            <DialogDescription className="overflow-y-auto">
                                <form className="flex flex-col px-4 md:px-[16px] justify-center items-start gap-6 md:gap-[32px] self-stretch py-4">
                                    {ScheduleFormData.map((item, index) => (
                                        <div key={index} className="grid w-full items-center gap-2 md:gap-1.5">
                                            <Label htmlFor={item.name} className="font-figtree text-base md:text-[18px] leading-[1.5] text-[#344054]">
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
                                            ) : (
                                                <Input
                                                    type={item.type}
                                                    id={item.name}
                                                    name={item.name}
                                                    placeholder={item.placeholder}
                                                    className="w-full"
                                                />
                                            )}
                                        </div>
                                    ))}

                                    <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-[16px] self-end w-full sm:w-auto">
                                        <button
                                            type="button"
                                            className="flex py-2 md:py-[10px] px-4 md:px-[24px] items-center justify-center gap-2 bg-[#F9FAFB] rounded-[50px] w-full sm:w-auto"
                                        >
                                            <p className="font-figtree font-semibold text-base md:text-[18px] text-[#005DFF] leading-[24px]">
                                                Cancel
                                            </p>
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex py-2 md:py-[10px] px-4 md:px-[24px] items-center justify-center gap-2 bg-[#005DFF] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] rounded-[50px] w-full sm:w-auto hover:bg-[#004acc] transition-colors"
                                        >
                                            <p className="font-figtree font-semibold text-base md:text-[18px] text-[#fff] leading-[24px]">
                                                Submit
                                            </p>
                                        </button>
                                    </div>
                                </form>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

            </section>
        </motion.section>
    );
}
