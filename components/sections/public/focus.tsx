import Image from "next/image"
const Focus = [
    {
        image: '/images/public/focus/one.png',
        header: 'E-Governance',
        body: 'Digitize citizen services, permits, licenses & more.'
    },
    {
        image: '/images/public/focus/two.png',
        header: 'Business Process Automation',
        body: 'Streamline tasks, reduce paperwork, and boost efficiency.'
    },
    {
        image: '/images/public/focus/three.png',
        header: 'Document & Workflow Management',
        body: 'Go paperless with secure cloud-based systems.'
    },
    {
        image: '/images/public/focus/four.png',
        header: 'Data & Analytics Dashboards',
        body: 'Real-time insights for smarter decisions.'
    },
    {
        image: '/images/public/focus/five.png',
        header: 'Cybersecurity & Compliance',
        body: 'Protect your data and stay regulatory compliant.'
    },
    {
        image: '/images/public/focus/six.png',
        header: 'Custom Portals & Apps',
        body: 'Build platforms tailored to your organizational needs.'
    },
]

export default function PublicFocus() {
    return (
        <div className="flex w-full py-12 md:py-16 lg:py-[80px] bg-[#F5F9FF] flex-col gap-12 md:gap-16 lg:gap-[64px] items-center px-4 lg:px-0">
            <h1 className="font-satoshi font-bold text-2xl md:text-3xl lg:text-[32px] text-center text-[#3B3B3B] w-full lg:self-stretch">
                Our Focus Areas
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:flex xl:w-[1198px] xl:justify-center xl:gap-[21px] xl:flex-wrap w-full max-w-screen-xl mx-auto gap-6">
                {Focus.map((item, index) => (
                    <div
                        key={index}
                        className="border-none flex flex-col w-full sm:w-[calc(50%-12px)] xl:w-[283px] py-[1px] items-center h-auto xl:h-[333px]"
                    >
                        <div className="w-full xl:w-[283px] aspect-[283/180] relative">
                            <Image
                                src={item.image}
                                alt={item.header}
                                width={283}
                                height={180}
                                className="object-cover rounded-tr-[11px] rounded-tl-[11px] w-full h-full"
                                priority
                            />
                        </div>

                        <div className="flex w-full xl:w-[283px] h-auto xl:h-[151px] flex-col py-5 md:py-6 lg:py-[20px] px-5 md:px-6 lg:px-[22px] items-start gap-3 lg:gap-[10px] border border-[#EAEAEA]">
                            <div className="flex w-full xl:w-[239px] h-auto xl:h-[92px] flex-col items-start gap-4 lg:gap-[15px]">
                                <p className="text-[#282A2D] font-satoshi text-lg md:text-xl lg:text-[20px] font-bold leading-tight lg:leading-[26px] w-full">
                                    {item.header}
                                </p>
                                <p className="text-[#616771] font-satoshi text-base md:text-lg lg:text-[16px] font-normal leading-snug lg:leading-[22px] w-full">
                                    {item.body}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}