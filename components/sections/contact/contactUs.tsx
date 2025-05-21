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
        <section className="relative w-full min-h-[1080px] mb-0">
            {/* Background Images */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/contact/image.png"
                    alt="Background"
                    width={1440}
                    height={1080}
                    className="object-cover"
                    priority
                />
            </div>

            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/contact/cover.png"
                    alt="Overlay"
                    width={1440}
                    height={1080}
                    className="object-cover"
                    priority
                />
            </div>

            {/* Text Content (on top of both images) */}
            <div className="relative z-10 flex flex-col gap-[30px] items-center justify-center py-[115px]">
                <div className="flex w-[810px] flex-col items-center gap-[10px] shrink-0">
                    <h1 className="font-satoshi text-center text-[50px] self-stretch font-black leading-[56px] tracking-[0.35px] text-[#fff]">Contact Us</h1>
                    <p className="font-satoshi text-center text-[24px] self-stretch font-medium leading-[34px] tracking-[0.168px] text-[#fff]" >We're here to answer your questions, hear your feedback, or assist with anything you need.</p>
                </div>
                <section className="flex bg-[#fff] w-[1134px] rounded-[12px]">
                    <div className="w-[491px] relative h-[648px] shrink-0 bg-[#00023D] py-[80px] px-[41px] flex flex-col gap-[100px] overflow-hidden">
                        <div>
                            <h1 className="text-[#fff] font-satoshi text-[28px] font-bold leading-normal self-stretch">Contact Information</h1>
                            <span className="text-[#C9C9C9] font-satoshi text-[18px] font-normal leading-normal">Say something to start a live chat!</span>
                        </div>
                        <div className="w-[337px] flex flex-col items-start gap-[30px] px-[20px]">
                            {Address.map((item, index) => (
                                <div key={index} className="flex items-center gap-[15px] shrink-0">
                                    <Image
                                        src={item.image}
                                        width={24}
                                        height={24}
                                        priority
                                        className="object-cover"
                                        alt="Icon"
                                    />
                                    <p className="text-[#fff] font-poppins text-[16px] font-normal leading-normal">{item.data}</p>
                                </div>
                            ))}
                        </div>
                        <div className="inline-flex w-[341px] items-center gap-[55px] z-10">
                            <img
                                src="/images/contact/icons/facebook.png"
                                className="object-cover"
                                alt="Icon"
                            />
                            <img
                                src="/images/contact/icons/twitter.png"
                                className="object-cover"
                                alt="Icon"
                            />
                            <img
                                src="/images/contact/icons/instagram.png"
                                className="object-cover"
                                alt="Icon"
                            />
                            <img
                                src="/images/contact/icons/youtube.png"
                                className="object-cover"
                                alt="Icon"
                            />
                            <img
                                src="/images/contact/icons/tiktok.png"
                                className="object-cover"
                                alt="Icon"
                            />
                        </div>
                        <div className="absolute w-[297px] left-[315px] top-[465px] h-[295px]">
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
                    <div className="h-[648px] w-[643px] py-[80px] px-[41px] flex flex-col gap-[38px]">
                        <div className="grid grid-cols-2 gap-[11px]">
                            <div className="grid w-full items-center gap-1.5 mb-4">
                                <Label htmlFor='fullname' className="font-figtree text-[18px] leading-[27px] text-[#344054]">
                                    Your Name
                                </Label>
                                <Input
                                    type='text'
                                    name='fullname'
                                    placeholder='enter your fullname'
                                    className="w-full placeholder:font-figtree "
                                />
                            </div>
                            <div className="grid w-full items-center gap-1.5 mb-4">
                                <Label htmlFor='email' className="font-figtree text-[18px] leading-[27px] text-[#344054]">
                                    Your email
                                </Label>
                                <Input
                                    type='text'
                                    name='email'
                                    placeholder='enter your email'
                                    className="w-full placeholder:font-figtree "
                                />
                            </div>
                        </div>
                        <div className="grid w-full items-center gap-1.5 mb-4">
                            <Label htmlFor='message' className="font-figtree text-[18px] leading-[27px] text-[#344054]">
                                Message
                            </Label>
                            <Textarea
                                name='fullname'
                                placeholder='write your message'
                                className="w-full placeholder:font-figtree h-[267px]"
                            />
                        </div>

                        <button className="flex w-[168px] mx-auto flex-col py-[12px] px-[33px] items-center justify-center gap-[10px] bg-[#005DFF] rounded-[56px]">
                            <span className="font-roboto font-medium text-[15px] text-[#fff]">Send Message</span>
                        </button>
                    </div>
                </section>
            </div>
        </section>
    );
}