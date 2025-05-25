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
import EventDisplay from "@/components/general/event";
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
export default function UpcomingEventSection() {
    return (
        <section className="w-full bg-[#144DAF] mb-[50px] py-8 sm:py-10 md:py-[81px] px-4 sm:px-6 lg:px-8 xl:px-[121px]">
            <main className="w-full max-w-[1198px] mx-auto flex flex-col gap-6 sm:gap-8 md:gap-[50px]">
                {/* Header and Filter Section */}
                <section className="flex flex-col items-start gap-6 sm:gap-8 md:gap-[35px] w-full">
                    <h2 className="font-satoshi font-bold text-xl sm:text-2xl md:text-[32px] leading-[1.1] text-white">
                        Upcoming Events
                    </h2>

                    <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
                        <aside className="w-full flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-[50px]">
                            {/* Search Input - Responsive Width */}
                            <div className="relative w-full sm:w-auto sm:flex-1 max-w-[789px]">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search"
                                    className="pl-10 rounded-[16px] w-full bg-white"
                                />
                            </div>

                            {/* Filter Section - Responsive Layout */}
                            <div className="w-full sm:w-auto sm:flex-[0_0_auto] md:w-[359px] h-[44px] sm:h-[52px] rounded-[20px] border-2 border-[#144DAF] p-1 bg-white flex items-center">
                                <p className="font-figtree font-bold text-xs sm:text-sm md:text-[18px] leading-[1.5] text-[#344054] ml-2 mr-2 sm:mr-3 whitespace-nowrap">
                                    Category
                                </p>

                                <div className="flex-1 min-w-0">
                                    <Select>
                                        <SelectTrigger
                                            className="w-full h-[36px] sm:h-[44px] rounded-[16px] border border-[#D0D5DD] bg-[#E1ECFF] flex items-center justify-between px-3 focus:ring-0 focus:ring-offset-0 data-[state=open]:bg-[#E1ECFF]"
                                        >
                                            <SelectValue
                                                placeholder={
                                                    <span className="font-figtree font-medium text-xs sm:text-sm md:text-[16px] leading-[1.5] truncate">
                                                        Start-up Showcase
                                                    </span>
                                                }
                                            />
                                        </SelectTrigger>
                                        <SelectContent
                                            className="rounded-[16px] border border-[#D0D5DD] bg-[#E1ECFF] w-[var(--radix-select-trigger-width)] min-w-[120px]"
                                            position="popper"
                                            align="end"
                                        >
                                            <SelectItem
                                                value="light"
                                                className="font-figtree font-medium text-xs sm:text-sm md:text-[16px] focus:bg-[#D0D5DD]"
                                            >
                                                Expired
                                            </SelectItem>
                                            <SelectItem
                                                value="dark"
                                                className="font-figtree font-medium text-xs sm:text-sm md:text-[16px] focus:bg-[#D0D5DD]"
                                            >
                                                Upcoming
                                            </SelectItem>
                                            <SelectItem
                                                value="system"
                                                className="font-figtree font-medium text-xs sm:text-sm md:text-[16px] focus:bg-[#D0D5DD]"
                                            >
                                                Scheduled
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </aside>
                    </div>
                </section>

                {/* Events Grid - Responsive Columns */}
                <section className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-[29px] w-full">
                    {EventsData.map((item, index) => (
                        <EventDisplay key={index} {...item} />
                    ))}
                </section>

                {/* Optional: View More Button for Mobile */}
                <div className="md:hidden flex justify-center mt-4">
                    <Button className="bg-white text-[#144DAF] hover:bg-gray-100 rounded-lg">
                        View More Events
                    </Button>
                </div>
            </main>
        </section>
    )
}