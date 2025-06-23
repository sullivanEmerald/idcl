"use client"
import { useEffect, useState } from "react"
import { newsService } from "@/services/news";
import { Blogs } from "@/types/news";
import Image from "next/image";

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
        <div className="w-full sm:w-[1000px] p-10">
            {filteredNews.length === 0 ? (
                <p className="text-md text-gray-400">No news updated or found. Visit again soon</p>
            ) : (
                <div className="w-full space-y-4">
                    <h2 className="border-l-4 px-2 capitalize py-0 border-l-red-500 text-sm sm:text-lg font-medium">latest News</h2>
                    <div>
                        <Image
                            src={latest?.image!}
                            alt="latest-news-photo"
                            width={1200}
                            height={600}
                            className="w-full h-[500px] object-cover"
                            priority
                        />
                        <div className="flex items-center justify-between w-full text-blue-500">
                            <span>{latest?.time}</span>
                            <span>{latest?.createdAt}</span>
                        </div>
                    </div>
                    <p className="">{latest?.title}</p>
                    <p className="line-clamp-6 sm:line-clamp-8 text-justify underline">{latest?.snippet}</p>
                    <article className="line-clamp-6 sm:line-clamp-10 text-justify">{latest?.body}</article>
                    <p className="border-l-4 px-2 capitalize py-0 border-l-red-500 text-sm sm:text-lg font-medium">{latest?.location}</p>
                </div>
            )}
        </div>
    )
}