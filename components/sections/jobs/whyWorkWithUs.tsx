import Image from "next/image"
const WorkingBenefits = [
    'Competitive salary and benefits packages',
    'Ongoing training and development',
    'Exposure to cutting-edge technology and innovation',
    'Opportunities to collaborate with global industry leaders and partners',
    'A supportive and inclusive work environment focused on career growth',

]
export default function JobsWhyWorkWithUs() {
    return (
        <section className="w-[992px] mx-auto py-[80px] flex flex-col items-center justify-center gap-[37px]">
            <h1 className="text-[#3B3B3B] w-full text-[32px] text-center font-satoshi font-bold text-[#3B3B3B] leading-[35px]">Why Work With Us?</h1>
            <div className="flex flex-col gap-[15px] w-full">
                <p className="w-[992px] text-[#000] font-satoshi text-[20px] font-light leading-normal">
                    At IDCL, we are on a mission to drive digital transformation across West Africa. Our employees are innovators, creators, and pioneers. By joining our team, you will be part of a diverse and inclusive workplace where your skills and ideas matter.
                </p>
                <p className="w-[992px] text-[#000] font-satoshi text-[20px] font-light leading-normal">
                    Whether you're passionate about tech, education, logistics, or business, IDCL offers opportunities for growth and development across multiple sectors.
                </p>
                <p className="w-[992px] text-[#000] font-satoshi text-[20px] font-light leading-normal">As an employee of IDCL, you will enjoy the following benefits:
                </p>
                <ul className="flex flex-col gap-[15px] list-disc pl-[25px]">
                    {WorkingBenefits.map((item, index) => (
                        <li key={index} className="text-[#000] font-satoshi text-[20px] font-light leading-normal">{item}</li>
                    ))}
                </ul>
            </div>
        </section>
    )
}