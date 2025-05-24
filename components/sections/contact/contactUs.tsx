import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Address = [
    {
        image: '/images/contact/icons/call.png',
        data: '+2348033369478'
    },
    {
        image: "/images/contact/icons/mail.png",
        data: 'info@yourdomain.com'
    },
    {
        image: "/images/contact/icons/location.png",
        data: '23 Egbu Road, Owerri, Imo State, Nigeria'
    },
]

export default function ContactUs() {
    return (
        <section className="relative w-full min-h-screen lg:min-h-[1080px] mb-0">
            {/* Background Images - Responsive */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/contact/image.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/contact/cover.png"
                    alt="Overlay"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col gap-6 lg:gap-[30px] items-center justify-center py-12 lg:py-[115px] px-4 sm:px-6">
                {/* Heading Section */}
                <div className="flex w-full lg:w-[810px] flex-col items-center gap-2 lg:gap-[10px]">
                    <h1 className="font-satoshi text-center text-4xl sm:text-5xl lg:text-[50px] font-black leading-tight lg:leading-[56px] tracking-wide lg:tracking-[0.35px] text-white">
                        Contact Us
                    </h1>
                    <p className="font-satoshi text-center text-lg sm:text-xl lg:text-[24px] font-medium leading-relaxed lg:leading-[34px] tracking-normal lg:tracking-[0.168px] text-white">
                        We're here to answer your questions, hear your feedback, or assist with anything you need.
                    </p>
                </div>

                {/* Form Section */}
                <section className="flex flex-col lg:flex-row bg-white w-full max-w-7xl lg:w-[1134px] rounded-lg lg:rounded-[12px] sm:h-auto lg:h-[648px] overflow-hidden">
                    {/* Left Panel - Contact Info */}
                    <div className="w-full lg:w-[491px] relative lg:h-[648px] shrink-0 bg-[#00023D] py-12 lg:py-[80px] px-6 lg:px-[41px] flex flex-col gap-8 lg:gap-[100px] overflow-hidden">
                        <div>
                            <h1 className="text-white font-satoshi text-2xl lg:text-[28px] font-bold leading-normal">
                                Contact Information
                            </h1>
                            <span className="text-[#C9C9C9] font-satoshi text-base lg:text-[18px] font-normal leading-normal">
                                Say something to start a live chat!
                            </span>
                        </div>

                        <div className="w-full lg:w-[337px] flex flex-col items-start gap-6 lg:gap-[30px] px-0 lg:px-[20px]">
                            {Address.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 lg:gap-[15px]">
                                    <Image
                                        src={item.image}
                                        width={24}
                                        height={24}
                                        priority
                                        className="object-cover"
                                        alt="Icon"
                                    />
                                    <p className="text-white font-poppins text-sm lg:text-[16px] font-normal leading-normal">
                                        {item.data}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between lg:inline-flex w-full lg:w-[341px] items-center lg:gap-[45px] z-10">
                            {['facebook', 'twitter', 'instagram', 'youtube', 'tiktok'].map((social) => (
                                <img
                                    key={social}
                                    src={`/images/contact/icons/${social}.png`}
                                    className="object-cover w-8 h-8"
                                    alt={`${social} icon`}
                                />
                            ))}
                        </div>

                        {/* Decorative Elements */}
                        <div className="hidden lg:block absolute w-[297px] left-[315px] top-[465px] h-[295px]">
                            <img
                                src="/images/contact/half.png"
                                alt="Background"
                                className="object-cover z-10"
                            />
                            <img
                                src="/images/contact/circle.png"
                                alt="Background"
                                className="absolute object-cover z-0"
                                style={{
                                    width: '138px',
                                    height: '138px',
                                    top: '-20px',
                                    left: '-50px'
                                }}
                            />
                        </div>
                    </div>

                    {/* Right Panel - Form */}
                    <div className="w-full lg:w-[643px] py-12 lg:py-[80px] px-6 lg:px-[41px] flex flex-col gap-6 lg:gap-[38px]">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-[11px]">
                            <div className="grid w-full items-center gap-1.5 mb-4">
                                <Label htmlFor='fullname' className="font-figtree text-base lg:text-[18px] leading-normal lg:leading-[27px] text-[#344054]">
                                    Your Name
                                </Label>
                                <Input
                                    type='text'
                                    name='fullname'
                                    placeholder='enter your fullname'
                                    className="w-full placeholder:font-figtree"
                                />
                            </div>
                            <div className="grid w-full items-center gap-1.5 mb-4">
                                <Label htmlFor='email' className="font-figtree text-base lg:text-[18px] leading-normal lg:leading-[27px] text-[#344054]">
                                    Your email
                                </Label>
                                <Input
                                    type='text'
                                    name='email'
                                    placeholder='enter your email'
                                    className="w-full placeholder:font-figtree"
                                />
                            </div>
                        </div>

                        <div className="grid w-full items-center gap-1.5 mb-4">
                            <Label htmlFor='message' className="font-figtree text-base lg:text-[18px] leading-normal lg:leading-[27px] text-[#344054]">
                                Message
                            </Label>
                            <Textarea
                                name='message'
                                placeholder='write your message'
                                className="w-full placeholder:font-figtree h-48 lg:h-[267px]"
                            />
                        </div>

                        <button className="flex w-full sm:w-[168px] mx-auto flex-col py-3 lg:py-[12px] px-6 lg:px-[33px] items-center justify-center gap-2 lg:gap-[10px] bg-[#005DFF] rounded-full lg:rounded-[56px]">
                            <span className="font-roboto font-medium text-sm lg:text-[15px] text-white">
                                Send Message
                            </span>
                        </button>
                    </div>
                </section>
            </div>
        </section>
    );
}