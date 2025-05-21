import Image from "next/image"
const PlacementProcesses = [
    {
        header: 'Skill Development',
        body: 'Candidates undergo world-class training via SkillUp Imo and IDCL-certified bootcamps.'
    },
    {
        header: 'Assessment & Certification',
        body: 'We test technical skills, soft skills, and real-world readiness.'
    },
    {
        header: 'Talent Matching',
        body: 'Our system matches talent to job roles based on skill, location, and industry fit.'
    },
    {
        header: 'Placement & Support',
        body: 'We assist with onboarding and provide continuous performance tracking.'
    },
]
export default function TalentDigital() {
    return (
        <section className="flex flex-col items-center gap-[60px] mx-auto w-[1134px] pb-[80px]">
            <h1 className="text-[#3B3B3B] font-satoshi text-[32px] font-bold leading-[110%] capitalize">
                Our Digital Talent Funnel – From Training to Placement
            </h1>
            <div className="flex gap-[26px] items-center self-stretch">
                {PlacementProcesses.map((item, index) => (
                    <div key={index} className="flex w-[264px] h-[203px] py-[36px] px-[30px] flex-col items-center gap-[25px] rounded-[10px] border border-solid border-[#E4E4E4] relative">
                        <h2 className="text-[#3B3B3B] text-center font-satoshi font-bold text-[20px] leading-[100%] self-stretch">{item.header}</h2>
                        <p className="text-[#475467] text-center font-satoshi text-[16px] font-medium leading-[135%] self-stretch">{item.body}</p>
                        <p className="flex items-center justify-center bg-[#005DFF] rounded-full w-[41px] h-[41px] font-satoshi text-[#fff] font-bold leading-[24px] absolute top-[-22px] right-[110px]">{index + 1}</p>
                    </div>
                ))}
            </div>
        </section >
    )
}