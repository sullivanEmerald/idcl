import Image from "next/image";
import Link from "next/link";

export default function JobOpenings() {
    return (
        <section className="flex flex-col gap-[30px] sm:gap-[35px] md:gap-[40px] py-[60px] sm:py-[70px] md:py-[80px] items-center justify-center px-4 sm:px-6">
            <div className="flex flex-col gap-[8px] sm:gap-[9px] text-center">
                <h1 className="font-satoshi font-bold leading-[30px] sm:leading-[33px] md:leading-[35px] text-[#3B3B3B] text-[24px] sm:text-[28px] md:text-[32px]">
                    Current Job Openings
                </h1>
                <p className="font-satoshi font-light leading-normal text-[#000] text-[16px] sm:text-[18px] md:text-[20px]">
                    Browse our open positions and apply to become a part of our innovative team.
                </p>
            </div>

            <div className="w-full max-w-[1200px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[16px] md:gap-[20px]">
                {[...Array(12)].map((_, index) => (
                    <div
                        key={index}
                        className="w-full sm:w-[calc(50%-10px)] md:w-[285px] p-4 sm:p-[20px] flex flex-col items-start gap-[12px] sm:gap-[14px] md:gap-[16px] rounded-[10px] border border-[#E4E4E4]"
                    >
                        <div className="flex flex-col items-start gap-[10px] sm:gap-[14px] md:gap-[16px]">
                            <h1 className="font-satoshi font-bold leading-normal text-[#061A2E] text-[18px] sm:text-[19px]">
                                Tech Trainer
                            </h1>
                            <div className="flex items-center justify-center gap-[4px]">
                                <Image
                                    src="/images/jobs/icons/location.png"
                                    width={24}
                                    height={24}
                                    alt="icon"
                                    priority
                                />
                                <p className="font-satoshi font-bold leading-normal text-[17px] sm:text-[18px] text-[#061A2EBF]">
                                    Owerri, Imo State
                                </p>
                            </div>
                        </div>

                        <h2 className="font-satoshi font-normal leading-normal text-[#061A2E] text-[15px] sm:text-[14px] self-stretch">
                            Deliver training on emerging technologies such as AI, blockchain, and cybersecurity to individuals and corporate clients.
                        </h2>

                        <div className="w-full flex py-[16px] sm:py-[18px] md:py-[20px] px-[10px] items-center justify-center gap-[10px] self-stretch bg-[#F9F9F9]">
                            <h2 className="font-satoshi w-full font-normal leading-normal text-[#061A2E] text-[14px]">
                                3+ years experience in training or teaching tech, strong communication skills.
                            </h2>
                        </div>

                        <div className="flex items-center justify-center gap-[4px]">
                            <Image
                                src="/images/jobs/icons/clock.png"
                                width={24}
                                height={24}
                                alt="icon"
                                priority
                            />
                            <p className="font-satoshi font-medium leading-normal text-[#061A2E] text-[14px]">
                                Full-Time
                            </p>
                        </div>

                        <div className="flex gap-[12px] sm:gap-[16px]">
                            <Link
                                href={`/services/jobs/${index}/apply`}
                                className="py-[10px] px-[20px] h-[42px] w-[114px] rounded-[56px] bg-[#005DFF] "
                            >
                                <p className="font-roboto font-normal leading-normal text-[14px] sm:text-[15px] text-[#fff]">
                                    Apply Now
                                </p>
                            </Link>
                            <Link
                                href={`/services/jobs/${index}`}
                                className="py-[12px] px-[32px] h-[42px] rounded-[56px] bg-transparent border border-[#005DFF]"
                            >
                                <p className="font-satoshi font-bold leading-[18px] sm:leading-[19px] text-[15px] sm:text-[16px] text-[#005DFF]">
                                    Details
                                </p>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
