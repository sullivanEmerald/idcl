import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function StarsSearch() {
    return (
        <section className="relative w-full py-[40px] flex flex-col items-center justify-center gap-[54px]">
            <div className="inline-flex p-[10px] items-start gap-[20px] border border-[#E4E4E4] rounded-[20px]">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search"
                        className="pl-10 rounded-[16px] w-[438px]"
                    />
                </div>
                <div className="flex pt-[4px] pr-[6px] pb-[4px] pl-[25px] items-center gap-[36px] rounded-[20px] border border-[#EFEFEF]">
                    <p className="font-figtree font-bold text-[18px] text-[#344054] leading-[27px]">Industry</p>
                    <Select>
                        <SelectTrigger className="rounded-[16px] flex w-[162px] items-center border border-[#E1E5EB] bg-[#FDFDFD] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)]">
                            <SelectValue placeholder="B2B" />
                        </SelectTrigger>
                        <SelectContent className="">
                            <SelectItem value="b2b">B2B</SelectItem>
                            <SelectItem value="b2c">B2C</SelectItem>
                            <SelectItem value="saas">SaaS</SelectItem>
                            <SelectItem value="ecommerce">E-commerce</SelectItem>
                            <SelectItem value="fintech">Fintech</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex pt-[4px] pr-[6px] pb-[4px] pl-[25px] items-center gap-[36px] rounded-[20px] border border-[#EFEFEF]">
                    <p className="font-figtree font-bold text-[18px] text-[#344054] leading-[27px]">Batch</p>
                    <Select>
                        <SelectTrigger className="rounded-[16px] flex w-[162px] items-center border border-[#E1E5EB] bg-[#FDFDFD] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)]">
                            <SelectValue placeholder="2025" />
                        </SelectTrigger>
                        <SelectContent className="">
                            <SelectItem value="b2b">2025</SelectItem>
                            <SelectItem value="b2c">2024</SelectItem>
                            <SelectItem value="saas">2023</SelectItem>
                            <SelectItem value="ecommerce">2022</SelectItem>
                            <SelectItem value="fintech">2021</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="w-[1198px] flex items-start gap-[33px] flex-wrap">
                {[...Array(12)].map((_, index) => (
                    <div key={index} className="relative border rounded-[12px] bg-[#fff] w-[376px] pt-[37px] pr-[20px] pb-[24px] pl-[20px] flex flex-col items-start gap-[18px]">
                        <div className="flex w-[74px] py-[4px] px-[6px] items-center justify-center gap-[10px] bg-[#1E1E1E] rounded-[8px] absolute right-[20px] top-[20px]">
                            <p className="text-[#F5F9FF] font-satoshi font-bold text-[12px] leading-[16px]">HealthTech</p>
                        </div>
                        <div className="flex items-center gap-[11px] self-stretch w-full">
                            <Image
                                src="/images/startup/startup.png"
                                alt="Background"
                                width={64}
                                height={64}
                                className="object-cover"
                                priority
                            />
                            <p className="font-satoshi font-bold text-[16px] leading-[21px] text-[#475467]">MediBridge</p>
                        </div>
                        <p className="font-satoshi text-[14px] font-medium leading-[18px] font-[#475467] self-stretch">Bridging rural communities to healthcare via mobile clinics.</p>
                        <div className="flex p-[10px] items-center justify-center gap-[10px] self-stretch bg-[#F9F9F9]">
                            <p className="text-[#475467] font-satoshi text-[14px] font-medium leading-[18px] flex-[1_0_0]">
                                Case study on how MediBridge has served 50,000+ patients across 12 underserved regions.
                            </p>
                        </div>
                        <Link href={`/services/startup/rising/${index}`} className="flex py-[12px] px-[33px] item-center justify-center gap-[10px] flex-[1_0_0] rounded-[56px] border border-[#005DFF]">
                            <p className="text-[#005DFF] text-center font-roboto text-[15px] font-medium leading-normal">View Profile</p>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}