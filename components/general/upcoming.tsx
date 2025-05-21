"use client"
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"



type EventItem = {
    image: string;
    alt: string;
    header: string;
    text: string;
    body: string;
    day: number;
    month: string;
    time: string;
};


export default function UpcomingEventCom({ EventsData }: { EventsData: EventItem[] }) {

    const [eventFilter, setEventFilter] = useState('all');

    return (
        <>
            <section className="w-full flex flex-col items-center justify-center py-[80px] px-[80px] gap-[10px] bg-[#144DAF] mb-[50px]">
                <div className="flex flex-col items-center justify-center gap-[29px] self-stretch w-[1198px]">
                    <div className="w-[1198px] flex flex-col gap-[35px]">
                        <p className="w-[261px] font-satoshi font-bold text-[32px] leading-[1.1] tracking-normal text-[#FFFFFF]">
                            Upcoming Events
                        </p>
                        <section className="flex items-center justify-between">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search"
                                    className="pl-10 rounded-[16px] w-[789px] bg-[#ffff]"
                                />
                            </div>
                            <div className="relative w-[359px] h-[52px] rounded-[20px] border border-[#144DAF] py-[4px] px-[15px] bg-[#FFFFFF] flex items-center">
                                <p className="font-figtree font-bold text-[18px] tracking-normal leading-[1.5] text-[#344054]">
                                    Category
                                </p>

                                <Select>
                                    <SelectTrigger className="w-[213px] h-[44px] absolute right-[5px] top-[4px] rounded-[16px] border border-[#D0D5DD] bg-[#E1ECFF] flex items-center justify-between px-[12px] data-[state=open]:bg-[#E1ECFF] focus:ring-0 focus:ring-offset-0">
                                        <SelectValue
                                            placeholder={
                                                <span className="w-[139px] font-figtree font-medium text-[16px] leading-[1.5] tracking-normal">
                                                    Start-up Showcase
                                                </span>
                                            }
                                        />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-[16px] border border-[#D0D5DD] bg-[#E1ECFF] w-[213px]">
                                        <SelectItem
                                            value="light"
                                            className="font-figtree font-medium text-[16px] focus:bg-[#D0D5DD]"
                                        >
                                            Expired
                                        </SelectItem>
                                        <SelectItem
                                            value="dark"
                                            className="font-figtree font-medium text-[16px] focus:bg-[#D0D5DD]"
                                        >
                                            Upcoming
                                        </SelectItem>
                                        <SelectItem
                                            value="system"
                                            className="font-figtree font-medium text-[16px] focus:bg-[#D0D5DD]"
                                        >
                                            Scheduled
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </section>
                    </div>
                    <section className="flex flex-wrap self-stretch gap-[47px] w-[1198px]" >
                        {EventsData.map((item, index) => (
                            <div key={index} className='self-stretch'>
                                <img src={item.image} alt={item.alt} className="block" />
                                <div className="rounded-br-[18px] rounded-bl-[18px] border-r border-b border-l py-[14px] px-[21px] bg-[#FFFFFF] border-[#CACACA] flex flex-col gap-[8px] ">
                                    <h2 className="w-[298px] font-satoshi font-bold text-[16px] leading-normal tracking-normal">Imo State Innovation & Investment Forum 2025</h2>
                                    <div className="w-[143px] h-[21px] rounded-[15px] border border-[#000000] px-[10px] bg-[#000000]">
                                        <p className="w-[123px] font-satoshi font-bold text-[14px] leading-normal tracking-normal text-[#FFFFFF]">Start-up Showcase</p>
                                    </div>
                                    <span className="inline-block w-[298px] font-satoshi font-normal text-[14px] leading-normal tracking-normal text-[#6A6A6A]">
                                        Uniting visionaries, investors, and innovators to drive digital transformation, youth empowerment, and sustainable growth in Imo State.
                                    </span>
                                    <div className="w-[298px] h-[38px] flex items-center justify-between">
                                        <div className="w-[72px] h-[38px] flex items-center gap-[10px]">
                                            <p className="w-[30px] font-satoshi font-bold text-[28px] leading-none tracking-normal text-[#000000]">{item.day}</p>
                                            <p className="w-[32px] font-satoshi font-bold text-[16px] text-[#0000FF] leading-none tracking-normal">{item.month}</p>
                                        </div>
                                        <p className="w-[66px] font-satoshi font-bold text-[16px] leading-none tracking-normal text-[#7C7C7C]">{item.time}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>
                </div>
            </section>
        </>
    )
}
