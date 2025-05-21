import Image from "next/image"

const HiringMethods = [
    'Fill the Employer Request Form',
    'Specify Job Role, Skillset, and Duration',
    'Review Shortlisted Profiles',
    'Schedule Interviews or Request Direct Placement',
]

export default function TalentHire() {
    return (
        <section className="mx-auto">
            <section className="flex w-[1201px] flex-col items-center justify-center gap-[53px]">
                <div className="flex w-[620px] flex-col items-center gap-[21px]">
                    <h1 className="font-satoshi font-bold text-[32px] leading-[35px] text-[#3B3B3B]">Looking to hire?</h1>
                    <p className="font-satoshi text-[20px] text-[#000] font-light leading-normal">Submit your talent request in just a few steps</p>
                </div>
                <div className="w-full flex flex-col items-start self-stretch relative ">
                    {HiringMethods.map((item, index, arr) => (
                        <div key={index} className={`border-t py-[25px] border-[#C5C5C5] w-full ${index === arr.length - 1 ? 'border-b border-[#C5C5C5] ' : ''} `}>
                            <div className="flex items-center gap-[40px]">
                                <h1 className="font-satoshi font-medium leading-none tracking-normal text-[38px] text-[#030303B2]">{`0${index + 1}`}</h1>
                                <p className="font-satoshi font-medium text-[30px] leading-none tracking-normal text-[#030303B2]">{item}</p>
                            </div>
                        </div>
                    ))}
                    <Image
                        src='/images/talent/overlay.png'
                        alt="Background"
                        width={348}
                        height={274}
                        className="object-cover absolute top-[45px] right-[35px]"
                        priority
                    />
                </div>
                <button className="flex py-[12px] px-[33px] justify-center items-center gap-[10px] rounded-[56px] bg-[#005DFF] ">
                    <p className="font-roboto text-[15px] font-medium text-[#fff]">Submit a Request Now</p>
                </button>
            </section>
        </section>
    )
}