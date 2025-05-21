import Image from "next/image"
export default function InfrastructureEllipse() {
    return (
        <section className="w-fill h-auto pt-[80px] px-[100px] flex items-center justify-center">
            <div className="relative w-[1241px] h-[432px] rounded-tl-[40px] rounded-tr-[40px] p-[80px] bg-[#144DAF] overflow-hidden">
                <div className="w-[666px] h-[272px] flex flex-col gap-[22px]">
                    <p className="w-[800.95px] font-satoshi font-bold text-[43px] leading-[1.3] tracking-normal text-[#FFFFFF]">
                        Want to partner, print, or power your business with our infrastructure?
                    </p>
                    <p className="w-[800.95px] font-vietnam font-normal text-[20px] leading-[37px] tracking-[-0.0025em] text-[#FFFFFF]">Let’s build the future together—explore partnership, printing, or tech-enabled services at IDCL.</p>
                    <div className="w-[45px] h-[42px] flex items-center gap-[22px]">
                        <button className="w-[174px] h-[42px] rounded-[56px] py-[12px] px-[33px] bg-[#FFFFFF] border-none">
                            <span className="inline-block w-[108px] h-[18px] font-roboto font-medium text-[15.36px] leading-[1] tracking-normal text-[#000000]">
                                Contact Us
                            </span>
                        </button>
                        <button className="w-[209px] h-[42px] rounded-[56px] py-[12px] px-[33px] bg-transparent border border-[#FFFFFF]">
                            <span className="inline-block w-[143px] h-[18px] font-roboto font-medium text-[15.36px] leading-[1] tracking-normal text-[#FFFFFF]">
                                Schedule a Visit
                            </span>
                        </button>
                    </div>
                </div>
                <div className="w-[552px] h-[552px] absolute top-[88px] left-[851px]">
                    <img src='/images/home/ellipse.png' alt='' className="absolute top-0 left-0" />
                    <img src='/images/home/ellipse2.png' alt='' className="absolute top-[148px] left-[148px]" />
                </div>
            </div>

        </section>
    )
}