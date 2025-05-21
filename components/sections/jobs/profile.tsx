"use client"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

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
    const { id } = useParams()
    console.log(id)
    return (
        <div className="relative">
            {/* Background Images - fixed height */}
            <div className="relative h-[639px] w-full">
                <Image
                    src="/images/jobs/image.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
                <Image
                    src="/images/jobs/cover.png"
                    alt="Overlay"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Content Container - positioned over background but with proper flow */}
            <div className="relative container mx-auto px-4 -mt-80 mb-12 z-10">
                <div className="flex flex-col gap-8 w-[1118px] mx-auto items-center">
                    {/* Job Header Card */}
                    <div className="bg-white w-[979px] flex flex-col md:flex-row py-8 px-8 md:px-12 items-start rounded-[10px] gap-8 shadow-lg">
                        <div className="md:w-[270px]">
                            <h1 className="font-satoshi font-bold tracking-[0.9px] leading-normal text-2xl md:text-[31px] text-[#000]">Tech Trainer</h1>
                        </div>
                        <div className="md:w-[481px] flex flex-col items-start md:border-l md:border-l-solid gap-6 md:pl-12">
                            <div className="flex items-center gap-2">
                                <Image src='/images/jobs/icons/location.png' width={24} height={24} alt='icon' priority />
                                <p className="font-satoshi font-normal leading-normal text-lg text-[#000000]">Owerri, Imo State</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <h1 className="font-satoshi font-bold tracking-[0.9px] leading-normal text-lg text-[#000000]">Employment Type:</h1>
                                <p className="font-satoshi font-normal leading-normal text-lg text-[#061A2EBF] tracking-[0.9px]">Full Time</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <h1 className="font-satoshi font-bold tracking-[0.9px] leading-normal text-lg text-[#000000]">Required Experience:</h1>
                                <p className="font-satoshi font-normal leading-normal text-lg text-[#061A2EBF] tracking-[0.9px]">5+</p>
                            </div>
                            <Link href={`/services/jobs/${id}/apply`} className="flex flex-col gap-2 py-3 px-8 rounded-[56px] bg-[#005DFF] hover:bg-[#0045CC] transition-colors">
                                <p className="font-roboto font-medium leading-normal text-sm text-[#fff]">
                                    Apply Now
                                </p>
                            </Link>
                        </div>
                    </div>

                    {/* Job Details */}
                    <div className="w-[1118px] bg-white shadow-lg rounded-[10px] flex flex-col gap-4 p-6 md:p-8">
                        <p className="text-[#061A2E] font-satoshi text-lg font-bold">Job Description</p>
                        <div className="flex flex-col justify-center gap-5">
                            <p className="text-[#061A2E] font-satoshi text-lg font-bold">About the Role</p>
                            <p>Lorem ipsum dolor sit amet consectetur. Amet quisque sapien pellentesque nec sed. Quis congue elementum elementum vitae.</p>

                            <div className="flex flex-col gap-4">
                                <p className="text-[#061A2E] font-satoshi text-lg font-bold">Responsibilities</p>
                                <ul className="list-disc flex flex-col gap-3 pl-6">
                                    {Responsibilities.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-col gap-4">
                                <p className="text-[#061A2E] font-satoshi text-lg font-bold">Requirements</p>
                                <ul className="list-disc flex flex-col gap-3 pl-6">
                                    {Requirements.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-col gap-4">
                                <p className="text-[#061A2E] font-satoshi text-lg font-bold">Benefits</p>
                                <ul className="list-disc flex flex-col gap-3 pl-6">
                                    {Benefits.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-col gap-4">
                                <p className="text-[#061A2E] font-satoshi text-lg font-bold">Equipment/Safety Requirements</p>
                                <p>Safety gear and compliance with electrical safety standards.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center py-[80px]">
                    <h1 className="font-satoshi font-bold text-[#3B3B3B] text-[32px] leading-[35px]">
                        Other Job Openings
                    </h1>
                    <div className="w-[1200px] mx-auto py-[80px] flex justify-between flex-wrap">
                        {[...Array(3)].map((_, index) => (
                            <div
                                key={index}
                                className="w-[384px] p-[32px] flex flex-col gap-[16px] rounded-[20px] border border-[#E4E4E4]"
                            >
                                {/* Job Title and Location */}
                                <div className="flex flex-col gap-[16px]">
                                    <h1 className="font-satoshi font-bold text-[#061A2E] text-[19px]">Tech Trainer</h1>
                                    <div className="flex items-center gap-[4px]">
                                        <Image
                                            src='/images/jobs/icons/location.png'
                                            width={24}
                                            height={24}
                                            alt='location icon'
                                        />
                                        <p className="font-satoshi font-bold text-[#061A2EBF] text-[19px]">
                                            Owerri, Imo State
                                        </p>
                                    </div>
                                </div>

                                {/* Job Description */}
                                <p className="font-satoshi text-[#061A2E] text-[16px]">
                                    Deliver training on emerging technologies such as AI, blockchain, and cybersecurity to individuals and corporate clients.
                                </p>

                                {/* Requirements */}
                                <div className="w-full py-[20px] px-[10px] bg-[#F9F9F9]">
                                    <p className="font-satoshi text-[#061A2E] text-[16px]">
                                        3+ years experience in training or teaching tech, strong communication skills.
                                    </p>
                                </div>

                                {/* Job Type */}
                                <div className="flex items-center gap-[4px]">
                                    <Image
                                        src='/images/jobs/icons/clock.png'
                                        width={24}
                                        height={24}
                                        alt='job type icon'
                                    />
                                    <p className="font-satoshi font-medium text-[#061A2E] text-[19px]">
                                        Full-Time
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-[16px]">
                                    <Link
                                        href='#'
                                        className="py-[12px] px-[33px] rounded-[56px] bg-[#005DFF] hover:bg-[#0045CC] transition-colors"
                                    >
                                        <span className="font-roboto text-white text-[15px]">
                                            Apply Now
                                        </span>
                                    </Link>
                                    <Link
                                        href={`/jobs/${index}`}
                                        className="py-[12px] px-[33px] rounded-[56px] border border-[#005DFF] hover:bg-[#F0F6FF] transition-colors"
                                    >
                                        <span className="font-satoshi font-bold text-[#005DFF] text-[16px]">
                                            Details
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}