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
        <section className="w-full flex py-[60px] sm:py-[80px] lg:py-[112px] flex-col items-center justify-center gap-[30px] sm:gap-[40px] lg:gap-[51px] bg-[#144DAF] px-4 sm:px-6 lg:px-0">
            <h1 className="font-satoshi font-bold text-[24px] sm:text-[28px] lg:text-[32px] leading-[26px] sm:leading-[31px] lg:leading-[35px] text-[#fff] text-center">
                IP Services We Offer
            </h1>
            <section className="flex w-full max-w-[945px] items-center justify-center flex-wrap gap-[20px] sm:gap-[30px] lg:gap-[41px]">
                {Services.map((item, index) => (
                    <div key={index} className="flex w-full sm:w-[300px] lg:w-[283px] max-w-[283px] py-[1px] flex-col items-center">
                        <div className="w-full">
                            <Image
                                src={item.image}
                                alt="Service"
                                width={283}
                                height={180}
                                className="w-full h-[160px] sm:h-[170px] lg:h-[180px] object-cover rounded-tr-[11px] rounded-tl-[11px]"
                                priority
                            />
                        </div>
                        <div className="min-h-[140px] sm:min-h-[145px] lg:h-[151px] w-full flex py-[16px] sm:py-[18px] lg:py-[20px] px-[18px] sm:px-[20px] lg:px-[22px] flex-col items-start gap-[8px] sm:gap-[9px] lg:gap-[10px] border border-[#EAEAEA] self-stretch bg-[#ffffff] rounded-bl-[11px] rounded-br-[11px]">
                            <div className="flex flex-col items-start gap-[12px] sm:gap-[13px] lg:gap-[15px] self-stretch">
                                <h1 className="font-satoshi text-[18px] sm:text-[19px] lg:text-[20px] font-bold leading-[23px] sm:leading-[24px] lg:leading-[26px] tracking-[0.14px] text-[#282A2D] self-stretch">
                                    {item.header}
                                </h1>
                                <p className="font-satoshi text-[14px] sm:text-[15px] lg:text-[16px] font-normal leading-[19px] sm:leading-[20px] lg:leading-[22px] tracking-[0.112px] text-[#616771] self-stretch">
                                    {item.body}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </section>
    )
}