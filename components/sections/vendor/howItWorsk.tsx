import Image from "next/image"
const TourProcess = [
    {
        stage: "01",
        header: 'Submit Application',
        body: 'Fill out our online form with your business details.',
        color: '#00008E'

    },
    {
        stage: "02",
        header: 'Verification',
        body: 'We verify licenses, references, and service history.',
        color: '#005F8E'

    },
    {
        stage: "03",
        header: 'Approval & Onboarding ',
        body: 'Approved vendors receive credentials to access projects.',
        color: '#008E80'

    },
    {
        stage: "04",
        header: 'Start Getting Opportunities',
        body: 'Bid on jobs, partner on projects, and grow your business.',
        color: '#8E8000'

    },
]
export default function VendorHowItWorks() {
    return (
        <section className="flex flex-col gap-[75px] items-center mx-auto py-[80px] w-[1014px] justify center self-stretch">
            <h1 className="text-[#3B3B3B] w-full text-[32px] text-center font-satoshi font-bold text-[#3B3B3B] leading-[35px]">
                How It Works
            </h1>
            <div className="flex items-center justify-center gap-[27px] self-stretch w-full ">
                {TourProcess.map((item, index) => (
                    <div key={index} className="relative">
                        <h1
                            className="font-poppins absolute top-[-59px] left-[-11px] font-bold text-[160px] leading-[200px] "
                            style={{ color: item.color, opacity: '0.1' }}
                        >
                            {item.stage}
                        </h1>
                        <div className="flex w-[264px] h-[203px] py-[36px] px-[30px] flex-col justify-center items-center gap-[25px]">
                            <p
                                className="text-[#000] text-center font-satoshi text-[20px] font-bold"
                            >
                                {item.header}
                            </p>
                            <p className="font-satoshi text-[16px] leading-[21px] font-medium text-center text-[#475467] self-stretch ">{item.body}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}