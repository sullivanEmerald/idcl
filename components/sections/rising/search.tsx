"use client"
import { Search } from "lucide-react";
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
import { StartupSkeleton } from "@/skeleton/startup";
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

const SelectTypes = [
    {
        label: 'all',
        value: 'all'
    },
    {
        label: 'B2B',
        value: 'b2b'
    },
    {
        label: 'B2C',
        value: 'b2c'
    },
    {
        label: 'B2B2C',
        value: 'b2b2c'
    },
    {
        label: 'B2E',
        value: 'b2e'
    },
    {
        label: 'B2G',
        value: 'b2G'
    },
    {
        label: 'C2B',
        value: 'c2b'
    },
    {
        label: 'C2C',
        value: 'c2c'
    },
    {
        label: 'D2C',
        value: 'd2c'
    },
    {
        label: 'G2C',
        value: 'g2c'
    },
    {
        label: 'G2B',
        value: 'g2b'
    },
]

export default function StarsSearch() {
    const [startups, setStartups] = useState<StartUpInterface[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [filteredStartup, setFilteredStartup] = useState<StartUpInterface[]>([])
    const [filters, setFilters] = useState({
        search: '',
        batch: 'all',
        type: 'all'

    })

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



    useEffect(() => {
        let results = [...startups]

        if (filters.search) {
            results = results.filter(startup =>
                startup.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                startup.story.toLowerCase().includes(filters.search.toLowerCase()) ||
                startup.industry.toLowerCase().includes(filters.search.toLowerCase())
            );
        }

        if (filters.type !== 'all') {
            results = results.filter(startup => {
                startup.type.toLowerCase() === filters.type.toLowerCase()
            });
        }

        if (filters.batch !== 'all') {
            results = results.filter(startup => startup.date.toString() === filters.batch);
        }

        setFilteredStartup(results)
    }, [filters, startups])

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
                    <p className="font-figtree font-bold text-[18px] text-[#344054] leading-[27px]">Type</p>
                    <Select value={filters.type} onValueChange={(value) => {
                        setFilters((prev) => ({
                            ...prev,
                            type: value
                        }))
                    }}>
                        <SelectTrigger className="rounded-[16px] flex w-full md:w-[162px] items-center border border-[#E1E5EB] bg-[#FDFDFD] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {SelectTypes.map((item, i) => (
                                <SelectItem key={i} value={item.value}>{item.label}</SelectItem>
                            ))}

                        </SelectContent>
                    </Select>
                </div>

                {/* Batch Filter */}
                <div className="flex pt-[4px] pr-[6px] pb-[4px] pl-[25px] items-center gap-[36px] rounded-[20px] border border-[#EFEFEF] w-full md:w-auto">
                    <p className="font-figtree font-bold text-[18px] text-[#344054] leading-[27px]">Batch</p>
                    <Select value={filters.batch} onValueChange={(value) => {
                        setFilters((prev) => ({
                            ...prev,
                            batch: value
                        }))
                    }} >
                        <SelectTrigger className="rounded-[16px] flex w-full md:w-[162px] items-center border border-[#E1E5EB] bg-[#FDFDFD] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">all</SelectItem>
                            <SelectItem value="2025">2025</SelectItem>
                            <SelectItem value="2024">2024</SelectItem>
                            <SelectItem value="2023">2023</SelectItem>
                            <SelectItem value="2022">2022</SelectItem>
                            <SelectItem value="20221">2021</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Cards */}
            <div className="w-full max-w-[1198px] flex items-start gap-[20px] flex-wrap justify-center md:justify-start">
                {isLoading ? (
                    <StartupSkeleton />
                ) : startups.length === 0 ? (
                    <div className="w-full col-span-full py-12 text-center"> <p className="text-gray-500 max-w-md">
                        There are currently no startups available. Check back later or try a different search.
                    </p>

                    </div>
                ) : (
                    <div className="w-full max-w-[1198px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-[33px]">
                        {startups.map((startup, _) => (
                            <ExploreStartup key={startup.id} {...startup} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
