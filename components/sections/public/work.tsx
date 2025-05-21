import Image from "next/image"
const organisation = [
    {
        image: '/images/public/icons/one.png',
        body: 'Proven track record with public/private institutions'
    },
    {
        image: '/images/public/icons/two.png',
        body: 'Local context + global tech expertise'
    },
    {
        image: '/images/public/icons/three.png',
        body: 'Deep focus on transparency and user-centric design'
    },
    {
        image: '/images/public/icons/four.png',
        body: 'Rapid deployment and long-term support'
    },
]


export default function PublicWork() {
    return (
        <div className="w-full py-[112px] flex flex-col items-center gap-[31px]">
            <h1 className="font-satoshi font-bold text-[32px] leading-[35px] text-[#3B3B3B]">Why Work With Us</h1>
            <div className="flex items-center justify-center w-full gap-[31px] self-stretch">
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
    )
}