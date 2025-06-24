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
                console.log(data)
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
            <div className="w-full sm:w-[1200px] py-10 mx-auto space-y-10">
                {blog === null ? (
                    <p className="text-md text-gray-400">No news updated or found. Visit again soon</p>
                ) : (
                    <>
                        <div className="w-full space-y-4">
                            <h2 className="border-l-4 px-2 capitalize py-0 border-l-red-500 text-sm sm:text-lg font-medium">latest News</h2>
                            <div>
                                <Image
                                    src={blog?.image!}
                                    alt="latest-news-photo"
                                    width={1200}
                                    height={600}
                                    className="w-full h-[500px] object-cover rounded-[10px]"
                                    priority
                                />
                                <div className="flex items-center justify-between w-full text-gray-500">
                                    <span>{blog?.time}</span>
                                    <span>{blog?.createdAt}</span>
                                </div>
                            </div>
                            <p className="">{blog?.title}</p>
                            <p className="line-clamp-6 sm:line-clamp-8 text-justify underline">{blog?.snippet}</p>
                            <article className="line-clamp-6 sm:line-clamp-10 text-justify">{blog?.body}</article>

                        </div>
                        <main className="space-y-4">
                            <h2 className="border-l-4 px-2 capitalize py-0 border-l-red-500 text-sm sm:text-lg font-medium">Other News</h2>
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
        </>
    )
}