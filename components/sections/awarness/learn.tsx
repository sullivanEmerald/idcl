import Image from "next/image";
import Link from "next/link";

const Learning = [
    {
        image: '/images/awareness/icons/one.png',
        header: 'Understanding IP Rights',
        body: 'Explore copyright, trademarks, patents, and trade secrets.'
    },
    {
        image: '/images/awareness/icons/two.png',
        header: 'How to Protect Your Work',
        body: 'Legal steps to register and safeguard your creations.'
    },
    {
        image: '/images/awareness/icons/three.png',
        header: 'IP in Business & Innovation',
        body: 'Integrating IP into startup growth and funding strategies.'
    },
    {
        image: '/images/awareness/icons/four.png',
        header: 'Global & African IP Systems',
        body: 'Learn how IP frameworks differ regionally and internationally.'
    },
]

export default function AwareLearning() {
    return (
        <section className="w-full py-12 md:py-[68px] px-6 sm:px-8 md:px-12 lg:px-[139px] flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-[36px]">
            <h1 className="font-satoshi font-bold text-2xl sm:text-3xl md:text-[32px] text-[#3B3B3B] leading-[1.1] md:leading-[35px]">
                What You'll Learn
            </h1>

            <div className="w-full max-w-[1197px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-0 justify-between items-start">
                {Learning.map((item, index) => (
                    <div
                        key={index}
                        className="w-full sm:w-auto flex p-2 md:p-[10px] flex-col items-center justify-center gap-4 sm:gap-6 md:gap-[26px]"
                    >
                        <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-[73px] md:h-[73px] relative">
                            <Image
                                src={item.image}
                                alt={item.header}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>

                        <div className="flex w-full sm:w-[200px] md:w-[221px] flex-col items-center justify-center gap-3 sm:gap-4 md:gap-[14px]">
                            <p className="font-satoshi text-center font-bold text-[#1D2130] text-base sm:text-lg md:text-[19px] leading-tight md:leading-[23px]">
                                {item.header}
                            </p>
                            <p className="font-satoshi text-center font-normal text-[#1D2130] text-sm sm:text-base md:text-[17px] leading-snug md:leading-[20px]">
                                {item.body}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}