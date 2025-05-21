import Image from "next/image"

export default function StartUpPartners() {
    return (
        <section className="px-[118px] py-[70px] flex flex-col gap-[27px] items-center">
            <h1 className="text-[#3B3B3B] text-center font-satoshi text-[32px] font-bold leading-[35px] ">Our Partners & Backers</h1>
            <div className="flex justify-between items-center self-stretch">
                <Image src='/images/partners/silicon.png' width={134.7} height={58.08} alt='Silion Valley' />
                <Image src='/images/partners/us.png' width={183.18} height={58.08} alt='US' />
                <Image src='/images/partners/zinox.png' width={183.18} height={58.08} alt='Zinox' />
                <Image src='/images/partners/berkeley.png' width={134.7} height={58.08} alt='Berkeley' />
                <Image src='/images/partners/imo.png' width={102.18} height={101.26} alt='Imo' />
            </div>
        </section>
    )
}