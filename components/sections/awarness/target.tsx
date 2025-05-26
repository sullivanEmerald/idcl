import Image from "next/image";

const organisation = [
    {
        image: '/images/awareness/target/one.png',
        body: 'Startup founders'
    },
    {
        image: '/images/awareness/target/two.png',
        body: 'Creatives (designers, musicians, writers, etc.)'
    },
    {
        image: '/images/awareness/target/three.png',
        body: 'Product developers'
    },
    {
        image: '/images/awareness/target/four.png',
        body: 'Researchers and innovators'
    },
    {
        image: '/images/awareness/target/five.png',
        body: 'Legal and IP support professionals'
    },
]

export default function AwarnessTarget() {
    return (
        <section className="bg-[#144DAF] w-full min-h-[400px] sm:min-h-[500px] lg:h-[659px] py-12 sm:py-16 md:py-20 lg:py-[112px] px-4 sm:px-6">
            <div className="w-full max-w-[900px] mx-auto flex flex-col gap-6 sm:gap-8 lg:gap-[31px] items-center justify-center">
                <h1 className="text-white font-satoshi text-2xl sm:text-3xl lg:text-[32px] font-bold leading-[110%] capitalize text-center">
                    Who It's For
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-[30px] w-full max-w-[855px]">
                    {organisation.map((item, index) => (
                        <div
                            key={index}
                            className="flex w-full sm:w-[calc(50%-12px)] lg:w-[263px] pt-6 sm:pt-8 lg:pt-[35px] px-4 sm:px-6 lg:px-[40px] pb-4 sm:pb-5 lg:pb-[16px] flex-col gap-3 sm:gap-4 lg:gap-[16px] items-center justify-center self-stretch rounded-2xl sm:rounded-3xl lg:rounded-[32px] bg-[#F9FAFB]"
                        >
                            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 relative">
                                <Image
                                    src={item.image}
                                    alt={item.body}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            <p className="self-stretch font-figtree font-bold text-sm sm:text-base lg:text-[16px] leading-normal text-[#1D2939] text-center">
                                {item.body}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}