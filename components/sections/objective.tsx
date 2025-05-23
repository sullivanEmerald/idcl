import Image from "next/image";

const ObjectivesData = [
    'Digital skill development',
    'Intellectual property commercialization',
    'Tech-driven job creation',
    'Innovation & startup funding',
    'Public sector digitization',
    'Infrastructure for smart economy',
    'Global tech partnerships',
]

export default function Objectives({ isObjective }: { isObjective: boolean }) {
    return (
        <section className="w-full min-h-screen lg:h-[770.45px] bg-[#F9FAFB] flex flex-col lg:flex-row py-12 lg:py-[115px] px-6 sm:px-8 lg:px-[119px] gap-12 lg:gap-[61px] items-center">
            {/* Image - Responsive with exact LG dimensions */}
            <div className="w-full max-w-[600px] lg:w-[600px] lg:h-[539.82px] relative aspect-[600/540]">
                <Image
                    src='/images/home/objective.png'
                    alt='objective'
                    fill
                    className="object-contain"
                    quality={100}
                    priority={true}
                />
            </div>

            {/* Content - Exact LG dimensions when large */}
            <div className="w-full max-w-[536px] lg:w-[536px] lg:h-[468px] flex flex-col gap-6 lg:gap-[24px]">
                {isObjective && (
                    <div className="w-[231px] h-[34px] flex items-center justify-center gap-[10px] bg-[#D8F5FF] rounded-[20px]">
                        <span className="font-satoshi font-normal text-sm lg:text-[16px] leading-[1.5] tracking-[0.08em] uppercase text-[#0000FF]">
                            Strategic Objectives
                        </span>
                    </div>
                )}

                <h2 className="font-satoshi font-bold text-2xl sm:text-3xl lg:text-[32px] leading-[1.1] tracking-normal capitalize">
                    Our Blueprint for Impacts
                </h2>

                <ul className="flex flex-col gap-4 lg:gap-[24px] list-disc pl-6 lg:pl-[38px]">
                    {ObjectivesData.map((item, index) => (
                        <li
                            key={index}
                            className="font-satoshi font-light text-base lg:text-[20px] leading-[1.3] lg:leading-[1] tracking-normal"
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}