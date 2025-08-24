import Image from "next/image";

const Questions = [
    {
        question: "Do I need to already have a startup or business idea?",
        answer: "No. This program is about developing founders, not just startups. You don’t need an idea — we’ll help you discover, validate, and build opportunities.",
    },
    {
        question: "Is the program really free?",
        answer: "Yes, 100% free. The program is fully sponsored by Imo State Government and powered by Imo Digital City in partnership with USMAC.",
    },
    {
        question: "Who can apply",
        answer: "Nigerian citizens, ideally between 20–30 years old, with ambition, curiosity, and commitment. Priority is given to applicants from Imo State and the Southeast, but it is open nationwide.",
    },
    {
        question: "How long is the program?",
        answer: "It’s a year-long journey, with in-person bootcamps in Owerri and structured remote mentorship phases.",
    },
    {
        question: "Will I get funding if I join?",
        answer: "This is not a grant or funding program. However, you’ll gain mentorship, global networks, and investor visibility — which often leads to funding opportunities later.",
    },
    {
        question: "What will I gain from the program?",
        answer: "You’ll gain founder mindset training, startup execution skills, global exposure, mentorship from Silicon Valley experts, and the chance to compete for a place in the final Silicon Valley immersion.",
    },
    {
        question: "Do I need to quit my job or school to join?",
        answer: "No. You don’t need to quit, but you must be able to commit to the schedule (in-person bootcamps, remote intensives, and team projects)",
    },
    {
        question: "How are participants selected?",
        answer: "Selection is based on mindset, coachability, problem-solving drive, and commitment — not on prior business success. Both AI pre-screening and human reviewers will evaluate applicants.",
    },
    {
        question: "What happens after the program?",
        answer: "You’ll join the IDCL Alumni Network, with continued access to mentors, opportunities, and future programs. The goal is to set you up for long-term success as a founder.",
    },
    {
        question: "How do I apply?",
        answer: "Click “Apply Now” on the official portal, fill out your profile and essays, and submit before the deadline. Shortlisted applicants will be notified by email and SMS.",
    },
];

export default function FoundersFaqs() {
    return (
        <section className="relative w-full mb-20 mt-20">
            <Image
                src="/images/tour/upward.png"
                alt="Decorative top element"
                width={1440}
                height={100}
                className="w-full"
            />

            {/* Main content with background image */}
            <div className="relative w-full h-auto flex flex-col items-center justify-center">
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

                    <div className="flex flex-col w-full lg:w-[605px] max-h-[550px] overflow-y-auto items-center gap-[19px]">
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
