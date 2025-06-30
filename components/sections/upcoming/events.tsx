"use client"
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import EventDisplay from "@/components/general/event";
import { eventsService } from "@/services/event";
import { EventItem } from "@/types/event";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from "@/components/ui/pagination";



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


export default function UpcomingEventSection() {
    const [events, setEvents] = useState<EventItem[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('All');
    const [totalPages, setTotalPages] = useState(0);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        const upcomingEvents = async () => {
            setIsFetching(true);
            try {
                const response = await eventsService.getAllUpcomingEvent(currentPage, 15);
                setEvents(response.data || []);
                setCurrentPage(response.page);
                setTotalPages(response.totalPages);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setIsFetching(false);
            }
        };

        upcomingEvents();
    }, [currentPage]);

    const filteredEvents = events.filter(event => {

        const matchesSearch =
            event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = category === "All" ? true : event.category === category;

        return matchesSearch && matchesCategory;
    });

    // Helper for pagination range
    const getPageNumbers = () => {
        const pages = [];
        const maxShown = 3;
        let start = Math.max(1, currentPage - 1);
        let end = Math.min(totalPages, start + maxShown - 1);
        if (end - start < maxShown - 1) {
            start = Math.max(1, end - maxShown + 1);
        }
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <section className="w-full bg-[#144DAF] mb-[50px] py-8 sm:py-10 md:py-[81px] px-4 sm:px-6 lg:px-8 xl:px-[121px]">
            <main className="w-full max-w-[1198px] mx-auto flex flex-col gap-6 sm:gap-8 md:gap-[50px]">
                <section className="flex flex-col items-start gap-6 sm:gap-8 md:gap-[35px] w-full">
                    <h2 className="font-satoshi font-bold text-xl sm:text-2xl md:text-[32px] leading-[1.1] text-white">
                        Upcoming Events
                    </h2>

                    <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
                        <aside className="w-full flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-[50px]">

                            <div className="relative w-full sm:w-auto sm:flex-1 max-w-[789px]">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search"
                                    className="pl-10 rounded-[16px] w-full bg-white"
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    value={searchQuery}
                                />
                            </div>

                            <div className="w-full sm:w-auto sm:flex-[0_0_auto] md:w-[359px] h-[44px] sm:h-[52px] rounded-[20px] border-2 border-[#144DAF] p-1 bg-white flex items-center">
                                <p className="font-figtree font-bold text-xs sm:text-sm md:text-[18px] leading-[1.5] text-[#344054] ml-2 mr-2 sm:mr-3 whitespace-nowrap">
                                    Category
                                </p>

                                <div className="flex-1 min-w-0">
                                    <Select value={category} onValueChange={setCategory}>
                                        <SelectTrigger
                                            className="w-full h-[36px] sm:h-[44px] rounded-[16px] border border-[#D0D5DD] bg-[#E1ECFF] flex items-center justify-between px-3 focus:ring-0 focus:ring-offset-0 data-[state=open]:bg-[#E1ECFF]"
                                        >
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent
                                            className="rounded-[16px] border border-[#D0D5DD] bg-[#E1ECFF] w-[var(--radix-select-trigger-width)] min-w-[120px]"
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
                        </aside>
                    </div>
                </section>

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

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-8">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={e => {
                                            e.preventDefault();
                                            if (currentPage > 1) setCurrentPage(currentPage - 1);
                                        }}
                                        aria-disabled={currentPage === 1}
                                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                                    />
                                </PaginationItem>
                                {getPageNumbers().map((page) => (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            href="#"
                                            isActive={page === currentPage}
                                            onClick={e => {
                                                e.preventDefault();
                                                setCurrentPage(page);
                                            }}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                {totalPages > 3 && getPageNumbers().at(-1)! < totalPages && (
                                    <>
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink
                                                href="#"
                                                onClick={e => {
                                                    e.preventDefault();
                                                    setCurrentPage(totalPages);
                                                }}
                                            >
                                                {totalPages}
                                            </PaginationLink>
                                        </PaginationItem>
                                    </>
                                )}
                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={e => {
                                            e.preventDefault();
                                            if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                                        }}
                                        aria-disabled={currentPage === totalPages}
                                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}

                {/*  View More Button for Mobile for optimization */}
                <div className="md:hidden flex justify-center mt-4">
                    <Button className="bg-white text-[#144DAF] hover:bg-gray-100 rounded-lg">
                        View More Events
                    </Button>
                </div>
            </main>
        </section>
    );
}