import Image from "next/image"
export default function Ellipse({ header, body }: { header: string, body: string }) {
    return (
        <section className="w-fill h-auto pt-[80px] px-[100px] flex items-center justify-center">
            <div className="relative w-[1241px] h-[432px] rounded-tl-[40px] rounded-tr-[40px] p-[80px] bg-[#144DAF] overflow-hidden">
                <div className="w-[666px] h-[272px] flex flex-col gap-[22px]">
                    <p className="w-[666px] h-[112px] font-satoshi font-bold text-[43px] leading-[1.3] tracking-normal text-[#FFFFFF]">
                        {header}
                    </p>
                    <p className="w-[666px] h-[74px] font-vietnam font-normal text-[20px] leading-[37px] tracking-[-0.0025em] text-[#FFFFFF]">{body}</p>
                    <div className="w-[45px] h-[42px] flex items-center gap-[22px]">
                        <button className="w-[174px] h-[42px] rounded-[56px] py-[12px] px-[33px] bg-[#FFFFFF] border-none">
                            <span className="inline-block w-[108px] h-[18px] font-roboto font-medium text-[15.36px] leading-[1] tracking-normal text-[#000000]">
                                Partner With Us
                            </span>
                        </button>
                        <button className="w-[209px] h-[42px] rounded-[56px] py-[12px] px-[33px] bg-transparent border border-[#FFFFFF]">
                            <span className="inline-block w-[143px] h-[18px] font-roboto font-medium text-[15.36px] leading-[1] tracking-normal text-[#FFFFFF]">
                                Book a Campus Tour
                            </span>
                        </button>
                    </div>
                </div>
                <Image src='/images/home/ellipse.png' className="absolute top-[88.5px] left-[851.5px]" alt='' height={400} width={400} />
                <Image src='/images/home/ellipse2.png' className="absolute top-[236.4px] left-[990px]" alt='' height={270} width={280} />
            </div>

        </section>
    )
}