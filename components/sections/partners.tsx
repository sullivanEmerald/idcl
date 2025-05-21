import Image from "next/image"
export default function Partners() {
    return (
        <section className="w-fill h-[436px] flex items-center justify-center gap-[49px] bg-[#F5F9FF]">
            <div className="w-[599.06px] h-[178.34px] flex flex-wrap items-center gap-[19px]">
                <Image src='/images/partners/silicon.png' width={134.7} height={58.08} alt='Silion Valley' />
                <Image src='/images/partners/us.png' width={183.18} height={58.08} alt='US' />
                <Image src='/images/partners/zinox.png' width={183.18} height={58.08} alt='Zinox' />
                <Image src='/images/partners/berkeley.png' width={134.7} height={58.08} alt='Berkeley' />
                <Image src='/images/partners/imo.png' width={102.18} height={101.26} alt='Imo' />
            </div>
            <section className="w-[557.44px] h-[271px] flex flex-col gap-[17px]">
                <div className="flex items-center w-[142px] h-[34px] gap-[10px] bg-[#D8F5FF] rounded-[20px] justify-center">
                    <span className="
                        font-satoshi 
                        font-normal 
                        text-[16px] 
                        leading-[1.5] 
                        tracking-[0.08em] 
                        uppercase
                        text-[#0000FF]
                    ">
                        Partners
                    </span>
                </div>
                <p className="font-satoshi font-bold text-[32px] leading-[1.1] tracking-normal capitalize">
                    Core Partners
                </p>
                <p className="w-[557.44px] h-[160px] font-vietnam font-normal text-[14px] leading-[24px] tracking-[-0.0025em] text-[#616771]">Achieving Africa’s digital future is not the work of one actor—it demands the collective strength of governments, the private sector, development organizations, academia, and civil society. These core partners play complementary roles in enabling inclusive growth, scalable innovation, and sustainable digital infrastructure across the continent.</p>
            </section>
        </section>
    )
} 