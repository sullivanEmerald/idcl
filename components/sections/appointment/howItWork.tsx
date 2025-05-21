import Image from "next/image"
const TourProcess = [
    {
        stage: "01",
        header: 'Submit Appointment Request',
        body: 'Fill in your details and specify the purpose of your visit.',
        color: '#00008E'

    },
    {
        stage: "02",
        header: 'Receive Confirmation Email',
        body: 'Our team will review your request and send a confirmation with date and time.',
        color: '#005F8E'

    },
    {
        stage: "03",
        header: 'Gain Access on Appointment Day',
        body: 'Present your appointment confirmation at the entrance. Walk-ins without prior approval will be declined.',
        color: '#008E80'

    },
]
export default function AppointmentHowItWorks() {
    return (
        <section className="flex flex-col gap-[75px] items-center mx-auto py-[80px] w-[1014px] justify center self-stretch">
            <h1 className="text-[#3B3B3B] w-full text-center font-satoshi font-bold text-[#3B3B3B] leading-[35.2px]">
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