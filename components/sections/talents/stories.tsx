import Image from "next/image"

const TestimonialData = [
    {
        image: '/images/testimonial/chinedu.png',
        name: 'Chinedu Ogulu',
        description: 'Founder, GreenBox AI',
        text: `"IDCL was the turning point for our startup. Through their accelerator program, we secured seed funding, connected with global mentors, and gained exposure we never thought possible from Owerri. It's more than a tech hub—it's a launchpad."`
    },
    {
        image: '/images/testimonial/fatima.png',
        name: 'Fatima B.',
        description: 'Software Engineering Intern, UniTech Owerri',
        text: `"Thanks to IDCL's internship partnership with my university, I had hands-on access to advanced tools like 3D printing labs and AI workshops. The experience gave me confidence and skills that now stand out in my CV."`
    },
    {
        image: '/images/testimonial/tolu.png',
        name: 'Tolu Aina',
        description: 'Business Analyst, Lagos',
        text: `"I attended a cybersecurity training at IDCL and was blown away by the quality of instruction and global relevance. Their infrastructure rivals what you'd find in top cities, and their vision for digital Africa is inspiring."`
    }
];
export default function TalentTestimonials() {
    return (
        <section className="w-[1200px] mx-auto flex flex-col gap-[54px] items-center justify-center">
            <header className="w-[620px] flex flex-col gap-[21px] items-center justify-center text-center">
                <p className="font-satoshi font-bold text-[32px] leading-[1.1] tracking-normal capitalize text-[#3B3B3B]">
                    Success Stories from Our Hiring Partners
                </p>
                <span className="font-satoshi font-light text-[20px] leading-[1] tracking-[0em] text-[#000000] w-[653px] h-[27px] inline-block">Hear from the companies that hired with confidence..</span>
            </header>
            <section className="w-fill h-[376px] flex items-center gap-[24px]">
                {TestimonialData.map((item, index) => {
                    const num = 5; // Example variable declaration

                    return (
                        <div key={index} className=" relative w-[384px] h-[376px] flex flex-col gap-[10px] p-[25px] border border-[#EAEAEA] border-[1px]">
                            <div className="flex items-center gap-[20px]">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    height={72}
                                    width={72}
                                    className="rounded-full"
                                />
                                <div>
                                    <p className="w-[130px] h-[28px] font-vietnam font-semibold text-[18px] leading-[28px] tracking-[-0.0025em] text-[#282A2D]">{item.name}</p>
                                    <p className="w-[219.04px] h-[44px] font-vietnam font-normal text-[14px] leading-[22px] tracking-[-0.0025em] text-[#616771]">{item.description}</p>
                                </div>
                            </div>
                            <blockquote className="w-[320px] h-[144px] font-vietnam font-normal text-[14px] text-[#616771] leading-[24px] tracking-[-0.0025em]">
                                {item.text}
                            </blockquote>
                            <div className="flex gap-[10px] absolute bottom-[50px]">
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
                    );
                })}
            </section>
        </section>
    )
}