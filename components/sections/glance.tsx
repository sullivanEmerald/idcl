import Image from "next/image";

export default function Glance() {
    return (
        <section className="flex flex-col lg:flex-row w-full items-center justify-center px-4 sm:px-6 md:px-8 lg:px-[121px] py-12 md:py-16 lg:h-[710px] gap-8 md:gap-12 lg:gap-[65px] bg-[#F5F9FF]">
            {/* Image Section - Order changes on mobile */}
            <div className="order-2 lg:order-1 w-full lg:w-auto">
                <img
                    src='/images/home/glance.png'
                    alt='glance image'
                    className="w-full max-w-[564px] h-auto mx-auto lg:w-[564px] lg:h-[540px] object-contain shrink-0"
                />
            </div>

            {/* Content Section */}
            <aside className="order-1 lg:order-2 flex flex-col items-start gap-4 md:gap-[17px] w-full lg:w-[570px]">
                <div className="flex flex-col items-start w-full lg:w-[570px] gap-4 md:gap-[21px]">
                    <div className="flex items-center w-[125px] h-[34px] gap-[10px] bg-[#D8F5FF] rounded-[20px] justify-center">
                        <span className="font-satoshi font-normal text-sm md:text-[16px] leading-[1.5] tracking-[0.08em] uppercase text-[#0000FF]">
                            Our Story
                        </span>
                    </div>
                    <p className="font-satoshi font-bold text-2xl sm:text-3xl md:text-[32px] leading-[1.1] tracking-normal capitalize">
                        IDCL at a glance
                    </p>
                </div>

                <section className="font-satoshi font-light text-base md:text-lg lg:text-[20px] leading-normal w-full lg:w-[570px] text-[#000] flex flex-col gap-4 md:gap-[17px]">
                    <p>
                        Welcome to Imo Digital City Ltd (IDCL), where local innovation meets global technology. As West Africa's premier tech incubation and acceleration hub, we connect startups, digital talent, and governments with global opportunities. Explore our digital skills training, startup programs, and smart innovation infrastructure—all from one platform
                    </p>
                    <p>
                        Imo Digital City Ltd (IDCL) is a privately-owned tech ecosystem with state government equity, headquartered in Owerri, Nigeria. We drive Africa's digital transformation through skills development, startup incubation, innovation hubs, and smart infrastructure. Our core mission is to empower West Africa's digital economy by connecting talent with opportunity.
                    </p>
                </section>

                <button className="w-[123px] bg-transparent h-[50px] rounded-[56px] border py-3 md:py-[16px] px-4 font-Roboto font-bold text-sm md:text-[15.36px] leading-[1] tracking-[0em] hover:bg-[#0000FF] hover:text-white transition-colors">
                    Learn More
                </button>
            </aside>
        </section>
    );
}