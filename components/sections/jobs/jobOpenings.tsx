
import Image from "next/image";
import Link from "next/link";

export default function JobOpenings() {
    return (
        <>
            <section className="flex flex-col gap-[40px] items-center justify-center">
                <div className="flex flex-col gap-[9px]">
                    <h1 className="font-satoshi font-bold text-center leading-[35px] text-[#3B3B3B] text-[32px]">Current Job Openings</h1>
                    <p className="font-satoshi font-light leading-normal text-center text-[#000] text-[20px]">Browse our open positions and apply to become a part of our innovative team.</p>
                </div>
                <div className="w-[1200px] flex items-start gap-[23px] flex-wrap">
                    {[...Array(12)].map((_, index) => (
                        <div key={index} className="flex w-[384px] p-[32px] flex-col items-start gap-[16px] rounded-[20px] border border-[#E4E4E4]">
                            <div className="flex flex-col items-start gap-[16px]">
                                <h1 className="font-satoshi font-bold leading-normal text-[#061A2E] text-[19px] ">Tech Trainer</h1>
                                <div className="flex items-center justify-center gap-[4px]">
                                    <Image src='/images/jobs/icons/location.png' width={24} height={24} alt='icon' priority />
                                    <p className="font-satoshi font-bold leading-normal text-[19px] text-[#061A2EBF] ">Owerri, Imo State</p>
                                </div>
                            </div>
                            <h2 className="font-satoshi font-normal leading-normal text-[#061A2E] text-[16px] self-stretch ">Deliver training on emerging technologies such as AI, blockchain, and cybersecurity to individuals and corporate clients.</h2>
                            <div className="w-[320px] h-[] 84px flex py-[20px] px-[10px] items-center justify-center gap-[10px] self-stretch bg-[#F9F9F9]">
                                <h2 className="font-satoshi w-[300px] font-normal leading-normal text-[#061A2E] text-[16px] flex-[1_0_0] ">3+ years experience in training or teaching tech, strong communication skills.</h2>
                            </div>
                            <div className="flex items-center justify-center gap-[4px]">
                                <Image src='/images/jobs/icons/clock.png' width={24} height={24} alt='icon' priority />
                                <p className="font-satoshi font-medium leading-normal text-[#061A2E] text-[19px] ">Full-Time</p>
                            </div>
                            <div className="flex items-start gap-[16px]">
                                <Link href={`/jobs/${index}/apply`} className="flex flex-col gap-[10px] py-[12px] px-[33px] rounded-[56px] bg-[#005DFF]">
                                    <p className="font-roboto font-normal leading-normal text-[15px] text-[#fff]">
                                        Apply Now
                                    </p>
                                </Link>
                                <Link href={`/jobs/${index}`} className="flex flex-col gap-[10px] py-[12px] px-[33px] rounded-[56px] bg-transparent border border-[#005DFF]">
                                    <p className="font-Satoshi font-bold leading-[19px] text-[16px] text-[#005DFF]">
                                        Details
                                    </p>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}