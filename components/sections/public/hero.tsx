import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function PublicHeroSection() {
    return (
        <section className="relative w-full min-h-[618px] mb-0">
            {/* Background Images */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/public/image.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/public/cover.png"
                    alt="Overlay"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Content */}
            <div className="relative z-10 w-[896px] top-[80px] left-[120px] flex flex-col gap-[15px]">
                <h1 className="font-satoshi font-black text-[80px] leading-[89px] w-[896px] tracking-[0.007em] text-[#ffffff]">
                    Smart Solutions for Government and Business
                </h1>

                <div className="flex items-center gap-[24px] self-stretch border-l-4 border-[#ffffff] pl-[25px]">
                    <p className="font-satoshi font-medium text-[24px] leading-[34px] tracking-[0.007em] text-[#ffffff] flex-[1_0_0]">
                        From e-governance to business process automation, IDCL helps institutions transform digitally—improving efficiency, transparency, and service delivery.
                    </p>
                </div>

                <div className="w-[299px] h-[50px] flex items-center gap-[24px]">
                    <Link
                        className="w-[204px] h-[50px] rounded-[50px] py-[16px] px-[22px] bg-[#fff] flex items-center justify-center border-none no-underline"
                        href="#"
                    >
                        <p className="w-[174px] font-roboto font-medium text-[15px] text-[#373737] leading-[100%] tracking-normal">
                            Request a Consultation
                        </p>
                    </Link>
                </div>
            </div>
        </section>
    );
}