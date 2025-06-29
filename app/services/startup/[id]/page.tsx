"use client"
import { startupService } from "@/services/startup";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import StartupProfileSkeleton from "@/skeleton/profile";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const founders = [
    {
        image: '/images/startup/founder.png',
        name: 'John Doe',
        position: 'position',
        social: [
            {
                icon: '/images/about/icons/Facebook.png',
                href: ''
            },
            {
                icon: '/images/about/icons/Twitter.png',
                href: ''
            },
            {
                icon: '/images/about/icons/Instagram.png',
                href: ''
            },
        ]
    },

]

const Crises = {
    Access: {
        list: [
            'Over 60% of rural communities in Northern Nigeria lack access to basic healthcare.',
            'Patients travel 10–30km to see a doctor, often by foot or motorcycle.',
            'Preventable diseases remain untreated due to distance and cost barriers.'
        ]
    },

    Solution: {
        list: [
            "GPS-tracked mobile clinic vans staffed with nurses and solar-powered diagnostic",
            'Real-time access to doctors via tablet-based telehealth',
            'Local health workers trained for follow-up care'
        ]
    }
}


export default function StartUpProfilePage() {
    const router = useRouter();
    const { id } = useParams();
    const [isloading, setIsLoading] = useState(true)
    const [startupProfile, setStartupProfile] = useState({
        name: '',
        industry: '',
        date: '',
        logo: '',
        location: '',
        founded: '',
        track: '',
        reach: '',
        region: '',
        size: '',
        funds: '',
        support: '',
        founderstory: ''
    })

    useEffect(() => {
        const getStartUp = async () => {
            try {
                const data = await startupService.getStartUp(id as string)
                setStartupProfile({
                    name: data.name,
                    industry: data.industry,
                    date: data.date,
                    logo: data.logo,
                    location: data.location,
                    founded: data.date,
                    track: data.track,
                    reach: data.reach,
                    region: data.region,
                    size: data.size,
                    funds: data.funds,
                    support: data.support,
                    founderstory: data.story
                })
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    console.error(error.response?.data?.message || "An error occurred. Retry");
                } else {
                    console.error("An unexpected error occurred");
                }
                toast.error('startup not found. view again')
                router.push('/services/startup')
            } finally {
                setIsLoading(false)
            }
        }

        getStartUp();
    }, [id])

    return (
        <section className="relative w-full h-auto sm:h-[391px] lg:h-[500px]">
            <div className="absolute inset-0 -z-10 hidden sm:block">
                <Image
                    src="/images/startup/heroimage.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>


            <div className="absolute inset-0 -z-10 hidden sm:block">
                <Image
                    src="/images/startup/risecover.png"
                    alt="Overlay"
                    fill
                    className="object-cover"
                    priority
                />
            </div>


            <div className="absolute inset-0 -z-10 sm:hidden bg-gray-100">
                {/* You might want to add a mobile-specific background here */}
            </div>


            {isloading ? <StartupProfileSkeleton /> : (
                <div className="relative flex justify-center items-center min-h-[80vh] px-4 sm:px-8 md:px-12 lg:px-[200px] py-8 sm:py-12 md:py-16 lg:py-[139px]">
                    <section className="flex flex-col lg:inline-flex items-start gap-4 lg:gap-[25px]">
                        {/* Logo - shown above on mobile, inline on lg */}
                        <div className="lg:hidden self-center w-28 h-28 relative rounded-full overflow-hidden border-4 border-[#E0E7FF] shadow-lg bg-white mb-2">
                            <Image
                                src={startupProfile.logo}
                                alt="Startup-logo"
                                fill
                                priority
                                className="object-contain w-full h-full"
                            />
                        </div>

                        {/* Original logo position - hidden on mobile, shown on lg */}
                        <div className="w-28 h-28 relative rounded-full overflow-hidden border-4 border-[#E0E7FF] shadow-lg bg-white mb-2">
                            <Image
                                src={startupProfile.logo}
                                alt="Startup-logo"
                                fill
                                priority
                                className="object-contain w-full h-full"
                            />
                        </div>

                        <main className="flex flex-col items-start gap-4 lg:gap-[26px] w-full lg:w-[643px]">
                            {/* Title Section */}
                            <div className="flex flex-col py-4 lg:py-[20px] px-4 lg:px-[30px] items-start gap-2 lg:gap-[11px] self-stretch rounded-[10px] bg-[#fff] border border-[#E4E4E4]">
                                <h1 className="font-satoshi font-bold text-xl lg:text-[26px] self-stretch text-[#475467] leading-tight lg:leading-[26px]">MediBridge</h1>
                                <div className="flex w-[74px] py-1 lg:py-[4px] px-1.5 lg:px-[6px] items-center justify-center gap-2 lg:gap-[10px] bg-[#1E1E1E] rounded-[8px]">
                                    <p className="text-[#F5F9FF] font-satoshi font-bold text-xs lg:text-[12px] leading-4 lg:leading-[16px] capitalize">
                                        {startupProfile.industry}
                                    </p>
                                </div>
                            </div>

                            {/* Profile Data - stacked on mobile, original on lg */}
                            <div className="flex p-4 lg:p-[20px] flex-col items-center justify-center bg-[#fff] gap-2 lg:gap-[6px] self-stretch rounded-[10px] border border-[#E4E4E4]">
                                {[
                                    { label: "Stage", value: "Growth" },
                                    { label: "Location", value: startupProfile.location },
                                    { label: "Date Founded", value: startupProfile.date },
                                    { label: "Program Track", value: startupProfile.track },
                                    { label: "Audience Reached", value: startupProfile.reach },
                                    { label: "Regions Covered", value: startupProfile.region },
                                    { label: "Team Size", value: startupProfile.size },
                                    { label: "Funding Raised", value: startupProfile.funds },
                                    { label: "Support Received", value: startupProfile.support },
                                ].map((item, index) => (
                                    <div key={index} className='flex flex-col sm:flex-row items-start sm:items-center gap-2 lg:gap-[9px] self-stretch w-full'>
                                        <div className="flex p-2 lg:p-[10px] w-full sm:w-[158px] items-center gap-2 lg:gap-[10px] border border-[#E4E4E4]">
                                            <p className="font-satoshi font-bold text-sm lg:text-[16px] leading-5 lg:leading-[21px] text-[#475467]">{item.label}</p>
                                        </div>
                                        <div className="flex p-2 lg:p-[10px] items-center gap-2 lg:gap-[10px] border border-[#E4E4E4] w-full sm:flex-[1_0_0] bg-gray-50">
                                            <p className="font-satoshi font-medium text-sm lg:text-[16px] leading-5 lg:leading-[21px] text-[#475467] capitalize">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Text sections - responsive padding */}
                            <div className="flex p-4 lg:p-[20px] flex-col justify-center items-center gap-4 lg:gap-[16px] self-stretch border border-[#E4E4E4] rounded-[10px]">
                                <h1 className="font-satoshi font-bold text-lg lg:text-[18px] leading-5 lg:leading-[18px] text-[#475467] self-stretch">
                                    {startupProfile.founderstory}
                                </h1>
                            </div>

                            <div className="flex p-4 lg:p-[20px] flex-col justify-center items-start gap-4 lg:gap-[16px] self-stretch border border-[#E4E4E4] rounded-[10px]">
                                <h1 className="font-satoshi self-stretch text-[#475467] text-lg lg:text-[18px] font-bold leading-5 lg:leading-[18px]">A Crisis of Access</h1>
                                <ul className="list-disc pl-5 lg:pl-[30px] space-y-2">
                                    {Crises['Access'].list.map((item, index) => (
                                        <li key={index} className="font-satoshi self-stretch text-[#475467] text-base lg:text-[18px] font-normal leading-6 lg:leading-[27px]">{item}</li>
                                    ))}
                                </ul>
                                <h1 className="font-satoshi self-stretch text-[#475467] text-lg lg:text-[18px] font-bold leading-5 lg:leading-[18px]">MediBridge's Solution:</h1>
                                <ul className="list-disc pl-5 lg:pl-[30px] space-y-2">
                                    {Crises['Solution'].list.map((item, index) => (
                                        <li key={index} className="font-satoshi self-stretch text-[#475467] text-base lg:text-[18px] font-normal leading-6 lg:leading-[27px]">{item}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Founders - 2 columns on mobile, original on lg */}
                            <div className="flex flex-col pt-4 lg:pt-[20px] pr-4 lg:pr-[20px] pb-8 lg:pb-[50px] pl-4 lg:pl-[20px] self-stretch gap-4 lg:gap-[30px] rounded-[10px] border border-[#E4E4E4]">
                                <h1 className="self-stretch text-[#475467] font-satoshi text-lg lg:text-[18px] font-bold leading-5 lg:leading-[18px]">Founders</h1>
                                <div className="grid grid-cols-2 lg:flex lg:flex-wrap gap-4 lg:gap-[38px]">
                                    {founders.map((item, index) => (
                                        <div key={index} className="w-full lg:w-[175px] flex items-center flex-col justify-between h-[200px] lg:h-[220px]">
                                            <Image
                                                src={item.image}
                                                alt="Founder"
                                                width={88}
                                                height={88}
                                                className="object-cover"
                                                priority
                                            />
                                            <div className="flex flex-col items-center justify-center">
                                                <p className="font-poppins font-semibold text-base lg:text-[18px] leading-6 lg:leading-[28px] text-[#333F51]">{item.name}</p>
                                                <p className="font-poppins font-medium text-base lg:text-[18px] leading-6 lg:leading-[28px] text-[#005DFF]">{item.position}</p>
                                            </div>
                                            <div className="w-[104px] flex items-center justify-between">
                                                {item.social.map((item, index) => (
                                                    <Link key={index} href={item.href}>
                                                        <Image
                                                            src={item.icon}
                                                            alt="Social Icon"
                                                            width={24}
                                                            height={24}
                                                            className="object-cover"
                                                            priority
                                                        />
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </main>
                    </section>
                </div>
            )}

            {/* Optional: If you want to show the "Meet Our Rising Stars" text responsively */}
            {/* <h1 className="relative z-10 w-full px-4 sm:px-8 md:px-12 lg:w-[896px] lg:top-[160px] lg:left-[120px] self-stretch font-satoshi font-black text-3xl sm:text-4xl md:text-5xl lg:text-[80px] leading-tight sm:leading-snug md:leading-normal lg:leading-[89px] tracking-wide lg:tracking-[0.56px] text-white">
                Meet Our Rising Stars
            </h1> */}
        </section>
    )
}
