import Image from "next/image"
const PlacementProcesses = [
    {
        header: 'Application & Screening',
        body: 'Startups apply and are vetted by experienced evaluators.'
    },
    {
        header: 'Incubation',
        body: 'Access to co-working, product dev support, and idea validation.'
    },
    {
        header: 'Acceleration',
        body: 'Mentorship, funding opportunities, and go-to-market support.'
    },
    {
        header: 'Demo Day & Exposure',
        body: 'Pitch to investors, showcase to partners, and expand globally.'
    },
]
export default function StartUpProcedure() {
    return (
        <section className="flex flex-col items-center gap-[60px] w-[1134px] mx-auto py-[80px]">
            <h1 className="text-[#3B3B3B] font-satoshi text-[32px] font-bold leading-[110%] capitalize">
                How Our Startup Funnel Works
            </h1>
            <div className="flex gap-[26px] items-center self-stretch">
                {PlacementProcesses.map((item, index) => (
                    <div key={index} className="flex w-[264px] h-[203px] py-[36px] px-[30px] flex-col items-center gap-[25px] rounded-[10px] border border-solid border-[#E4E4E4] relative">
                        <h2 className="text-[#3B3B3B] w-[204px] text-center font-satoshi font-bold text-[20px] leading-[100%] self-stretch">{item.header}</h2>
                        <p className="text-[#475467] text-center font-satoshi text-[16px] font-medium leading-[21px] self-stretch">{item.body}</p>
                        <p className="flex items-center justify-center bg-[#005DFF] rounded-full w-[41px] h-[41px] font-satoshi text-[#fff] font-bold leading-[24px] absolute top-[-22px] right-[110px]">{index + 1}</p>
                    </div>
                ))}
            </div>
        </section >
    )
}