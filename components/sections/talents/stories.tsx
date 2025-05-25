import Image from "next/image";

const TestimonialData = [
    {
        image: "/images/testimonial/chinedu.png",
        name: "Chinedu Ogulu",
        description: "Founder, GreenBox AI",
        text: `"IDCL was the turning point for our startup. Through their accelerator program, we secured seed funding, connected with global mentors, and gained exposure we never thought possible from Owerri. It's more than a tech hub—it's a launchpad."`,
    },
    {
        image: "/images/testimonial/fatima.png",
        name: "Fatima B.",
        description: "Software Engineering Intern, UniTech Owerri",
        text: `"Thanks to IDCL's internship partnership with my university, I had hands-on access to advanced tools like 3D printing labs and AI workshops. The experience gave me confidence and skills that now stand out in my CV."`,
    },
    {
        image: "/images/testimonial/tolu.png",
        name: "Tolu Aina",
        description: "Business Analyst, Lagos",
        text: `"I attended a cybersecurity training at IDCL and was blown away by the quality of instruction and global relevance. Their infrastructure rivals what you'd find in top cities, and their vision for digital Africa is inspiring."`,
    },
];

export default function TalentTestimonials() {
    return (
        <section className="w-full max-w-[1200px] mx-auto flex flex-col gap-10 lg:gap-[54px] items-center px-4">
            {/* Header */}
            <header className="flex flex-col gap-5 lg:gap-[21px] items-center text-center w-full max-w-[620px]">
                <p className="font-satoshi font-bold text-[24px] lg:text-[32px] leading-[1.2] text-[#3B3B3B]">
                    Success Stories from Our Hiring Partners
                </p>
                <span className="font-satoshi font-light text-[16px] lg:text-[20px] leading-[1.4] text-[#000000] max-w-[653px]">
                    Hear from the companies that hired with confidence..
                </span>
            </header>

            <section className="flex flex-wrap lg:flex-nowrap justify-center gap-6 lg:gap-[24px] w-full">
                {TestimonialData.map((item, index) => (
                    <div
                        key={index}
                        className="relative w-full max-w-[384px] h-[376px] flex flex-col gap-4 p-5 border border-[#EAEAEA] rounded-md"
                    >

                        <div className="flex items-center gap-4">
                            <Image
                                src={item.image}
                                alt={item.name}
                                height={72}
                                width={72}
                                className="rounded-full"
                            />
                            <div>
                                <p className="font-vietnam font-semibold text-[16px] lg:text-[18px] text-[#282A2D]">
                                    {item.name}
                                </p>
                                <p className="font-vietnam text-[14px] text-[#616771]">
                                    {item.description}
                                </p>
                            </div>
                        </div>


                        <blockquote className="font-vietnam text-[14px] text-[#616771] leading-[24px]">
                            {item.text}
                        </blockquote>

                        {/* Stars */}
                        <div className="flex gap-2 absolute bottom-5">
                            {[...Array(5)].map((_, i) => (
                                <Image
                                    key={i}
                                    src="/images/testimonial/star.png"
                                    width={22}
                                    height={22}
                                    alt="star"
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </section>
        </section>
    );
}
