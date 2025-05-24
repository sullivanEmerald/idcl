import Image from "next/image";

export default function InfrastructureMobile() {
    return (
        <section className="w-full flex items-center justify-center py-12 lg:py-[80px] px-4 lg:px-0 mb-[40px]">
            <div className="w-full max-w-[960px] h-auto lg:h-[455px] flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-[66px]">

                <div className="w-full lg:w-[450px] h-auto lg:h-[241px] flex flex-col gap-4 lg:gap-[17px]">
                    <h2 className="font-satoshi font-black text-2xl md:text-3xl lg:text-[32px] leading-[1.1] tracking-normal text-[#3B3B3B]">
                        Automobile Service Centre
                    </h2>
                    <p className="font-satoshi font-light text-base md:text-lg lg:text-[20px] leading-normal lg:leading-[1] tracking-normal">
                        The IDCL Auto Service Centre combines digital diagnostics with expert mechanical service, targeting government fleets and private sector partners. It is the region's first integrated auto innovation hub—offering vehicle maintenance, digital inspection, and repair in line with smart city goals. This facility supports workforce development and promotes safer, more efficient mobility solutions across Imo State.
                    </p>
                </div>

                <div className="relative w-full lg:w-auto h-[300px] lg:h-auto">
                    <div className="relative w-[280px] h-[280px] lg:w-[336.53px] lg:h-[336.53px] mx-auto">
                        <Image
                            src='/images/innovation/car2.png'
                            alt="Automobile Service Centre"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 280px, 336.53px"
                            priority
                        />
                        <div className="absolute left-[80px] top-[80px] lg:left-[100px] lg:top-[105px] w-[280px] h-[280px] lg:w-[336.53px] lg:h-[336.53px]">
                            <Image
                                src='/images/innovation/car1.png'
                                alt="Automobile Service Detail"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 280px, 336.53px"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}