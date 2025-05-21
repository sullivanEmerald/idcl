import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
        <section className="relative w-full h-[601.34px] overflow-hidden">
            <Image
                src="/images/events/image.png"
                alt="Background"
                fill
                className="object-cover"
                priority
            />

            <Image
                src="/images/events/cover.png"
                alt="Overlay"
                fill
                className="object-cover"
                priority
            />

            <div className="absolute z-10 w-[896.51px] h-[272px] top-[175px] left-[80px] flex flex-col gap-[15px]">
                <h1 className=" w-[896px] font-satoshi font-black text-[80px] leading-[1.12] tracking-[0.007em] text-[#ffffff]">
                    Events at IDCL
                </h1>
                <div className="flex items-center mt-[15px] border-l-4 border-[#ffffff] pl-[25px]">
                    <p className="font-satoshi w-[552px] font-medium text-[24px] leading-[1.42] tracking-[0.007em] text-[#ffffff]">
                        Where innovation meets experience—host your event in a space built for the future.
                    </p>
                </div>
                <div className="w-[299px] h-[50px] flex items-center gap-[24px]">
                    <Dialog>
                        <DialogTrigger>
                            <button className="w-[216px] h-[50px] rounded-[50px] py-[16px] px-[22px] bg-[#FFFFFF] no-underline">
                                <p className="w-[172px] font-roboto font-medium text-[15.36px] text-[#373737] leading-[100%] tracking-normal">Submit an Event Request</p>
                            </button>
                        </DialogTrigger>
                        <DialogContent className="bg-[#fff] h-screen overflow-y-auto">
                            <DialogHeader>
                                <DialogDescription className="overflow-y">
                                    <form className="flex flex-col padding px-[16px] justify-center items-start gap-[32px] self-stretch">
                                        <h1 className="font-satoshi text-[30px] self-stretch font-bold leading-normal text-[#344054]">Submit Event Request</h1>
                                        {ScheduleFormData.map((item, index) => (
                                            <div key={index} className="grid w-full items-center gap-1.5">
                                                <Label htmlFor={item.name} className="font-figtree text-[18px] leading-[27px] text-[#344054]">{item.label}</Label>
                                                <Input type={item.type} id="email" name={item.name} placeholder={item.placeholder} className='w-full' />
                                            </div>
                                        ))}
                                        <div className="flex items-start gap-[16px] self-end">
                                            <button className="flex py-[10px] px-[24px] items-center justify-center gap-[26] bg-[#F9FAFB] rounded-[50px]">
                                                <p className="font-figtree font-semibold text-[18px] text-[#005DFF] leading-[24px]">Cancel</p>
                                            </button>
                                            <button className="flex py-[10px] px-[24px] items-center justify-center gap-[16px] bg-[#005DFF] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] rounded-[50px]">
                                                <p className="font-figtree font-semibold text-[18px] text-[#fff] leading-[24px]">Submit</p>
                                            </button>
                                        </div>
                                    </form>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <Link className="w-[218px] h-[50px] rounded-[50px] py-[16px] px-[22px] bg-transparent border border-[#FFFFFF] no-underline" href='#'>
                        <p className="w-[174px] font-roboto font-medium text-[15.36px] text-[#F5F9FF] leading-[100%] tracking-normal">Contact Our Events Team</p>
                    </Link>
                </div>
            </div>
        </section>
    );
}