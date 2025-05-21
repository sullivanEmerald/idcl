const WhyUsData = [
    {
        image: '/images/why/prime.png',
        text: 'Prime location in the heart of Owerri'
    },
    {
        image: '/images/why/smart.png',
        text: 'Smart facilities with full tech support'
    },
    {
        image: '/images/why/site.png',
        text: 'On-site guest housing and hospitality'
    },
    {
        image: '/images/why/reliable.png',
        text: 'Reliable power and internet'
    },
    {
        image: '/images/why/skilled.png',
        text: 'Skilled event coordination team'
    },
    {
        image: '/images/why/access.png',
        text: 'Access to West Africa’s top tech talent'
    },
]
export default function EventsWhyUs() {
    return (
        <>
            <section className="flex flex-col gap-[31px] py-[80px]">
                <h1 className="flex flex-col items-center justify-center gap-[21px] self-stretch text-[#3B3B3B] font-satoshi font-bold text-[32px] leading-[1.1] tracking-normal">Why Choose IDCL for Your Event?</h1>
                <div className="flex gap-[31px] w-full flex-wrap items-center justify-center">
                    {WhyUsData.map((item, index) => (
                        <div key={index} className="w-[263px] h-[202px] pt-[24px] pr-[40px] pb-[16px] pl-[40px] flex flex-col items-center justify-center gap-[16px] bg-[#F9FAFB] rounded-[32px] self-stretch">
                            <img src={item.image} alt="logo" />
                            <p className="text-center font-figtree font-semibold leading-normal tracking-normal text-[18px] self-stretch ">{item.text}</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}
