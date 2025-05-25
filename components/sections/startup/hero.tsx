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

export default function StartUpHeroSection() {
    return (
        <section className="relative w-full min-h-[618px] mb-0">
            {/* Background Images */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/startup/hero.png"
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
                    Empowering African Startups to Scale with Confidence
                </h1>

                <div className="flex items-center gap-[24px] self-stretch border-l-4 border-[#ffffff] pl-[25px]">
                    <p className="font-satoshi font-medium text-[24px] leading-[34px] tracking-[0.007em] text-[#ffffff] flex-[1_0_0]">
                        Our incubation and acceleration programs are designed to help early-stage ventures secure funding, access mentorship, and reach global markets. Join a growing community of innovators making real impact.
                    </p>
                </div>

                <div className="w-[299px] h-[50px] flex items-center gap-[24px]">
                    <Dialog>
                        <DialogTrigger>
                            <button className="w-[216px] h-[50px] rounded-[50px] py-[16px] px-[22px] bg-[#FFFFFF] no-underline">
                                <p className="w-[172px] font-roboto font-medium text-[15.36px] text-[#373737] leading-[100%] tracking-normal">
                                    Register Your Startup
                                </p>
                            </button>
                        </DialogTrigger>

                        <DialogContent className="bg-[#fff] h-screen overflow-y-auto">
                            <DialogHeader>
                                <DialogDescription className="overflow-y">
                                    <iframe src="https://office.imodigitalcity.com/startups" width="100%" height="600px"></iframe>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>

                    <Link
                        className="w-[218px] h-[50px] rounded-[50px] py-[16px] px-[22px] bg-transparent border border-[#FFFFFF] no-underline"
                        href="#"
                    >
                        <p className="w-[174px] font-roboto font-medium text-[15.36px] text-[#F5F9FF] leading-[100%] tracking-normal">
                            Explore Our Start-ups
                        </p>
                    </Link>
                </div>
            </div>
        </section>
    );
}