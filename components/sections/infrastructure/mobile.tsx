import Image from "next/image"

export default function InfrastructureMobile() {
    return (
        <section className="w-full flex items-center justify-center py-[80px]">
            <div className="w-[960px] h-[455px] flex items-center gap-[66px]">
                <div className="w-[450px] h-[241px] flex flex-col gap-[17px]">
                    <p className="font-satoshi font-black text-[32px] leading-[1.1] tracking-normal text-[#3B3B3B]">Automobile Service Centre</p>
                    <p className="font-satoshi font-light text-[20px] leading-[1] tracking-normal">The IDCL Auto Service Centre combines digital diagnostics with expert mechanical service, targeting government fleets and private sector partners. It is the region’s first integrated auto innovation hub—offering vehicle maintenance, digital inspection, and repair in line with smart city goals. This facility supports workforce development and promotes safer, more efficient mobility solutions across Imo State.</p>
                </div>
                <div className="relative">
                    <Image
                        src='/images/innovation/car2.png'
                        alt="Overlay"
                        width={336.53}
                        height={336.53}
                        className="object-cover block"
                        priority
                    />
                    <div className="absolute left-[100px] top-[105px]">
                        <Image
                            src='/images/innovation/car1.png'
                            alt="Overlay"
                            width={336.53}
                            height={336.53}
                            className="object-cover block"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}