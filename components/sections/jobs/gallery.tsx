import Image from "next/image";

export default function JobGallery() {
    return (
        <>

            <section className="w-full flex items-center py-[80px] overflow-hidden">
                <Image src='/images/jobs/gallery/first.png' width={480} height={402} alt="gallery" priority />
                <Image src='/images/jobs/gallery/second.png' width={480} height={402} alt="gallery" priority />
                <Image src='/images/jobs/gallery/three.png' width={480} height={402} alt="gallery" priority />
            </section>

        </>
    )
}