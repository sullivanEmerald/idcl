import Image from "next/image"
const Services = [
    {
        image: "/images/commercializaton/services/one.png",
        header: 'IP Valuation',
        body: 'Understand the true value of your intellectual property.',

    },
    {
        image: "/images/commercializaton/services/two.png",
        header: 'Licensing & Deal-Making',
        body: 'Structure winning deals and strategic partnerships.',

    },
    {
        image: "/images/commercializaton/services/three.png",
        header: 'Go-to-Market Strategy',
        body: 'Plan and execute successful market entry.',

    },
    {
        image: "/images/commercializaton/services/four.png",
        header: 'Business Mentorship',
        body: 'Get expert insights to grow and scale confidently.',

    },
    {
        image: "/images/commercializaton/services/five.png",
        header: 'Market Exposure & Promotion',
        body: 'Amplify your brand and reach the right audience.',

    },
    {
        image: "/images/commercializaton/services/six.png",
        header: 'Legal & Documentation Support',
        body: 'Professional support for contracts, policies, and legal documents.',

    },

]
export default function CommercializationIpServices() {
    return (
        <section className="w-full flex py-[112px] flex-col items-center justify-center gap-[51px] bg-[#144DAF]" >
            <h1 className="font-satoshi font-bold text-[32px] leading-[35px] text-[#fff] ">IP Services We Offer</h1>
            <section className="flex w-[945px] items-center flex-wrap gap-[41px]">
                {Services.map((item, index) => (
                    <div key={index} className="flex w-[283px] py-[1px] flex-col items-center">
                        <div>
                            <Image
                                src={item.image}
                                alt="Service"
                                width={283}
                                height={180}
                                className="object-cover rounded-tr-[11px] rounded-tl-[11px]"
                                priority
                            />
                        </div>
                        <div className="h-[151px] w-[283px] flex py-[20px] px-[22px] flex-col items-start gap-[10px] border border-[#EAEAEA] self-stretch bg-[#ffffff] rounded-bl-[11px] rounded-br-[11px]">
                            <div className="flex flex-col items-start gap-[15px] self-stretch">
                                <h1 className="font-satoshi text-[20px] font-bold leading-[26px] tracking-[0.14px] text-[#282A2D] self-stretch">{item.header}</h1>
                                <p className="font-satoshi text-[16px] font-normal leading-[22px] tracking-[0.112px] text-[#616771] self-stretch">{item.body}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </section>
    )
}