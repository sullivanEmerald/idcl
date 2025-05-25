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
import Image from "next/image";
import EventDisplay from "./event";
import Link from "next/link";

export const EventsData = [
    {
        image: '/images/events/background.png',
        alt: 'Events',
        header: 'Imo State Innovation & Investment Forum 2025',
        text: 'Start-up Showcase',
        body: 'Uniting visionaries, investors, and innovators to drive digital transformation, youth empowerment, and sustainable growth in Imo State.',
        day: 14,
        month: 'APR',
        time: '2:00 Pm'
    },
    {
        image: '/images/events/background.png',
        alt: 'Events',
        header: 'Imo State Innovation & Investment Forum 2025',
        text: 'Start-up Showcase',
        body: 'Uniting visionaries, investors, and innovators to drive digital transformation, youth empowerment, and sustainable growth in Imo State.',
        day: 14,
        month: 'APR',
        time: '2:00 Pm'
    },
    {
        image: '/images/events/background.png',
        alt: 'Events',
        header: 'Imo State Innovation & Investment Forum 2025',
        text: 'Start-up Showcase',
        body: 'Uniting visionaries, investors, and innovators to drive digital transformation, youth empowerment, and sustainable growth in Imo State.',
        day: 14,
        month: 'APR',
        time: '2:00 Pm'
    },
    {
        image: '/images/events/background.png',
        alt: 'Events',
        header: 'Imo State Innovation & Investment Forum 2025',
        text: 'Start-up Showcase',
        body: 'Uniting visionaries, investors, and innovators to drive digital transformation, youth empowerment, and sustainable growth in Imo State.',
        day: 14,
        month: 'APR',
        time: '2:00 Pm'
    },
    {
        image: '/images/events/background.png',
        alt: 'Events',
        header: 'Imo State Innovation & Investment Forum 2025',
        text: 'Start-up Showcase',
        body: 'Uniting visionaries, investors, and innovators to drive digital transformation, youth empowerment, and sustainable growth in Imo State.',
        day: 14,
        month: 'APR',
        time: '2:00 Pm'
    },
    {
        image: '/images/events/background.png',
        alt: 'Events',
        header: 'Imo State Innovation & Investment Forum 2025',
        text: 'Start-up Showcase',
        body: 'Uniting visionaries, investors, and innovators to drive digital transformation, youth empowerment, and sustainable growth in Imo State.',
        day: 14,
        month: 'APR',
        time: '2:00 Pm'
    },
]
export default function UpcomingEventCom() {
    return (
        <section className="w-full bg-[#144DAF] py-10 md:py-[81px] px-4 sm:px-6 lg:px-[121px]">
            <main className="w-full max-w-[1198px] mx-auto flex flex-col gap-8 md:gap-[50px]">
                {/* Header and Filter Section */}
                <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    {/* Title */}
                    <h2 className="font-satoshi font-bold text-2xl md:text-[32px] leading-[1.1] text-white">
                        Upcoming Events
                    </h2>

                    {/* Filter Section - Improved Mobile Layout */}
                    <div className="w-full md:w-[359px] h-[52px] rounded-[20px] border-2 border-[#144DAF] p-1 bg-white flex items-center relative">
                        {/* Category Label - Better Mobile Spacing */}
                        <p className="font-figtree font-bold text-sm md:text-[18px] leading-[1.5] text-[#344054] ml-2 mr-3 whitespace-nowrap">
                            Category
                        </p>

                        {/* Select Component - Enhanced Mobile Behavior */}
                        <div className="flex-1 min-w-0"> {/* Ensures select doesn't overflow */}
                            <Select>
                                <SelectTrigger
                                    className="w-full h-[44px] rounded-[16px] border border-[#D0D5DD] bg-[#E1ECFF] 
                    flex items-center justify-between px-3 focus:ring-0 focus:ring-offset-0
                    data-[state=open]:bg-[#E1ECFF]"
                                >
                                    <SelectValue
                                        placeholder={
                                            <span className="font-figtree font-medium text-sm md:text-[16px] leading-[1.5] truncate">
                                                Start-up Showcase
                                            </span>
                                        }
                                    />
                                </SelectTrigger>
                                <SelectContent
                                    className="rounded-[16px] border border-[#D0D5DD] bg-[#E1ECFF] w-[calc(100vw-32px)] md:w-[213px]"
                                    position="popper"
                                    align="end"
                                >
                                    <SelectItem
                                        value="light"
                                        className="font-figtree font-medium text-sm md:text-[16px] focus:bg-[#D0D5DD]"
                                    >
                                        Expired
                                    </SelectItem>
                                    <SelectItem
                                        value="dark"
                                        className="font-figtree font-medium text-sm md:text-[16px] focus:bg-[#D0D5DD]"
                                    >
                                        Upcoming
                                    </SelectItem>
                                    <SelectItem
                                        value="system"
                                        className="font-figtree font-medium text-sm md:text-[16px] focus:bg-[#D0D5DD]"
                                    >
                                        Scheduled
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                {/* Events Grid */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-[29px] w-full">
                    {EventsData.map((item, index) => (
                        <EventDisplay key={index} {...item} />
                    ))}
                </section>

                <Link href='/services/event/upcoming' className="w-full md:w-[152px]  mx-auto flex py-[12px] px-[33px] items-center justify-center gap-[10px] rounded-[56px] bg-[#fff]">
                    <p className="text-[#000] font-roboto text-[15px] font-medium leading-normal">More Events</p>
                </Link>
            </main>

        </section>
    )
}