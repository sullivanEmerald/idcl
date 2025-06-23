"use client"
import { useEffect, useState } from "react"
import { newsService } from "@/services/news";
import { Blogs } from "@/types/news";
import Image from "next/image";
import Link from "next/link";

export default function News() {
    const [fetching, setIsFetching] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [news, setNews] = useState<Blogs[]>([])
    const [filteredNews, setFilteredNews] = useState<Blogs[]>([])
    const [latest, setLatest] = useState<Blogs | null>(null)


    useEffect(() => {
        const getAllNews = async () => {
            const data = await newsService.getAllnews(currentPage);
            console.log(data)
            setLatest(data.latest)
            setNews(data.blogs)
            setFilteredNews(data.blogs)
        }
        getAllNews();
    }, [])


    return (
        <div className="w-full sm:w-[1200px] py-10 mx-auto space-y-10">
            {news.length === 0 ? (
                <p className="text-md text-gray-400">No news updated or found. Visit again soon</p>
            ) : (
                <>
                    <div className="w-full space-y-4">
                        <h2 className="border-l-4 px-2 capitalize py-0 border-l-red-500 text-sm sm:text-lg font-medium">latest News</h2>
                        <div>
                            <Image
                                src={latest?.image!}
                                alt="latest-news-photo"
                                width={1200}
                                height={600}
                                className="w-full h-[500px] object-cover rounded-[10px]"
                                priority
                            />
                            <div className="flex items-center justify-between w-full text-gray-500">
                                <span>{latest?.time}</span>
                                <span>{latest?.createdAt}</span>
                            </div>
                        </div>
                        <p className="">{latest?.title}</p>
                        <p className="line-clamp-6 sm:line-clamp-8 text-justify underline">{latest?.snippet}</p>
                        <article className="line-clamp-6 sm:line-clamp-10 text-justify">{latest?.body}</article>

                    </div>
                    <main className="space-y-4">
                        <h2 className="border-l-4 px-2 capitalize py-0 border-l-red-500 text-sm sm:text-lg font-medium">More News</h2>
                        <section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {news.map((item, i) => (
                                <Link href={`/news/${item._id}`} key={i} className="w-full border rounded-[10px] shadow-lg p-2 group hover:shadow-2xl cursor-pointer">
                                    <Image
                                        src={item?.image}
                                        alt="latest-news-photo"
                                        width={1200}
                                        height={600}
                                        className="w-full h-[200px] object-cover rounded-[10px] transition-transform duration-300 ease-in-out group-hover:scale-105"
                                        priority
                                    />
                                    <div className="flex items-center justify-between w-full text-gray-500">
                                        <span>{item?.time}</span>
                                        <span>{item?.createdAt}</span>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="truncate">{item?.title}</p>
                                        <p className="line-clamp-3 sm:line-clamp-6 text-justify underline">{item?.snippet}</p>
                                        <article className="line-clamp-5 sm:line-clamp-7 text-justify">{item?.body}</article>
                                        <p className="border-l-4 px-2 capitalize py-0 border-l-red-500 text-sm sm:text-lg font-medium">{item?.location}</p>
                                    </div>
                                </Link>
                            ))}
                        </section>
                    </main>
                </>
            )}
        </div>
    )
}