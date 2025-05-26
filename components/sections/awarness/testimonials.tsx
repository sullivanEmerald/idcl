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

export default function AwarenessTestimonials() {
    return (
        <section className="w-full px-4 sm:px-6 md:px-8 py-12 md:py-16 lg:py-[80px]">
            <div className="max-w-[1200px] mx-auto flex flex-col gap-8 md:gap-12 lg:gap-[54px] items-center">
                <h2 className="font-satoshi font-bold text-2xl sm:text-3xl md:text-[32px] leading-[1.1] tracking-normal capitalize text-[#3B3B3B] text-center">
                    Testimonials
                </h2>

                <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-[24px]">
                    {TestimonialData.map((item, index) => (
                        <div
                            key={index}
                            className="relative w-full max-w-[384px] min-h-[300px] md:h-[376px] flex flex-col gap-3 md:gap-[10px] p-5 md:p-[25px] border border-[#EAEAEA]"
                        >
                            <div className="flex items-center gap-4 md:gap-[20px]">
                                <div className="w-14 h-14 md:w-[72px] md:h-[72px] relative">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="rounded-full object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-vietnam font-semibold text-base md:text-[18px] leading-[1.5] md:leading-[28px] tracking-[-0.0025em] text-[#282A2D]">
                                        {item.name}
                                    </p>
                                    <p className="font-vietnam font-normal text-sm md:text-[14px] leading-[1.5] md:leading-[22px] tracking-[-0.0025em] text-[#616771]">
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            <blockquote className="font-vietnam font-normal text-sm md:text-[14px] text-[#616771] leading-[1.7] md:leading-[24px] tracking-[-0.0025em] mt-2 md:mt-0">
                                {item.text}
                            </blockquote>

                            <div className="flex gap-2 md:gap-[10px] absolute bottom-12 md:bottom-[50px]">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="w-5 h-5 md:w-[22px] md:h-[22px] relative">
                                        <Image
                                            src='/images/testimonial/star.png'
                                            fill
                                            alt='star'
                                            className="object-contain"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}