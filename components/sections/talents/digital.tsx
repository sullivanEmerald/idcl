import Image from "next/image";

const PlacementProcesses = [
    {
        header: "Skill Development",
        body: "Candidates undergo world-class training via SkillUp Imo and IDCL-certified bootcamps.",
    },
    {
        header: "Assessment & Certification",
        body: "We test technical skills, soft skills, and real-world readiness.",
    },
    {
        header: "Talent Matching",
        body: "Our system matches talent to job roles based on skill, location, and industry fit.",
    },
    {
        header: "Placement & Support",
        body: "We assist with onboarding and provide continuous performance tracking.",
    },
];

export default function TalentDigital() {
    return (
        <section className="flex flex-col items-center gap-[40px] lg:gap-[60px] mx-auto w-full lg:w-[1134px] px-4 pb-[60px] lg:pb-[80px]">
            <h1 className="text-[#3B3B3B] font-satoshi text-[24px] lg:text-[32px] font-bold leading-[110%] text-center lg:text-left capitalize">
                Our Digital Talent Funnel – From Training to Placement
            </h1>
            <div className="flex flex-col lg:flex-row gap-[26px] lg:gap-[26px] items-center lg:items-stretch self-stretch">
                {PlacementProcesses.map((item, index) => (
                    <div
                        key={index}
                        className="relative flex flex-col items-center gap-[20px] py-[30px] px-[20px] w-full lg:w-[264px] h-auto lg:h-[203px] rounded-[10px] border border-solid border-[#E4E4E4]"
                    >
                        <h2 className="text-[#3B3B3B] text-center font-satoshi font-bold text-[18px] lg:text-[20px] leading-[100%] self-stretch">
                            {item.header}
                        </h2>
                        <p className="text-[#475467] text-center font-satoshi text-[14px] lg:text-[16px] font-medium leading-[135%] self-stretch">
                            {item.body}
                        </p>
                        <p className="absolute top-[-22px] left-1/2 -translate-x-1/2 bg-[#005DFF] rounded-full w-[41px] h-[41px] flex items-center justify-center font-satoshi text-[#fff] font-bold leading-[24px]">
                            {index + 1}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
