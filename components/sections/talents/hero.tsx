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

export default function TalentHero() {
    return (
        <section className="relative w-full min-h-[618px] mb-0">
            {/* Background Images */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/talent/image.png"
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
            <div className="relative z-10 w-[896px] top-[80px] left-[120px] flex flex-col gap-[15px]">
                <h1 className="font-satoshi font-black text-[80px] leading-[89px] w-[896px] tracking-[0.007em] text-[#ffffff]">
                    Hire Certified Tech Talent from Across Africa—Fast.
                </h1>

                <div className="flex items-center gap-[24px] self-stretch border-l-4 border-[#ffffff] pl-[25px]">
                    <p className="font-satoshi font-medium text-[24px] leading-[34px] tracking-[0.007em] text-[#ffffff] flex-[1_0_0]">
                        We produce top-tier, job-ready professionals ready to work on your most pressing digital needs. Tell us what you need—we'll match you with certified, reliable talent, quickly and efficiently.
                    </p>
                </div>

                <div className="w-[299px] h-[50px] flex items-center gap-[24px]">
                    <Dialog>
                        <DialogTrigger>
                            <button className="w-[216px] h-[50px] rounded-[50px] py-[16px] px-[22px] bg-[#FFFFFF] no-underline">
                                <p className="w-[172px] font-roboto font-medium text-[15.36px] text-[#373737] leading-[100%] tracking-normal">
                                    Submit Talent Request
                                </p>
                            </button>
                        </DialogTrigger>

                        <DialogContent className="bg-[#fff] h-screen overflow-y-auto">
                            <DialogHeader>
                                <DialogDescription className="overflow-y">
                                    <form className="flex flex-col px-[16px] justify-center items-start gap-[32px] self-stretch">
                                        <h1 className="font-satoshi text-[30px] self-stretch font-bold leading-normal text-[#344054]">
                                            Submit Talent Request
                                        </h1>

                                        {ScheduleFormData.map((item, index) => (
                                            <div key={index} className="grid w-full items-center gap-1.5">
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

                                        <div className="flex items-start gap-[16px] self-end">
                                            <button
                                                type="button"
                                                className="flex py-[10px] px-[24px] items-center justify-center gap-[26] bg-[#F9FAFB] rounded-[50px]"
                                            >
                                                <p className="font-figtree font-semibold text-[18px] text-[#005DFF] leading-[24px]">
                                                    Cancel
                                                </p>
                                            </button>
                                            <button
                                                type="submit"
                                                className="flex py-[10px] px-[24px] items-center justify-center gap-[16px] bg-[#005DFF] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] rounded-[50px]"
                                            >
                                                <p className="font-figtree font-semibold text-[18px] text-[#fff] leading-[24px]">
                                                    Submit
                                                </p>
                                            </button>
                                        </div>
                                    </form>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>

                    <Link
                        className="w-[218px] h-[50px] rounded-[50px] py-[16px] px-[22px] bg-transparent border border-[#FFFFFF] no-underline"
                        href="#"
                    >
                        <p className="w-[174px] font-roboto font-medium text-[15.36px] text-[#F5F9FF] leading-[100%] tracking-normal">
                            Browse Talent Pool
                        </p>
                    </Link>
                </div>
            </div>
        </section>
    );
}