import Image from "next/image"

export default function InfrastructureBpo() {
    return (
        <section className="w-[1001] h-[412px] flex items-center justify-center gap-[72px]" >
            <Image
                src='/images/innovation/bpo.png'
                alt="Overlay"
                width={479.3}
                height={412.33}
                className="object-cover block"
                priority
            />
            <div className="w-[450px] h-[241px] flex flex-col gap-[17px]">
                <p className="font-satoshi font-black text-[32px] leading-[1.1] tracking-normal text-[#3B3B3B]">BPO Call Centre</p>
                <p className="font-satoshi font-light text-[20px] leading-[1] tracking-normal">IDCL’s Business Process Outsourcing (BPO) Call Centre is a fully equipped facility providing multilingual customer service, tech support, and inbound/outbound calling solutions for both local and international clients. It creates employment for trained digital professionals and helps SMEs and enterprises deliver seamless support at scale.</p>
            </div>
        </section>
    )
}