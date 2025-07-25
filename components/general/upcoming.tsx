"use client"
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import EventDisplay from "./event";
import Link from "next/link";
import { EventItem } from "@/types/event";
import { eventsService } from "@/services/event";
const eventCategories = [
    "All",
    "Conference",
    "Workshop",
    "Webinar",
    "Meetup",
    "Seminar",
    "Hackathon",
    "Networking",
    "Panel Discussion",
    "Expo"
];

export default function UpcomingEventCom() {
    const [events, setEvents] = useState<EventItem[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState('All');
    const [totalPages, setTotalPages] = useState(0);
    const [totalEvents, setTotalEvents] = useState(0);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const upcomingEvents = async () => {
            try {
                const response = await eventsService.getUpcomingEvents(currentPage, 8);
                console.log(response)
                setEvents(response.data || []);
                setTotalPages(response.totalPages);
                setTotalEvents(response.totalEvents);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setIsFetching(false);
            }
        }

        upcomingEvents();

    }, [currentPage])

    const filteredEvents = events.filter(event => {

        const matchesCategory = category === "All" ? true : event.category === category;

        return matchesCategory;
    });

    if (isFetching) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <p className="text-gray-500 text-lg font-semibold">Loading events...</p>
            </div>
        );
    }


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
                            <Select value={category} onValueChange={(value) => setCategory(value)}>
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
                                    {eventCategories.map((option, idx) => (
                                        <SelectItem
                                            key={idx}
                                            value={option}
                                            className="font-inter font-medium text-xs md:text-[15px] focus:bg-[#D0D5DD]"
                                        >
                                            {option}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                {/* Events Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-[39px]">
                    {filteredEvents.length === 0 ? (
                        <div className="col-span-full flex flex-col items-center justify-center py-16">
                            <p className="text-gray-500 text-lg font-semibold">No events found.</p>
                        </div>
                    ) : (
                        filteredEvents.map((event, index) => (
                            <div key={index} className="w-full max-w-[362px] mx-auto">
                                <EventDisplay
                                    image={event.image}
                                    name={event.name}
                                    description={event.description}
                                    tagline={event.tagline}
                                    category={event.category}
                                    day={new Date(event.startDate).getDate().toString()}
                                    month={new Date(event.startDate).toLocaleString('default', { month: 'long' })}
                                    time={new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                />
                            </div>
                        ))
                    )}
                </div>

                <Link
                    href='/event/upcoming'
                    className="w-full md:w-[152px] mx-auto flex py-[12px] px-[33px] items-center justify-center gap-[10px] rounded-[56px] bg-[#fff] transition-colors duration-200 hover:bg-[#005DFF] group"
                >
                    <p className="text-[#000] font-roboto text-[15px] font-medium leading-normal group-hover:text-white transition-colors duration-200">
                        More Events
                    </p>
                </Link>
            </main>

        </section>
    )
}