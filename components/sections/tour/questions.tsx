import Image from "next/image";

const Questions =
    [
        {
            question: 'Can I reschedule my Tour?',
            answer: 'Yes. Simply reply to your confirmation email with your new preferred time.'
        },

        {
            question: 'What happens if I arrive without booking?',
            answer: ''
        },
        {
            question: 'Is same-day booking possible??',
            answer: ''
        },
        {
            question: 'Lorem ipsum dolor sit amet consectetur.',
            answer: ''
        },
    ]

export default function TourQuestions() {
    return (
        <section className="relative w-full mb-20">
            <Image
                src="/images/tour/upward.png"
                alt="Decorative top element"
                width={1440}
                height={100}
                className="w-full"
            />

            {/* Main content with background image */}
            <div className="relative w-full h-[550px] flex flex-col items-center justify-center">
                {/* Background image */}
                <div className="absolute inset-0 -z-10">
                    <Image
                        src="/images/tour/pattern.png"
                        alt="Background pattern"
                        fill
                        className="object-cover"
                        quality={100}
                    />
                </div>

                {/* Your content goes here */}
                <div className="h-full inline-flex gap-[78px] items-center">
                    <div className="flex w-[456px] flex-col items-start gap-[24px]">
                        <h1 className="self-stretch text-[#3B3B3B] font-satoshi text-[43px] font-bold leading-[47px]">Frequently Asked Questions</h1>
                        <p className="self-stretch text-[#000] font-satoshi text-[20px] font-light leading-normal">Everything you need to know about getting started, training, and partnering with IDCL.</p>
                    </div>

                    <div className="flex flex-col w-[605px] items-center gap-[19px]">
                        {Questions.map((item, index) => (
                            <div key={index} className="flex flex-col p-[20px] items-start gap-[16px] self-stretch rounded-[11px] bg-[#fff]">
                                <div className="flex justify-between items-center self-stretch">
                                    <h1 className="font-poppins font-bold text-[20px] leading-[30px] text-[#2A3342]">{item.question}</h1>
                                    <Image
                                        src="/images/tour/arrow.png"
                                        alt="Background pattern"
                                        width={24}
                                        height={24}
                                        className="object-cover"
                                        quality={100}
                                    />
                                </div>
                                <p className="font-poppins text-[16px] font-medium leading-[24px] text-[#556987]">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Decorative bottom image */}
            <Image
                src="/images/tour/downward.png"
                alt="Decorative bottom element"
                width={1440}
                height={100} // adjust as needed
                className="w-full"
            />
        </section>
    );
}