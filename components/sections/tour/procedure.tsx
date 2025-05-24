import Image from "next/image";

const TourProcess = [
    {
        stage: "01",
        header: 'Fill Out the Booking Form',
        body: 'Choose a date, group size, and area of interest.',
        color: '#00008E'
    },
    {
        stage: "02",
        header: 'Confirmation & Preparation',
        body: 'We\'ll review and confirm your visit by email.',
        color: '#005F8E'
    },
    {
        stage: "03",
        header: 'Visit IDCL Campus',
        body: 'Arrive on your scheduled date for your guided tour.',
        color: '#008E80'
    },
];

export default function TourProcedure() {
    return (
        <section className="w-full max-w-[1014px] mx-auto flex flex-col gap-12 lg:gap-[75px] items-center py-12 lg:py-[80px] px-4 lg:px-0">
            <h1 className="text-[#3B3B3B] w-full text-center font-satoshi font-bold text-xl md:text-2xl lg:text-[32px] leading-normal lg:leading-[35.2px]">
                How to Book a Tour
            </h1>

            <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-[27px]">
                {TourProcess.map((item, index) => (
                    <div key={index} className="relative w-full md:w-1/3 lg:w-[264px]">
                        {/* Large stage number background */}
                        <h1
                            className="font-poppins absolute -top-8 md:-top-12 lg:top-[-59px] -left-2 md:-left-4 lg:left-[-11px] font-bold text-6xl md:text-7xl lg:text-[160px] leading-none md:leading-tight lg:leading-[200px] opacity-10"
                            style={{ color: item.color }}
                        >
                            {item.stage}
                        </h1>

                        {/* Content card */}
                        <div className="w-full lg:w-[264px] h-auto lg:h-[203px] py-6 lg:py-[36px] px-4 lg:px-[30px] flex flex-col justify-center items-center gap-4 lg:gap-[25px] bg-white rounded-lg shadow-sm">
                            <p className="text-black text-center font-satoshi text-base md:text-lg lg:text-[20px] font-bold">
                                {item.header}
                            </p>
                            <p className="font-satoshi text-sm md:text-base lg:text-[16px] leading-normal lg:leading-[21px] font-medium text-center text-[#475467] w-full">
                                {item.body}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}