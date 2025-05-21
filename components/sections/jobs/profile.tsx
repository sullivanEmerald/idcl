import Image from "next/image"
import Link from "next/link"

const Responsibilities = [
    'Design, develop, and test electrical systems',
    'Ensure compliance with safety and regulatory standards.',
    'Collaborate with cross-functional teams on engineering projects.',
    'Troubleshoot and maintain electrical equipment.',
]

const Requirements = [
    "Bachelor's degree in Electrical Engineering or related field.",
    'Minimum 3 years of experience in electrical design and maintenance.',
    'Proficiency in industry-standard software and tools.',
    'Strong problem-solving and analytical skills.',
]


const Benefits = [
    "Competitive salary package",
    'Health and dental insurance',
    'Retirement plan options',
    'Paid vacation and sick leave',
]


export default function JobProfile() {
    return (
        <section className="relative w-full min-h-[639px] mb-0">
            {/* Background Images */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/jobs/image.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/jobs/cover.png"
                    alt="Overlay"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Content */}
            <div className="relative z-10 w-[896px] top-[125px] left-[120px] flex flex-col gap-[15px]">
                <div className="bg-[#fff] flex py-[30px] px-[52px] items-start rounded-[10px] gap-[52px]">
                    <div className="w-[270px]">
                        <h1 className="font-satoshi font-bold tracking-[0.9px] self-stretch leading-normal text-[31px] text-[#000] ">Tech Trainer</h1>
                    </div>
                    <div className="w-[481px] flex flex-col items-start border-l border-l-solid gap-[30px] pl-[50px]">
                        <div className="flex items-center justify-center gap-[4px]">
                            <Image src='/images/jobs/icons/location.png' width={24} height={24} alt='icon' priority />
                            <p className="font-satoshi font-normal leading-normal text-[18px] text-[#000000] ">Owerri, Imo State</p>
                        </div>
                        <div className="flex items-center justify-center gap-[4px]">
                            <h1 className="font-satoshi font-bold tracking-[0.9px] self-stretch leading-normal text-[18px] text-[#000000] ">Employment Type:</h1>
                            <p className="font-satoshi font-normal leading-normal text-[19px] text-[#061A2EBF] tracking-[0.9px] ">Full Time</p>
                        </div>
                        <div className="flex items-center justify-center gap-[4px]">
                            <h1 className="font-satoshi font-bold tracking-[0.9px] self-stretch leading-normal text-[18px] text-[#000000] ">Required Experience:</h1>
                            <p className="font-satoshi font-normal leading-normal text-[19px] text-[#061A2EBF] tracking-[0.9px]">5+</p>
                        </div>
                        <Link href='#' className="flex flex-col gap-[10px] py-[12px] px-[33px] rounded-[56px] bg-[#005DFF]">
                            <p className="font-roboto font-medium leading-normal text-[15px] text-[#fff]">
                                Apply Now
                            </p>
                        </Link>
                    </div>
                </div>

                <div className="w-[1118px] bg-[#fff] shrink-0">
                    <p>Job Description</p>
                    <div className="w-[1002px] ">
                        <p>About the Role</p>
                        <span>Lorem ipsum dolor sit amet consectetur. Amet quisque sapien pellentesque nec sed. Quis congue elementum elementum vitae.</span>

                        <div>
                            <p className="text-[#061A2E] font-satoshi text-[18px] font-bold leading-[19px]">Responsibilities</p>
                            <ul>
                                {Responsibilities.map((item, index) => (
                                    <li key={index} className="text-[#061A2E] font-satoshi text-[18px] font-normal leading-[100%]">{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <p className="text-[#061A2E] font-satoshi text-[18px] font-bold leading-[19px]" >Requirements</p>
                            <ul>
                                {Requirements.map((item, index) => (
                                    <li key={index} className="text-[#061A2E] font-satoshi text-[18px] font-normal leading-[100%]">{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <p className="text-[#061A2E] font-satoshi text-[18px] font-bold leading-[19px]">Benefits</p>
                            <ul>
                                {Benefits.map((item, index) => (
                                    <li key={index} className="text-[#061A2E] font-satoshi text-[18px] font-normal leading-[100%]">{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}