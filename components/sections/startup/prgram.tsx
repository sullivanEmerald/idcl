import Image from "next/image"

const organisation = [
    {
        image: '/images/startup/program/one.png',
        body: 'Access to early-stage Funding'
    },
    {
        image: '/images/startup/program/two.png',
        body: '1:1 Mentorship from Experts'
    },
    {
        image: '/images/startup/program/three.png',
        body: 'Global Exposure via IDCL Network'
    },
    {
        image: '/images/startup/program/four.png',
        body: 'Product & MVP Development Support'
    },
    {
        image: '/images/startup/program/five.png',
        body: 'Business Strategy & Legal Guidance'
    },
    {
        image: '/images/startup/program/six.png',
        body: 'Demo Day + Investor Showcases'
    },
]

export default function StartUpProgram() {
    return (
        <section className="bg-[#144DAF] w-full min-h-screen lg:h-[659px] py-16 sm:py-20 lg:py-[112px] px-4 sm:px-6">
            <div className="w-full max-w-[900px] mx-auto flex flex-col gap-6 sm:gap-8 lg:gap-[31px] items-center justify-center">
                <h1 className="text-white font-satoshi text-2xl sm:text-3xl lg:text-[32px] font-bold leading-[110%] capitalize text-center">
                    Why Join Our Startup Program?
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap justify-center gap-4 sm:gap-6 lg:gap-[30px] w-full">
                    {organisation.map((item, index) => (
                        <div
                            key={index}
                            className="flex w-full sm:w-[calc(50%-12px)] lg:w-[263px] pt-8 sm:pt-10 lg:pt-[35px] px-6 sm:px-8 lg:px-[40px] pb-4 sm:pb-6 lg:pb-[16px] flex-col gap-4 sm:gap-6 lg:gap-[16px] items-center justify-center rounded-3xl lg:rounded-[32px] bg-[#F9FAFB]"
                        >
                            <Image
                                src={item.image}
                                alt={item.body}
                                width={64}
                                height={64}
                                className="object-cover"
                                priority
                            />
                            <p className="w-full font-figtree font-bold text-sm sm:text-base lg:text-[16px] leading-normal text-[#1D2939] text-center">
                                {item.body}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}