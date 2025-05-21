import Image from "next/image"
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
        <section className="bg-[#144DAF] w-full h-[659px] py-[112px]">
            <div className="w-[900px] flex flex-col mx-auto gap-[31px] items-center justify-center">
                <h1 className="text-white font-satoshi text-[32px] font-bold leading-[110%] capitalize">Who It’s For</h1>
                <div className="flex items-center justify-center gap-[30px] self-stretch flex-wrap w-[855px]">
                    {
                        organisation.map((item, index) => (
                            <div key={index} className="flex w-[263px] pt-[35px] pr-[40px] pb-[16px] pl-[40px] flex-col gap-[16px] items-center justify-center self-stretch rounded-[32px] bg-[#F9FAFB]">
                                <Image
                                    src={item.image}
                                    alt="Background"
                                    width={64}
                                    height={64}
                                    className="object-cover"
                                    priority
                                />
                                <p className="self-stretch font-figtree font-bold text-[16px] leading-normal text-[#1D2939] text-center">{item.body}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>

    )
}