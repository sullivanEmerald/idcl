import Image from "next/image";

const Engagements =
    [
        {
            number: '300+',
            division: 'Startups Incubated'
        },

        {
            number: '15',
            division: 'Countries Represented'
        },
        {
            number: '$5M+',
            division: 'in Total Funding Facilitated'
        },
        {
            number: '100+',
            division: 'Mentors & Advisors'
        },
    ]

export default function StartUpAnalytics() {
    return (
        <section className="relative w-full">
            <Image
                src="/images/startup/upper.png"
                alt="Decorative top element"
                width={1440}
                height={116}
                className="w-full"
            />

            <div className="relative w-full h-[274px] flex shrink-0">
                <div className="absolute inset-0 -z-10">
                    <Image
                        src="/images/startup/pattern.png"
                        alt="Background pattern"
                        fill
                        className="object-cover"
                        quality={100}
                    />
                </div>
                <div className="w-full flex items-center self-stretch gap-[80px] justify-center">
                    {
                        Engagements.map((item, index) => (
                            <div key={index} className="flex flex-col items-start gap-[10px]">
                                <p className="text-[#2A3342] text-center font-satoshi font-bold text-[48px] leading-[60px] tracking-[-0.96px]">{item.number}</p>
                                <p className="text-[#556987] text-center font-satoshi text-[20px] font-medium leading-[30px]">{item.division}</p>
                            </div>
                        ))
                    }
                </div>

            </div>

            {/* Decorative bottom image */}
            <Image
                src="/images/startup/down.png"
                alt="Decorative bottom element"
                width={1440}
                height={116}
                className="w-full"
            />
        </section>
    );
}