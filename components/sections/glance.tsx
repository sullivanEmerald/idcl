import Image from "next/image"
export default function Glance() {
    return (
        <section className="flex w-full items-center justify-center px-[121px] h-[710px] gap-[65px] shrink-0 bg-[#F5F9FF]">
            <img src='/images/home/glance.png' alt='glance image' width={564} height={540} className="shrink-0" />
            <aside className="flex flex-col items-start gap-[17px] w-[570px] flex-[1_0_0]">
                <div className="flex flex-col items-start w-[570px] gap-[21px] self-stretch">
                    <div className="flex items-center w-[125px] h-[34px] gap-[10px] bg-[#D8F5FF] rounded-[20px] justify-center">
                        <span className="
                        font-satoshi 
                        font-normal 
                        text-[16px] 
                        leading-[1.5] 
                        tracking-[0.08em] 
                        uppercase
                        text-[#0000FF]
                    ">
                            Our Story
                        </span>
                    </div>
                    <p className="font-satoshi font-bold text-[32px] leading-[1.1] tracking-normal capitalize">
                        IDCL at a glance
                    </p>
                </div>
                <section className="font-satoshi font-light text-[20px] leading-normal w-[570px] text-[#000] flex flex-col gap-[17px] self-stretch">
                    <p>
                        Welcome to Imo Digital City Ltd (IDCL), where local innovation meets global technology. As West Africa’s premier tech incubation and acceleration hub, we connect startups, digital talent, and governments with global opportunities. Explore our digital skills training, startup programs, and smart innovation infrastructure—all from one platform
                    </p>
                    <p>
                        Imo Digital City Ltd (IDCL) is a privately-owned tech ecosystem with state government equity, headquartered in Owerri, Nigeria. We drive Africa’s digital transformation through skills development, startup incubation, innovation hubs, and smart infrastructure. Our core mission is to empower West Africa’s digital economy by connecting talent with opportunity.
                    </p>
                </section>
                <button className="w-[123px] bg-transparent h-[50px] rounded-[56px] border py-[16px] px-[16] font-Roboto font-bold text-[15.36px] leading-[1] tracking-[0em]">Learn More</button>
            </aside >
        </section >

    )
}