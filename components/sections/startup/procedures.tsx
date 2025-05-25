import Image from "next/image";

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
];

export default function StartUpProcedure() {
    return (
        <section className="flex flex-col items-center gap-8 sm:gap-12 lg:gap-[60px] w-full px-4 sm:px-6 lg:px-8 xl:w-[1134px] mx-auto py-12 sm:py-16 lg:py-[80px]">
            <h1 className="text-[#3B3B3B] font-satoshi text-2xl sm:text-3xl lg:text-[32px] font-bold leading-[110%] capitalize text-center">
                How Our Startup Funnel Works
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-4 sm:gap-6 lg:gap-[26px] w-full lg:items-center lg:self-stretch">
                {PlacementProcesses.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center gap-4 sm:gap-6 lg:gap-[25px] w-full sm:w-auto lg:w-[264px] h-auto sm:h-[203px] py-6 sm:py-8 lg:py-[36px] px-4 sm:px-6 lg:px-[30px] rounded-lg lg:rounded-[10px] border border-solid border-[#E4E4E4] relative"
                    >
                        <h2 className="text-[#3B3B3B] w-full lg:w-[204px] text-center font-satoshi font-bold text-lg sm:text-xl lg:text-[20px] leading-[100%]">
                            {item.header}
                        </h2>
                        <p className="text-[#475467] text-center font-satoshi text-sm sm:text-base lg:text-[16px] font-medium leading-normal lg:leading-[21px]">
                            {item.body}
                        </p>
                        <p className="flex items-center justify-center bg-[#005DFF] rounded-full w-8 h-8 sm:w-10 sm:h-10 lg:w-[41px] lg:h-[41px] font-satoshi text-white text-sm sm:text-base lg:text-lg font-bold leading-none lg:leading-[24px] absolute -top-4 sm:-top-5 lg:-top-[22px] left-1/2 transform -translate-x-1/2 lg:right-[110px] lg:left-auto lg:transform-none">
                            {index + 1}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}