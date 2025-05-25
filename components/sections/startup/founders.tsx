import Image from "next/image";

const TestimonialData = [
    {
        image: '/images/testimonial/chinedu.png',
        name: 'Chinedu Ogulu',
        description: 'Head of Product, NexaTech',
        text: `"IDCL was the turning point for our startup. Through their accelerator program, we secured seed funding, connected with global mentors, and gained exposure we never thought possible from Owerri. It's more than a tech hub—it's a launchpad."`
    },
    {
        image: '/images/testimonial/fatima.png',
        name: 'Fatima B.',
        description: 'CTO, SwiftBuild Nigeria',
        text: `"Thanks to IDCL's internship partnership with my university, I had hands-on access to advanced tools like 3D printing labs and AI workshops. The experience gave me confidence and skills that now stand out in my CV."`
    },
    {
        image: '/images/testimonial/tolu.png',
        name: 'Tolu Aina',
        description: 'CEO, Innovent Hub',
        text: `"I attended a cybersecurity training at IDCL and was blown away by the quality of instruction and global relevance. Their infrastructure rivals what you'd find in top cities, and their vision for digital Africa is inspiring."`
    }
];

export default function StartUpFounders() {
    return (
        <section className="w-full max-w-[1200px] mx-auto flex py-12 lg:py-[80px] flex-col gap-8 lg:gap-[54px] items-center justify-center px-4 sm:px-6">
            <header className="w-full max-w-[620px] flex flex-col gap-4 lg:gap-[21px] items-center justify-center text-center">
                <p className="font-satoshi font-bold text-2xl sm:text-3xl lg:text-[32px] leading-[1.1] tracking-normal capitalize text-[#3B3B3B]">
                    What Our Founders Are Saying
                </p>
                <span className="font-satoshi font-light text-base sm:text-lg lg:text-[20px] leading-normal lg:leading-[1] tracking-[0em] text-[#000000]">
                    Hear from Founders of startups, hatched from our incubator.
                </span>
            </header>

            <section className="w-full flex flex-col sm:flex-row items-center gap-6 lg:gap-[24px] overflow-x-auto pb-4 lg:pb-0 lg:h-[376px]">
                {TestimonialData.map((item, index) => (
                    <div
                        key={index}
                        className="relative w-full sm:w-[350px] lg:w-[384px] min-w-[300px] h-auto lg:h-[376px] flex flex-col gap-2 lg:gap-[10px] p-6 lg:p-[25px] border border-[#EAEAEA]"
                    >
                        <div className="flex items-center gap-4 lg:gap-[20px]">
                            <Image
                                src={item.image}
                                alt={item.name}
                                height={72}
                                width={72}
                                className="rounded-full"
                            />
                            <div>
                                <p className="font-vietnam font-semibold text-base lg:text-[18px] leading-7 lg:leading-[28px] tracking-[-0.0025em] text-[#282A2D]">
                                    {item.name}
                                </p>
                                <p className="font-vietnam font-normal text-sm lg:text-[14px] leading-5 lg:leading-[22px] tracking-[-0.0025em] text-[#616771]">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                        <blockquote className="font-vietnam font-normal text-sm lg:text-[14px] text-[#616771] leading-6 lg:leading-[24px] tracking-[-0.0025em] mt-2 lg:mt-0">
                            {item.text}
                        </blockquote>
                        <div className="flex gap-2 lg:gap-[10px] mt-4 lg:absolute lg:bottom-[50px]">
                            {[...Array(5)].map((_, i) => (
                                <Image
                                    key={i}
                                    src='/images/testimonial/star.png'
                                    width={22}
                                    height={22}
                                    alt='star'
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </section>
        </section>
    )
}