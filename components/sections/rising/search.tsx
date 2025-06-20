"use client"
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
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { startupService } from "@/services/startup";
import ExploreStartup from "../startup/startUp";
import axios from "axios";

export interface StartUpInterface {
    id: string,
    track: string,
    reach: string,
    logo: string,
    date: string,
    name: string,
    story: string,
    type: string,
    isApproved: boolean,
    industry: string,
    region: string,
}

export default function StarsSearch() {
    const [startups, setStartups] = useState<StartUpInterface[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getAllStarUps = async () => {
            try {
                const data = await startupService.getAllStartups();
                setStartups(data)
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    console.error(error.response?.data?.message || "An error occurred. Retry");
                } else {
                    console.error("An unexpected error occurred");
                }
            } finally {
                setIsLoading(false)
            }
        }

        getAllStarUps();
    }, [])
    return (
        <section className="relative w-full py-[40px] flex flex-col items-center justify-center gap-[54px] px-4 md:px-6">
            {/* Search and Filters */}
            <div className="inline-flex flex-wrap md:flex-nowrap p-[10px] items-start gap-[20px] border border-[#E4E4E4] rounded-[20px]">
                {/* Search */}
                <div className="relative w-full md:w-auto">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search"
                        className="pl-10 rounded-[16px] w-full md:w-[438px]"
                    />
                </div>

                {/* Industry Filter */}
                <div className="flex pt-[4px] pr-[6px] pb-[4px] pl-[25px] items-center gap-[36px] rounded-[20px] border border-[#EFEFEF] w-full md:w-auto">
                    <p className="font-figtree font-bold text-[18px] text-[#344054] leading-[27px]">Industry</p>
                    <Select>
                        <SelectTrigger className="rounded-[16px] flex w-full md:w-[162px] items-center border border-[#E1E5EB] bg-[#FDFDFD] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)]">
                            <SelectValue placeholder="B2B" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="b2b">B2B</SelectItem>
                            <SelectItem value="b2c">B2C</SelectItem>
                            <SelectItem value="saas">SaaS</SelectItem>
                            <SelectItem value="ecommerce">E-commerce</SelectItem>
                            <SelectItem value="fintech">Fintech</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Batch Filter */}
                <div className="flex pt-[4px] pr-[6px] pb-[4px] pl-[25px] items-center gap-[36px] rounded-[20px] border border-[#EFEFEF] w-full md:w-auto">
                    <p className="font-figtree font-bold text-[18px] text-[#344054] leading-[27px]">Batch</p>
                    <Select>
                        <SelectTrigger className="rounded-[16px] flex w-full md:w-[162px] items-center border border-[#E1E5EB] bg-[#FDFDFD] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)]">
                            <SelectValue placeholder="2025" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="b2b">2025</SelectItem>
                            <SelectItem value="b2c">2024</SelectItem>
                            <SelectItem value="saas">2023</SelectItem>
                            <SelectItem value="ecommerce">2022</SelectItem>
                            <SelectItem value="fintech">2021</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Cards */}
            <div className="w-full max-w-[1198px] flex items-start gap-[20px] flex-wrap justify-center md:justify-start">
                <div className="w-full max-w-[1198px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-[33px]">
                    {startups.map((startup, index) => (
                        <ExploreStartup key={index} {...startup} />
                    ))}
                </div>
            </div>
        </section>
    );
}
