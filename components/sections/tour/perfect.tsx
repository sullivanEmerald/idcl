import Image from "next/image"

const PerfectTarget = [
    'University students & tech clubs',
    'Corporate & government partners',
    'Edtech startups',
    'International guests & delegations',
    'Tech enthusiasts & influencers'
]

export default function TourPerfect() {
    return (
        <section className="flex items-center justify-center gap-[72px]">
            <Image
                src="/images/tour/perfect.png"
                alt="Perfect"
                className="object-cover"
                width={479}
                height={412}
                priority
            />
            <div className="inline-flex flex-col gap-[20px]">
                <p className="self-stretch text-[#3B3B3B] font-satoshi font-bold text-[32px] leading-[35px]">Perfect For</p>
                <ul className="inline-flex flex-col gap-[20px] px-[35px]">
                    {PerfectTarget.map((item, index) => (
                        <li key={index} className="text-[#000] font-satoshi text-[20px] font-light leading-[22px]">{item}</li>
                    ))}
                </ul>
            </div>
        </section>
    )
}