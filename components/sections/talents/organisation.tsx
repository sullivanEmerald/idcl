import Image from "next/image"
const organisation = [
    {
        image: '/images/talent/organisation/one.png',
        body: ' Certified & Job-Ready Candidates'
    },
    {
        image: '/images/talent/organisation/two.png',
        body: 'Quick Turnaround Time'
    },
    {
        image: '/images/talent/organisation/three.png',
        body: 'Africa-Wide Reach'
    },
    {
        image: '/images/talent/organisation/four.png',
        body: 'Proven Placement Success Rate'
    },
    {
        image: '/images/talent/organisation/five.png',
        body: 'Custom Matching System'
    },
    {
        image: '/images/talent/organisation/six.png',
        body: 'Employer Support Post-Hire'
    },
]
export default function TalentOrganisation() {
    return (
        <section className="bg-[#144DAF] w-full h-[659px] py-[112px]">
            <div className="w-[900px] flex flex-col mx-auto gap-[31px] items-center justify-center">
                <h1 className="text-white font-satoshi text-[32px] font-bold leading-[110%] capitalize">Why Organizations Trust IDCL for Talent</h1>
                <div className="flex items-center gap-[30px] self-stretch flex-wrap">
                    {
                        organisation.map((item, index) => (
                            <div key={index} className="flex w-[263px] pt-[35px] pr-[40px] pb-[16px] pl-[40px] flex-col gap-[16px] items-center justify-center self-stretch rounded-[32px] bg-[#F9FAFB]">
                                <Image
                                    src={item.image}
                                    alt="Background"
                                    width={64}
                                    height={64}
                                    className="object-cover"
                                    priority
                                />
                                <p className="self-stretch font-figtree font-bold text-[16px] leading-normal text-[#1D2939] text-center">{item.body}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>

    )
}