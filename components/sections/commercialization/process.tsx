import Image from "next/image"
const TourProcess = [
    {
        stage: "01",
        header: 'Idea Submission',
        body: 'Pitch your concept to our team of experts.',
        color: '#00008E'

    },
    {
        stage: "02",
        header: 'IP Valuation & Assessment',
        body: 'Determine the potential value of your innovation.',
        color: '#005F8E'

    },
    {
        stage: "03",
        header: 'Mentorship & Business Development',
        body: 'Get paired with mentors to shape your product and business model.',
        color: '#008E80'

    },
    {
        stage: "04",
        header: ' Licensing & Legal Support',
        body: 'Ensure your IP is protected and ready for licensing deals.',
        color: '#80008E'

    },
    {
        stage: "05",
        header: 'Market Entry Support',
        body: 'Launch into local and global markets with confidence.',
        color: '#8E3E00'

    },
]
export default function CommercializationProcess() {
    return (
        <section className="w-[1014px] flex flex-col gap-[75px] items-center mx-auto py-[80px] w-[1014px] self-stretch">
            <h1 className="text-[#3B3B3B] text-center font-satoshi font-bold text-[#3B3B3B] text-[32px] leading-[35.2px]">
                Our Support Process
            </h1>
            <div className="w-full flex gap-x-[95px] justify-center items-start flex-wrap">
                {TourProcess.map((item, index) => (
                    <div key={index} className="relative w-[264px] flex-shrink-0">
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