"use client"
import { useEffect, useState } from "react"
import { newsService } from "@/services/news";
import { Blogs } from "@/types/news";
import Image from "next/image";
import Link from "next/link";
import NewsSkeleton from "@/skeleton/news";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export default function News() {
    const [isFetching, setIsFetching] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [news, setNews] = useState<Blogs[]>([])
    const [filteredNews, setFilteredNews] = useState<Blogs[]>([])
    const [latest, setLatest] = useState<Blogs | null>(null)

    useEffect(() => {
        const getAllNews = async () => {
            try {
                const data = await newsService.getAllnews(currentPage);
                console.log(data)
                setLatest(data.latest)
                setNews(data.blogs)
                setTotalPages(data.totalPages)
                setFilteredNews(data.blogs)
            } catch (error) {
                console.log(error)
            } finally {
                setIsFetching(false)
            }
        }
        getAllNews();
    }, [currentPage])

    if (isFetching) {
        return <NewsSkeleton />
    }

    return (
        <div className="w-full">
            {filteredNews.length < 1 || latest === null ? (
                <p className="text-md w-1/2 p-6 text-gray-400">No news updated or found. Visit again soon</p>
            ) : (
                <>
                    {/* Featured News Section - Made more responsive */}
                    <Link
                        href={`/news/${latest._id}`}
                        className="w-full max-w-[1199px] px-4 sm:px-6 py-[30px] sm:py-[50px] mx-auto flex flex-col md:flex-row items-center justify-center gap-4 lg:gap-[33px]"
                    >
                        <aside className="w-full space-y-4">
                            <h2 className="border-l-4 px-2 capitalize py-0 border-l-red-500 text-sm sm:text-lg font-medium">latest News</h2>
                            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[456px] overflow-hidden rounded-[10px]">
                                <Image
                                    src={latest?.image!}
                                    alt="latest-news-photo"
                                    fill
                                    className="object-cover rounded-[10px] transition-transform duration-300 ease-in-out hover:scale-105"
                                    priority
                                    quality={100}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                        </aside>
                        <div className="w-full space-y-[24px] px-4 sm:px-0">
                            <div className="flex items-center justify-between w-full text-gray-500">
                                <div className="bg-[#303030] w-[69px] rounded-[5px] flex items-center justify-center text-[14px] gap-[10px]">
                                    <span className="font-satoshi font-black px-[7px] py-[3px] text-sm sm:text-md text-[14px] text-white">
                                        {latest?.time}
                                    </span>
                                </div>
                                <span className="font-satoshi text-[#1E1E1E] text-sm sm:text-md lg:text-[14px] font-bold">
                                    {latest?.createdAt}
                                </span>
                            </div>
                            <p className="font-satoshi text-sm sm:text-md lg:text-[24px] capitalize font-bold line-clamp-2 leading-[25px] overflow-hidden">
                                {latest?.title}
                            </p>
                            <p
                                className="font-satoshi text-[#061A2E] text-sm sm:text-md lg:text-[18px] leading-[27px] font-normal"
                                style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 8,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}
                            >
                                {latest?.body}
                            </p>
                        </div>
                    </Link>

                    {/* News Grid Section */}
                    <main className="space-y-4 bg-[#F2F2F2] w-full">
                        <div className="w-full max-w-[1199px] px-4 sm:px-6 mx-auto py-[30px] sm:py-[50px] space-y-4">
                            <h2 className="border-l-4 px-2 capitalize py-0 border-l-red-500 text-sm sm:text-lg font-medium">More News</h2>
                            <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {news.map((item, i) => (
                                    <Link
                                        href={`/news/${item._id}`}
                                        key={i}
                                        className="w-full p-4 bg-white border rounded-[10px] shadow-lg hover:shadow-gray-500 group hover:shadow-2xl cursor-pointer flex flex-col items-center gap-4 min-h-[480px] sm:min-h-[520px] relative"
                                    >
                                        <div className="relative w-full h-[180px] sm:h-[172px] overflow-hidden rounded-[10px]">
                                            <Image
                                                src={item?.image}
                                                alt="latest-news-photo"
                                                fill
                                                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                                                priority
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </div>
                                        <div className="flex flex-col items-start gap-4 lg:gap-[12px] w-full">
                                            <div className="flex items-center justify-between w-full text-gray-500">
                                                <div className="bg-[#303030] w-[69px] rounded-[5px] flex items-center justify-center text-[14px] gap-[10px]">
                                                    <span className="font-satoshi font-black px-[7px] py-[3px] text-sm sm:text-md text-[14px] text-white">
                                                        {item?.time}
                                                    </span>
                                                </div>
                                                <span className="font-satoshi text-[#1E1E1E] text-sm sm:text-md lg:text-[14px] font-bold">
                                                    {item?.createdAt}
                                                </span>
                                            </div>

                                            <p className="font-satoshi text-sm sm:text-md lg:text-[14px] capitalize font-bold line-clamp-2 w-full">
                                                {item?.title}
                                            </p>

                                            <div className="bg-[#F2F2F2] rounded-[7px] p-[8px] w-full">
                                                <p className="line-clamp-2 sm:line-clamp-3 overflow-hidden text-ellipsis text-[#1E1E1E] font-satoshi text-[12px] font-normal leading-[15px] tracking-[0.24px]">
                                                    {item?.snippet}
                                                </p>
                                            </div>
                                            <article
                                                className="line-clamp-2 sm:line-clamp-3 md:line-clamp-4 font-satoshi text-[#1E1E1E] text-sm sm:text-md lg:text-[14px] leading-normal font-normal w-full"
                                            >
                                                {item?.body}
                                            </article>
                                            <p className="absolute bottom-4 border-l-4 px-2 capitalize py-0 text-[#1E1E1E] border-l-red-500 text-sm md:text-[13px] font-bold leading-[18px]">
                                                {item?.location}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </section>
                        </div>
                    </main>
                    {!isFetching && filteredNews.length > 0 && (
                        <div className="p-4 sm:p-6 border-t">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setCurrentPage(prev => Math.max(prev - 1, 1));
                                            }}
                                            aria-disabled={currentPage === 1}
                                            className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
                                        />
                                    </PaginationItem>

                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                        const page = i + 1;
                                        return (
                                            <PaginationItem key={page}>
                                                <PaginationLink
                                                    href="#"
                                                    isActive={page === currentPage}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setCurrentPage(page);
                                                    }}
                                                    className={`bg-gray-400 rounded-full text-white ${page === currentPage ? 'bg-[#005DFF]' : null}`}
                                                >
                                                    {page}
                                                </PaginationLink>
                                            </PaginationItem>
                                        );
                                    })}

                                    {totalPages > 5 && (
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    )}

                                    <PaginationItem>
                                        <PaginationNext
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setCurrentPage(prev => Math.min(prev + 1, totalPages));
                                            }}
                                            aria-disabled={currentPage === totalPages}
                                            className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}