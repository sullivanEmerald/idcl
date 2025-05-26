import Logo from "@/components/general/logo";
import LogoNew from "@/components/general/logonew";
import Image from "next/image";

export default function JobGallery() {
    return (
        <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

            <div className="relative w-full h-[300px] sm:h-[350px] md:h-[402px]">
                <Image
                    src='/images/jobs/gallery/first.png'
                    fill
                    alt="gallery image 1"
                    className="object-cover"
                    priority
                />
            </div>


            <div className="relative w-full h-[300px] sm:h-[350px] md:h-[402px]">
                <Image
                    src='/images/jobs/gallery/second.png'
                    fill
                    alt="gallery image 2"
                    className="object-cover"
                    priority
                />
            </div>


            <div className="relative w-full h-[300px] sm:h-[350px] md:h-[402px]">
                <Image
                    src='/images/jobs/gallery/third.png'
                    fill
                    alt="gallery image 3"
                    className="object-cover"
                    priority
                />
            </div>

            <div className="relative w-full h-[300px] sm:h-[350px] bg-[#075DF2] md:h-[402px] flex py-[100px] px-[40px] md:py-[151px] md:px-[86px] shrink-0">
                <LogoNew />
            </div>

        </section>
    )
}