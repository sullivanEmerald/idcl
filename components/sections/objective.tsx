import Image from "next/image"

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
        <section className="w-full h-[770.45px] bg-[#F9FAFB] flex py-[115px] px-[119px] gap-[61px] items-center">
            <Image src='/images/home/objective.png' alt='objective' height={539.82} width={600} />
            <div className="w-[536px] h-[468] flex flex-col gap-[24px]">
                {isObjective && (
                    <div className="flex items-center w-[231px] h-[34px] gap-[10px] bg-[#D8F5FF] rounded-[20px] justify-center">
                        <span className="
                        font-satoshi 
                        font-normal 
                        text-[16px] 
                        leading-[1.5] 
                        tracking-[0.08em] 
                        uppercase
                        text-[#0000FF]
                    ">
                            Strategic Objectives
                        </span>
                    </div>
                )}
                <p className="font-satoshi font-bold text-[32px] leading-[1.1] tracking-normal capitalize">
                    Our Blueprint for Impacts
                </p>
                <ul className="flex flex-col gap-[24px] list-disc pl-[38px]">
                    {ObjectivesData.map((item, index) => (
                        <li
                            key={index}
                            className='font-satoshi font-light text-[20px] leading-none tracking-normal list-item'
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}