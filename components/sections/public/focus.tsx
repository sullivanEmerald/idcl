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
        <div className="flex w-full py-[80px] bg-[#F5F9FF] flex-col gap-[64px] items-center">
            <h1 className="font-satoshi font-bold text-[32px] text-center text-[#3B3B3B] self-stretch">Our Focus Areas</h1>
            <div className="flex w-[1198px] items-center justify-center gap-[21px] flex-wrap">
                {Focus.map((item, index) => (
                    <div key={index} className="border-none flex flex-col w-[283px] py-[1px] items-center h-[333px]" >

                        <Image
                            src={item.image}
                            alt="Background"
                            width={283}
                            height={180}
                            className="object-cover rounded-tr-[11px] rounded-tl-[11px]"
                            priority
                        />

                        <div className="flex w-[283px] h-[151px] flex-col w-full py-[20px] px-[22px] items-start gap-[10px] self-stretch border border-[#EAEAEA]">
                            <div className="flex w-[239px] h-[92px] flex-col items-start gap-[15px] self-stretch">
                                <p className="text-[#282A2D] font-satoshi text-[20px] font-bold leading-[26px] self-stretch">{item.header}</p>
                                <p className="text-[#616771] font-satoshi text-[16px] font-normal leading-[22px] self-stretch">{item.body}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}