"use client"
import { startupService } from "@/services/startup"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { StartupSkeleton } from "@/skeleton/startup"
import ExploreStartup from "./startUp"

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

export default function StartUpRisingStars() {
    const [isLoading, setIsLoading] = useState(true)
    const [startups, setStartups] = useState<StartUpInterface[]>([])

    useEffect(() => {
        const getAllStartups = async () => {
            try {
                const data = await startupService.getAllStartups();
                console.log(data)
                setStartups(data)
            } catch (error: unknown) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        getAllStartups();
    })

    // if (!startups.length) return <p className="text-red-too font-medium">Refresh page to see our startups</p>

    return (
        <section className="bg-[#F5F9FF] w-full min-h-screen flex flex-col items-center justify-center gap-6 sm:gap-8 lg:gap-[34px] py-12 sm:py-16 lg:py-[80px]">
            <p className="w-full text-center text-[#3B3B3B] font-satoshi text-2xl sm:text-3xl lg:text-[32px] font-bold leading-normal lg:leading-[35px] px-4">
                Meet Our Rising Stars
            </p>

            {isLoading ? <StartupSkeleton /> : (
                <div className="w-full px-4 sm:px-6 lg:px-0">
                    <div className="w-full max-w-[1198px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-[33px]">
                        {startups.slice(0, 8).map((startup, index) => (
                            <ExploreStartup key={index} {...startup} />
                        ))}
                    </div>
                </div>
            )}

            {/* Explore Button */}
            <Link
                href='/services/startup/rising'
                className="flex py-2 sm:py-3 lg:py-[12px] px-6 sm:px-8 lg:px-[33px] items-center justify-center gap-2 lg:gap-[10px] rounded-full lg:rounded-[56px] bg-[#005DFF] hover:bg-[#004ACC] transition-colors duration-200"
            >
                <p className="font-roboto font-medium text-sm sm:text-base lg:text-[15px] text-white leading-normal">Explore Our Start-ups</p>
            </Link>
        </section>
    )
}