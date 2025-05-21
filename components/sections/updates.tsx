import Image from "next/image"

const UpdateData = [
    {
        image: '/images/home/update.png',
        name: 'Unlocking Africa\'s Potential Through Digital Transformation',
        text: 'Africa is at a tipping point. With a population set to double by 2050 and the fastest-growing youth demographic globally, the continent is uniquely positioned to leapfrog traditional development models through technology.',
        date: 'Published 24 April, 2025'
    },
    {
        image: '/images/home/update.png',
        name: 'Unlocking Africa\'s Potential Through Digital Transformation',
        text: 'Africa is at a tipping point. With a population set to double by 2050 and the fastest-growing youth demographic globally, the continent is uniquely positioned to leapfrog traditional development models through technology.',
        date: 'Published 24 April, 2025'
    },
    {
        image: '/images/home/update.png',
        name: 'Unlocking Africa\'s Potential Through Digital Transformation',
        text: 'Africa is at a tipping point. With a population set to double by 2050 and the fastest-growing youth demographic globally, the continent is uniquely positioned to leapfrog traditional development models through technology.',
        date: 'Published 24 April, 2025'
    }
]

export default function Updates() {
    return (
        <section className="w-fill h-[724px] items-center bg-[#F5F9FF] py-[68px] flex flex-col gap-[26px]">
            <div className="w-[238px] h-[90px] flex flex-col items-center gap-[21px]">
                <div className="w-[104px] h-[34px] rounded-[20px] px-[14px] py-[5px] bg-[#D8F5FF]">
                    <span className="font-satoshi font-normal text-[16px] leading-[1.5] tracking-[0.08em] uppercase text-[#0000FF]">
                        Updates
                    </span>
                </div>
                <p className="inline-block w-[238px] h-[35px] font-satoshi font-bold text-[32px] leading-[1.1] tracking-normal text-[#3B3B3B]">Stay Up To Date</p>
            </div>
            <div className="w-[1198.5px] h-[407.77px] flex items-center gap-[33.48px]">
                {UpdateData.map((item, index) => (
                    <div key={index} className='relative w-[381.77px] h-[407.77px] flex flex-col gap-[15.76px]'>
                        <Image src={item.image} alt='updates' height={246.2} width={381.77} />
                        <div className="relative w-[381.77px] flex flex-col gap-[3.94px] items-center">
                            <p className="w-full font-satoshi font-bold text-[19.7px] leading-[1.31] tracking-[0.17px] text-[#282A2D]">
                                {item.name}
                            </p>
                            <p className="w-full font-satoshi font-normal text-[17.73px] leading-[1.42] tracking-[0.007em] text-[#616771] line-clamp-2 overflow-hidden text-ellipsis">
                                {item.text}
                            </p>
                        </div>
                        <p className="inline-block w-[162px] font-lexend font-bold text-[13.79px] leading-[1.45] tracking-[-0.02em] text-[#827F7F] ">{item.date}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}