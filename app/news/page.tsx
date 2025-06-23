"use client"
import GeneralEllipse from "@/components/general/ellipse";
import NewsHeroSection from "@/components/sections/news/hero";
import News from "@/components/sections/news/news";

export default function NewsPage() {
    return (
        <>
            <NewsHeroSection />
            <News />
            <GeneralEllipse />
        </>
    )
}