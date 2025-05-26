import Image from "next/image";
import Link from "next/link";

export default function AwarenessHeroSection() {
    return (
        <section className="relative w-full min-h-[618px] mb-0">
            {/* Background Images */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/awareness/image.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/awareness/cover.png"
                    alt="Overlay"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-5 sm:px-6 lg:px-8 xl:px-[120px] pt-[80px]">
                <div className="max-w-[896px] flex flex-col gap-[15px]">
                    <h1 className="font-satoshi font-black text-[40px] leading-[1.2] sm:text-[50px] md:text-[60px] lg:text-[70px] xl:text-[80px] xl:leading-[89px] tracking-[0.007em] text-white">
                        Empowering Creators Through Intellectual Property Education
                    </h1>

                    <div className="flex items-center gap-[24px] self-stretch border-l-4 border-white pl-[15px] sm:pl-[25px]">
                        <p className="font-satoshi font-medium text-[18px] leading-[1.4] sm:text-[20px] md:text-[22px] lg:text-[24px] lg:leading-[34px] tracking-[0.007em] text-white">
                            Our training programs demystify IP rights for creators, entrepreneurs, and innovators. Learn how to legally protect your ideas and build confidently.
                        </p>
                    </div>

                    <div className="w-full sm:w-[299px] h-[50px] flex items-center gap-[24px] mt-4">
                        <Link
                            className="w-full sm:w-[221px] h-[50px] rounded-[50px] py-[16px] px-[22px] bg-white flex items-center justify-center border-none no-underline hover:bg-opacity-90 transition-all duration-200"
                            href="#"
                        >
                            <p className="font-roboto font-medium text-[15px] text-[#373737] leading-[100%] tracking-normal">
                                Join Upcoming Workshop
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}