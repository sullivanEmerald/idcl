"use client"
import { newsService } from "@/services/news";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Blogs } from "@/types/news";
import { toast } from "sonner";
import NewsSkeleton from "@/skeleton/news";

export default function UniqueNews() {
    const { id } = useParams();
    const [blog, setBlog] = useState<Blogs | null>(null)
    const [news, setNews] = useState<Blogs[]>([])
    const [isloading, setIsLoading] = useState(true)

    useEffect(() => {
        const getBlog = async () => {
            try {
                const data = await newsService.getBlog(id as string)
                setBlog(data.blog)
                setNews(data.relatedBlogs)
            } catch (error) {
                toast.error('Network Error, Try again')
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        getBlog();
    }, [id])

    if (isloading) {
        return <NewsSkeleton />
    }

    return (
        <>
            <div className="px-4 sm:px-6 lg:px-0">
                {blog === null ? (
                    <p className="text-md text-gray-400">No news updated or found. Visit again soon</p>
                ) : (
                    <>
                        {/* Main Blog Content */}
                        <div className="w-full max-w-[1200px] py-8 md:py-[50px] mx-auto space-y-6">
                            <div className="w-full flex flex-col items-start gap-3 md:gap-[15px]">
                                <h2 className="w-full font-bold text-lg sm:text-xl lg:text-[24px] text-[#061A2E] font-satoshi leading-tight md:leading-normal">
                                    {blog.title}
                                </h2>
                                <div className="flex items-center justify-between w-full text-gray-500">
                                    <div className="bg-[#303030] w-[69px] rounded-[5px] flex items-center justify-center text-[14px] gap-[10px]">
                                        <span className="font-satoshi font-black px-[7px] py-[3px] text-xs sm:text-sm text-white">
                                            {blog.time}
                                        </span>
                                    </div>
                                    <span className="font-satoshi text-[#1E1E1E] text-xs sm:text-sm lg:text-[14px] font-bold">
                                        {blog.createdAt}
                                    </span>
                                </div>
                            </div>

                            {/* Featured Image */}
                            <div className="relative w-full h-[250px] sm:h-[350px] md:h-[456px]">
                                <Image
                                    src={blog?.image!}
                                    alt="latest-news-photo"
                                    fill
                                    className="object-cover rounded-[10px]"
                                    priority
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
                                />
                            </div>

                            {/* Article Content */}
                            <article className="text-[#061A2E] font-satoshi text-base sm:text-lg lg:text-[18px] font-normal leading-relaxed sm:leading-[27px]">
                                {blog?.body}
                            </article>
                        </div>

                        {/* Related News Section */}
                        <main className="bg-[#F2F2F2] w-full px-4 sm:px-6 lg:px-0">
                            <div className="w-full max-w-[1200px] py-8 md:py-12 mx-auto space-y-6">
                                <h2 className="border-l-4 px-2 capitalize py-0 border-l-red-500 text-base sm:text-lg font-medium">
                                    More News
                                </h2>
                                <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                                    {news.map((item, i) => (
                                        <Link
                                            href={`/news/${item._id}`}
                                            key={i}
                                            className="w-full p-4 bg-white border rounded-[10px] shadow-lg hover:shadow-gray-500 group hover:shadow-2xl cursor-pointer flex flex-col items-center gap-4 min-h-[430px] sm:min-h-[450px] md:min-h-[520px] relative"
                                        >
                                            <div className="relative w-full h-[150px] sm:h-[160px] md:h-[172px] overflow-hidden rounded-[10px]">
                                                <Image
                                                    src={item?.image}
                                                    alt="latest-news-photo"
                                                    fill
                                                    className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                                                    priority
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                />
                                            </div>
                                            <div className="flex flex-col items-start gap-3 md:gap-[12px] w-full">
                                                <div className="flex items-center justify-between w-full text-gray-500">
                                                    <div className="bg-[#303030] w-[69px] rounded-[5px] flex items-center justify-center text-[14px] gap-[10px]">
                                                        <span className="font-satoshi font-black px-[7px] py-[3px] text-xs sm:text-sm text-white">
                                                            {item?.time}
                                                        </span>
                                                    </div>
                                                    <span className="font-satoshi text-[#1E1E1E] text-xs sm:text-sm lg:text-[14px] font-bold">
                                                        {item?.createdAt}
                                                    </span>
                                                </div>

                                                <p className="font-satoshi text-sm sm:text-[14px] capitalize font-bold line-clamp-2 w-full">
                                                    {item?.title}
                                                </p>

                                                <div className="bg-[#F2F2F2] rounded-[7px] p-2 md:p-[8px] w-full">
                                                    <p className="line-clamp-2 sm:line-clamp-3 overflow-hidden text-ellipsis text-[#1E1E1E] font-satoshi text-xs sm:text-[12px] font-normal leading-snug sm:leading-[15px] tracking-[0.24px]">
                                                        {item?.snippet}
                                                    </p>
                                                </div>
                                                <p className="line-clamp-2 sm:line-clamp-3 md:line-clamp-4 font-satoshi text-[#1E1E1E] text-xs sm:text-sm lg:text-[14px] leading-relaxed font-normal w-full">
                                                    {item?.body}
                                                </p>
                                                <p className="absolute bottom-4 border-l-4 px-2 capitalize py-0 text-[#1E1E1E] border-l-red-500 text-xs sm:text-sm md:text-[13px] font-bold leading-[18px]">
                                                    {item?.location}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </section>
                            </div>
                        </main>
                    </>
                )}
            </div>
        </>
    )
}