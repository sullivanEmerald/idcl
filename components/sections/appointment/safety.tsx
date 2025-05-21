import Image from "next/image"

const PerfectTarget = [
    'Ensure safety for all personnel and guests',
    'Maintain focus and productivity during operations',
    'Allocate the right team members for your consultation',
    'Prepare for a personalized and efficient experience',
]

export default function AppointmentSafety() {
    return (
        <section className="flex items-center justify-center gap-[72px]">
            <Image
                src="/images/appointment/image.png"
                alt="Perfect"
                className="object-cover"
                width={479}
                height={412}
                priority
            />
            <div className="w-[514px] flex flex-col items-start gap-[17px]">
                <p className="self-stretch text-[#3B3B3B] font-satoshi font-bold text-[32px] leading-[35px] self-stretch">For Your Safety and Our Operational Excellence</p>
                <div className="flex flex-col gap-[20px]">
                    <p className="text-[#000] font-satoshi text-[20px] font-light leading-normal">
                        As a high-security innovation hub working with international and government partners, IDCL follows a structured access model. Scheduled appointments help us:
                    </p>
                    <ul className="w-full flex flex-col gap-[15px] px-[27px] list-disc self-stretch">
                        {PerfectTarget.map((item, index) => (
                            <li key={index} className=" w- full text-[#000] font-satoshi text-[20px] font-light leading-normal self-stretch">{item}</li>
                        ))}
                    </ul>
                </div>

            </div>
        </section>
    )
}