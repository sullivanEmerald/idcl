import Image from "next/image";

const organisation = [
    {
        image: '/images/talent/organisation/one.png',
        body: 'Certified & Job-Ready Candidates'
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
];

export default function TalentOrganisation() {
    return (
        <section className="bg-[#144DAF] w-full py-12 lg:py-[112px] lg:h-[659px]">
            <div className="w-full px-4 lg:px-0 lg:w-[900px] flex flex-col mx-auto gap-6 lg:gap-[31px] items-center justify-center">
                <h1 className="text-white font-satoshi text-2xl lg:text-[32px] font-bold leading-[110%] capitalize text-center">
                    Why Organizations Trust IDCL for Talent
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-center lg:gap-[30px] lg:self-stretch lg:flex-wrap justify-center">
                    {organisation.map((item, index) => (
                        <div
                            key={index}
                            className="flex w-full max-w-[263px] sm:w-[263px] pt-6 lg:pt-[35px] px-6 lg:px-[40px] pb-4 lg:pb-[16px] flex-col gap-4 lg:gap-[16px] items-center justify-center rounded-3xl lg:rounded-[32px] bg-[#F9FAFB] mx-auto my-2 lg:my-0"
                        >
                            <Image
                                src={item.image}
                                alt={item.body}
                                width={64}
                                height={64}
                                className="object-cover"
                                priority
                            />
                            <p className="w-full font-figtree font-bold text-sm lg:text-[16px] leading-normal text-[#1D2939] text-center">
                                {item.body}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}