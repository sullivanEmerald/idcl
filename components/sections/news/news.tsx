"use client"
import { useEffect, useState } from "react"
import { newsService } from "@/services/news";
import { Blogs } from "@/types/news";
import Image from "next/image";
import Link from "next/link";
import NewsSkeleton from "@/skeleton/news";

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
                setFilteredNews(data.blogs)
            } catch (error) {
                console.log(error)
            } finally {
                setIsFetching(false)
            }
        }
        getAllNews();
    }, [])

    if (isFetching) {
        return <NewsSkeleton />
    }

    return (
        <div className="w-full">
            {news.length < 1 || latest === null ? (
                <p className="text-md text-gray-400">No news updated or found. Visit again soon</p>
            ) : (
                <>
                    <div className="w-full sm:w-[1199px] py-[50px] mx-auto flex flex-col md:flex-row items-center justify-center gap-4 lg:gap-[33px]">
                        <aside className="space-y-4">
                            <h2 className="border-l-4 px-2 capitalize py-0 border-l-red-500 text-sm sm:text-lg font-medium">latest News</h2>
                            <div className="relative w-full sm:w-[611px] h-[456px] overflow-hidden rounded-[10px] ">
                                <Image
                                    src={latest?.image!}
                                    alt="latest-news-photo"
                                    fill
                                    className="object-cover rounded-[10px] transition-transform duration-300 ease-in-out hover:scale-105"
                                    priority
                                    quality={100}
                                    sizes="100vw"
                                />
                            </div>
                        </aside>
                        <div className="space-y-[24px]">
                            <div className="flex items-center justify-between w-full text-gray-500">
                                <p className="bg-[#303030] w-[69px] rounded-[5px] flex items-center justify-center text-[14px] gap-[10p]">
                                    <p className="font-satoshi font-black px-[7px] py-[3px] text-sm sm:text-md text-[14px] text-white">
                                        {latest?.time}
                                    </p>
                                </p>
                                <span className="font-satoshi text-[#1E1E1E] text-sm sm:text-md lg-[14px] font-bold">{latest?.createdAt}</span>
                            </div>
                            <p className="font-satoshi text-sm sm:text-md lg:text-[24px] capitalize font-bold">{latest?.title}</p>
                            <article className="line-clamp-8 flex-1 overflow-hidden text-ellipsis font-satoshi text-[#061A2E] text-sm sm:text-m lg:text-[18px] leading-[27px] font-normal">{latest?.body}</article>
                        </div>
                    </div>

                    <main className="space-y-4 bg-[#F2F2F2] w-full">
                        <div className="w-full space-y-4 sm:w-[1199px] mx-auto py-[50px]">
                            <h2 className="border-l-4 px-2 capitalize py-0 border-l-red-500 text-sm sm:text-lg font-medium">More News</h2>
                            <section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {news.map((item, i) => (
                                    <Link href={`/news/${item._id}`} key={i} className="w-full pt-[11px] pr-[11px] pb-[17px] pl-[11px] bg-white border rounded-[10px] shadow-lg hover:shadow-gray-500 p-2 group hover:shadow-2xl cursor-pointer flex flex-col items-center gap-[13px]">
                                        <div className="relative w-[265px] h-[172px] overflow-hidden rounded-[10px]">
                                            <Image
                                                src={item?.image}
                                                alt="latest-news-photo"
                                                fill
                                                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                                                priority
                                            />
                                        </div>
                                        <div className="flex flex-col items-start gap-4 lg:gap-[12px]">
                                            <div className="flex items-center justify-between w-full text-gray-500">
                                                <p className="bg-[#303030] w-[69px] rounded-[5px] flex items-center justify-center text-[14px] gap-[10p]">
                                                    <p className="font-satoshi font-black px-[7px] py-[3px] text-sm sm:text-md text-[14px] text-white">
                                                        {item?.time}
                                                    </p>
                                                </p>
                                                <span className="font-satoshi text-[#1E1E1E] text-sm sm:text-md lg-[14px] font-bold">{item?.createdAt}</span>
                                            </div>

                                            <p className="font-satoshi text-sm sm:text-md lg:text-[14px] capitalize font-bold line-clamp-2">{item?.title}</p>

                                            <div className="bg-[#F2F2F2] rounded-[7px] p-[8px]">
                                                <p className="line-clamp-3 flex-1 overflow-hidden text-ellipsis text-[#1E1E1E] font-satoshi text-[12px] font-normal leading-[15px] tracking-[0.24px]">
                                                    {item?.snippet}
                                                </p>
                                            </div>
                                            <article
                                                className="line-clamp-2 sm:line-clamp-3 md:line-clamp-4 font-satoshi text-[#1E1E1E] text-sm sm:text-md self-stretch lg:text-[14px] leading-[27px] font-normal"
                                            >
                                                {item?.body}
                                            </article>
                                            <p className="border-l-4 px-2 capitalize py-0 text-[#1E1E1E] border-l-red-500 text-sm md:text-[13px] font-bold leading-[18px]">{item?.location}</p>
                                        </div>
                                    </Link>
                                ))}
                            </section>
                        </div>
                    </main>
                </>
            )}
        </div>
    )
}