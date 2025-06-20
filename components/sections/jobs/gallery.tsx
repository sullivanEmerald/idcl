"use client"
import LogoNew from "@/components/general/logonew";
import Image from "next/image";

const images = [
    '/images/jobs/gallery/first.png',
    '/images/jobs/gallery/second.png',
    '/images/jobs/gallery/third.png',
];

export default function JobGallery() {
    return (
        <div className="relative w-full overflow-hidden h-[300px] sm:h-[350px] md:h-[402px]">
            <div className="flex w-[200%] animate-scroll">
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex">
                        {images.map((src, index) => (
                            <div
                                key={`image-${i}-${index}`}
                                className="relative w-[480px] h-[300px] sm:h-[350px] md:h-[402px] shrink-0"
                            >
                                <Image
                                    src={src}
                                    fill
                                    alt={`gallery image ${index + 1}`}
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        ))}
                        <div className="relative w-[480px] h-[300px] sm:h-[350px] md:h-[402px] bg-[#075DF2] flex items-center justify-center shrink-0">
                            <LogoNew />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
