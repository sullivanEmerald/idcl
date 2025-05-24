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
        <section className="relative w-full h-[400px] md:h-[500px] lg:h-[601.34px] overflow-hidden">
            {/* Background Images */}
            <Image
                src="/images/events/image.png"
                alt="Events Background"
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


            <div className="absolute z-10 w-full px-4 lg:w-[896.51px] lg:left-[100px] 
                top-1/2 lg:top-[175px] transform lg:transform-none -translate-y-1/2 lg:translate-y-0
                flex flex-col gap-4 lg:gap-[15px]">


                <h1 className="w-full lg:w-[896px] font-satoshi font-black text-4xl sm:text-5xl md:text-6xl lg:text-[80px] 
                    leading-tight lg:leading-[1.12] tracking-wide lg:tracking-[0.007em] text-white">
                    Events at IDCL
                </h1>


                <div className="flex items-center mt-2 lg:mt-[15px] border-l-4 border-white pl-4 lg:pl-[25px]">
                    <p className="font-satoshi w-full lg:w-[552px] font-medium text-base sm:text-lg md:text-xl lg:text-[24px] 
                        leading-relaxed lg:leading-[1.42] tracking-wide lg:tracking-[0.007em] text-white">
                        Where innovation meets experience—host your event in a space built for the future.
                    </p>
                </div>


                <div className="w-full lg:w-[458px] h-[50px] flex flex-col sm:flex-row gap-4 lg:gap-[24px] mt-4 lg:mt-0">
                    <Dialog>
                        <DialogTrigger>
                            <button className="w-full sm:w-[216px] h-[50px] rounded-[50px] py-4 lg:py-[16px] px-6 lg:px-[22px] 
                                bg-white hover:bg-opacity-90 transition-opacity">
                                <p className="font-roboto font-medium text-sm lg:text-[15.36px] text-[#373737] leading-[100%]">
                                    Submit an Event Request
                                </p>
                            </button>
                        </DialogTrigger>
                        <DialogContent className="bg-white h-screen overflow-y-auto lg:max-w-[50vw]">
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
                                                <p className="font-figtree font-semibold text-base lg:text-[18px] text-[#005DFF] leading-[24px]">
                                                    Cancel
                                                </p>
                                            </button>
                                            <button type="submit" className="flex py-2 lg:py-[10px] px-4 lg:px-[24px] items-center justify-center gap-2 bg-[#005DFF] shadow-sm rounded-[50px]">
                                                <p className="font-figtree font-semibold text-base lg:text-[18px] text-white leading-[24px]">
                                                    Submit
                                                </p>
                                            </button>
                                        </div>
                                    </form>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>

                    <Link className="w-full sm:w-[218px] h-[50px] rounded-[50px] py-4 lg:py-[16px] px-6 lg:px-[22px] 
                        bg-transparent border border-white hover:bg-white hover:bg-opacity-10 transition-colors flex items-center justify-center"
                        href="#">
                        <p className="font-roboto font-medium text-sm lg:text-[15] text-[#F5F9FF] leading-[100%]">
                            Contact Our Events Team
                        </p>
                    </Link>
                </div>
            </div>
        </section>
    );
}