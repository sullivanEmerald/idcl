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
            <div className="relative z-10 w-[896px] top-[80px] left-[120px] flex flex-col gap-[15px]">
                <h1 className="font-satoshi font-black text-[80px] leading-[89px] w-[896px] tracking-[0.007em] text-[#ffffff]">
                    Empowering Creators Through Intellectual Property Education
                </h1>

                <div className="flex items-center gap-[24px] self-stretch border-l-4 border-[#ffffff] pl-[25px]">
                    <p className="font-satoshi font-medium text-[24px] leading-[34px] tracking-[0.007em] text-[#ffffff] flex-[1_0_0]">
                        Our training programs demystify IP rights for creators, entrepreneurs, and innovators. Learn how to legally protect your ideas and build confidently.
                    </p>
                </div>

                <div className="w-[299px] h-[50px] flex items-center gap-[24px]">
                    <Link
                        className="w-[221px] h-[50px] rounded-[50px] py-[16px] px-[22px] bg-[#fff] flex items-center justify-center border-none no-underline"
                        href="#"
                    >
                        <p className="w-[174px] font-roboto font-medium text-[15px] text-[#373737] leading-[100%] tracking-normal">
                            Join Upcoming Workshop
                        </p>
                    </Link>
                </div>
            </div>
        </section>
    );
}