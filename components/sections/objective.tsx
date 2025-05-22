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
        <section className="w-full min-h-screen lg:h-[770.45px] bg-[#F9FAFB] flex flex-col lg:flex-row py-12 lg:py-[115px] px-6 sm:px-8 md:px-12 lg:px-[119px] gap-12 lg:gap-[61px] items-center">
            {/* Image - Full width on mobile, original size on desktop */}
            <div className="w-full lg:w-auto">
                <Image
                    src='/images/home/objective.png'
                    alt='objective'
                    height={539.82}
                    width={600}
                    className="w-full max-w-[600px] h-auto object-contain"
                />
            </div>

            {/* Content */}
            <div className="w-full lg:w-[536px] h-auto lg:h-[468px] flex flex-col gap-6 lg:gap-[24px]">
                {isObjective && (
                    <div className="flex items-center w-[231px] h-[34px] gap-[10px] bg-[#D8F5FF] rounded-[20px] justify-center">
                        <span className="font-satoshi font-normal text-sm sm:text-[16px] leading-[1.5] tracking-[0.08em] uppercase text-[#0000FF]">
                            Strategic Objectives
                        </span>
                    </div>
                )}
                <p className="font-satoshi font-bold text-2xl sm:text-3xl lg:text-[32px] leading-[1.1] tracking-normal capitalize">
                    Our Blueprint for Impacts
                </p>
                <ul className="flex flex-col gap-4 sm:gap-6 lg:gap-[24px] list-disc pl-6 sm:pl-8 lg:pl-[38px]">
                    {ObjectivesData.map((item, index) => (
                        <li
                            key={index}
                            className='font-satoshi font-light text-base sm:text-lg lg:text-[20px] leading-snug sm:leading-none tracking-normal list-item'
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}