import Image from "next/image";
import Link from "next/link";
export default function PartnershipHeroSection() {
    return (
        <section className="relative w-full h-[618px]">
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/partnership/image.png"
                    alt="Background"
                    width={1440}
                    height={618}
                    className="object-cover"
                    priority
                />
            </div>

            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/partnership/cover.png"
                    alt="Overlay"
                    width={1440}
                    height={618}
                    className="object-cover"
                    priority
                />
            </div>

            {/* Text Content (on top of both images) */}
            <div className="relative z-10 flex w-[1167px] top-[150px] left-[120px] flex-col items-start gap-[15px]">
                <h1 className="self-stretch font-satoshi font-black text-[80px] leading-[89px] tracking-[0.56px] text-[#fff]">Together, We Go Further</h1>
                <div className="flex flex-col items-start  px-[20px] justify-center gap-[24px] border-l border-l-[4px] border-l-[#fff] self-stretch ">
                    <p className="font-satoshi font-medium text-[24px] leading-[34px] tracking-[0.168px] text-[#fff] flex-[1_0_0]">We partner with global leaders to co-create programs, drive innovation, and accelerate Africa’s digital transformation. Explore our collaborations and see how your organization can plug in.</p>
                </div>
                <div className="flex items-start gap-[24px]">
                    <Link href='/partnership/apply' className="flex py-[16px] px-[22px] w-[118px] items-center justify-center gap-[10px] rounded-[56px] border-none bg-[#fff] hover:border hover:border-solid hover:border-[#fff] hover:bg-transparent group transition-all">
                        <p className="text-[#373737] group-hover:text-[#fff] font-roboto text-[15px] font-medium leading-normal">Apply Now</p>
                    </Link>
                    <button className="flex py-[16px] px-[22px] items-center justify-center gap-[10px] rounded-[56px] border border-[#fff] bg-transparent hover:bg-[#fff] hover:border-none group transition-all">
                        <p className="text-[#F5F9FF] group-hover:text-[#373737] font-roboto text-[15px] font-medium leading-normal">Download Program Guide</p>
                    </button>
                </div>
            </div>
        </section>
    );
}