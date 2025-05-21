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
        <section className="flex flex-col w-full pt-[87px] pr-[139px] pb-[68px] pl-[139px] items-center justify-center gap-[36px] ">
            <h1 className="font-satoshi font-bold text-[32px] text-[#3B3B3B] leading-[35px]">What You’ll Learn </h1>
            <div className="flex w-[1197px] justify-between items-center">
                {Learning.map((item, index) => (
                    <div key={index} className="w-[241px] flex p-[10px] flex-col items-center justify-center gap-[26px] shrink-0">
                        <Image
                            src={item.image}
                            alt="Background"
                            width={73}
                            height={73}
                            className="object-cover"
                            priority
                        />
                        <div className="flex w-[221px] flex-col items-center justify-center gap-[14px] self-stretch">
                            <p className="font-satoshi text-center font-bold self-stretch text-[#1D2130] text-[19px] leading-[23px]">{item.header}</p>
                            <p className="font-satoshi text-center font-normal self-stretch text-[#1D2130] text-[17px] leading-[20px">{item.body}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}