import Image from "next/image"
const Benefits = [
    {
        image: '/images/vendor/icons/one.png',
        header: 'Access to Projects',
        body: 'Secure high-value contracts and gain recurring business.'
    },
    {
        image: '/images/vendor/icons/two.png',
        header: 'Network Expansion',
        body: 'Work with local startups, government agencies, and global tech partners.'
    },
    {
        image: '/images/vendor/icons/three.png',
        header: 'Build Credibility',
        body: 'Strengthen your brand by affiliating with IDCL.'
    },
    {
        image: '/images/vendor/icons/four.png',
        header: 'Timely Notifications ',
        body: 'Get notified about tenders, vendor fairs, and partnership opportunities.'
    },
]
export default function VendorBenefits() {
    return (
        <section className="flex flex-col gap-[36px] py-[80px] items-center justify-center">
            <h1 className="font-satoshi text-center font-bold text-[32px] leading-[35px] text-[#3B3B3B] self-stretch">Key Benefits</h1>
            <div className="w-[1197px] flex justify-between items-center">
                {Benefits.map((item, index) => (
                    <div key={index} className="flex w-[241px] p-[10px] flex-col items-center justify-center gap-[26px] shrink-0">
                        <Image src={item.image} width={73} height={73} alt='Icons' priority />
                        <div className="flex flex-col items-center justify-center gap-[14px] self-stretch w-[221px]">
                            <h1 className="font-satoshi font-bold text-[19px] leading-[23px] text-[#1D2130] text-center self-stretch">{item.header}</h1>
                            <p className="font-satoshi font-normal text-[17px] leading-[20px] text-[#1D2130] text-center self-stretch">{item.body}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}