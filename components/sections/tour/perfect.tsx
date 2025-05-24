import Image from "next/image";

const PerfectTarget = [
    'University students & tech clubs',
    'Corporate & government partners',
    'Edtech startups',
    'International guests & delegations',
    'Tech enthusiasts & influencers'
];

export default function TourPerfect() {
    return (
        <section className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-[72px] px-4 lg:px-0 py-12 lg:py-0">
            {/* Image - appears first on mobile, maintains original size on desktop */}
            <div className="relative w-full lg:w-[479px] h-[300px] lg:h-[412px]">
                <Image
                    src="/images/tour/perfect.png"
                    alt="Perfect Tour Match"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 479px"
                    priority
                />
            </div>

            {/* Text Content */}
            <div className="w-full lg:w-auto inline-flex flex-col gap-5 lg:gap-[20px]">
                <p className="text-[#3B3B3B] font-satoshi font-bold text-2xl md:text-3xl lg:text-[32px] leading-tight lg:leading-[35px]">
                    Perfect For
                </p>
                <ul className="inline-flex flex-col gap-4 lg:gap-[20px] pl-6 lg:pl-[35px] list-disc">
                    {PerfectTarget.map((item, index) => (
                        <li
                            key={index}
                            className="text-[#000] font-satoshi text-base md:text-lg lg:text-[20px] font-light leading-normal lg:leading-[22px]"
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}