import Image from "next/image";

export default function InfrastructureBpo() {
    return (
        <section className="w-full max-w-[1001px] h-auto lg:h-[412px] mx-auto flex flex-col-reverse lg:flex-row items-center justify-center gap-8 lg:gap-[72px] px-4 lg:px-0 py-8 lg:py-0">

            <div className="relative w-full lg:w-[479.3px] h-[300px] lg:h-[412.33px]">
                <Image
                    src='/images/innovation/bpo.png'
                    alt="BPO Call Centre"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 479.3px"
                    priority
                />
            </div>
            <div className="w-full lg:w-[450px] h-auto lg:h-[241px] flex flex-col gap-4 lg:gap-[17px] order-1 lg:order-none">
                <h2 className="font-satoshi font-black text-2xl md:text-3xl lg:text-[32px] leading-[1.1] tracking-normal text-[#3B3B3B]">
                    BPO Call Centre
                </h2>
                <p className="font-satoshi font-light text-base md:text-lg lg:text-[20px] leading-normal lg:leading-[1] tracking-normal">
                    IDCL's Business Process Outsourcing (BPO) Call Centre is a fully equipped facility providing multilingual customer service, tech support, and inbound/outbound calling solutions for both local and international clients. It creates employment for trained digital professionals and helps SMEs and enterprises deliver seamless support at scale.
                </p>
            </div>

        </section>
    );
}