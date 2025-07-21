import Image from "next/image";

const Questions = [
    {
        question: "Can I reschedule my Tour?",
        answer: "Yes. Simply reply to your confirmation email with your new preferred time.",
    },
    {
        question: "What happens if I arrive without booking?",
        answer: "",
    },
    {
        question: "Is same-day booking possible??",
        answer: "",
    },
    {
        question: "Lorem ipsum dolor sit amet consectetur.",
        answer: "",
    },
];

export default function FoundersFaqs() {
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
            <div className="relative w-full h-auto lg:h-[550px] flex flex-col items-center justify-center">
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

                {/* Content */}
                <div className="h-full flex flex-col lg:flex-row gap-10 lg:gap-[78px] items-center px-4 lg:px-0 py-12 lg:py-0">
                    <div className="flex w-full lg:w-[456px] flex-col items-start gap-6">
                        <h1 className="text-[#3B3B3B] font-satoshi text-[30px] lg:text-[43px] font-bold leading-tight">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-[#000] font-satoshi text-[16px] lg:text-[20px] font-light leading-normal">
                            Everything you need to know about getting started, training, and partnering with IDCL.
                        </p>
                    </div>

                    <div className="flex flex-col w-full lg:w-[605px] items-center gap-[19px]">
                        {Questions.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col p-5 items-start gap-4 w-full rounded-[11px] bg-white shadow-sm"
                            >
                                <div className="flex justify-between items-center w-full">
                                    <h1 className="font-poppins font-bold text-[18px] lg:text-[20px] leading-[28px] text-[#2A3342]">
                                        {item.question}
                                    </h1>
                                    <Image
                                        src="/images/tour/arrow.png"
                                        alt="Toggle"
                                        width={24}
                                        height={24}
                                        className="object-cover"
                                        quality={100}
                                    />
                                </div>
                                {item.answer && (
                                    <p className="font-poppins text-[14px] lg:text-[16px] font-medium leading-[22px] lg:leading-[24px] text-[#556987]">
                                        {item.answer}
                                    </p>
                                )}
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
                height={100}
                className="w-full"
            />
        </section>
    );
}
