import Image from "next/image";
import Link from "next/link";
import RegisterVendorForm from "./registerVendorForm";

export default function RegisterVendorHeroSection() {
    return (
        <section className="relative w-full h-[639px] mb-0">
            {/* Background Images */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/vendor/image.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/vendor/cover.png"
                    alt="Overlay"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center items-center gap-8 sm:gap-12 lg:gap-[50px] py-12 sm:py-16 lg:py-[80px] px-4 sm:px-6 lg:px-0">
                <div className="w-full max-w-[1001px] flex flex-col items-center justify-center gap-4 sm:gap-6 lg:gap-[23px]">
                    <h1 className="font-satoshi w-full lg:w-[991px] text-4xl sm:text-5xl lg:text-[60px] font-black leading-[1.1] lg:leading-[67px] text-[#fff] text-center">
                        Join Our Ecosystem of Excellence
                    </h1>
                    <p className="font-satoshi w-full lg:w-[882px] text-lg sm:text-xl lg:text-[24px] font-medium text-center leading-relaxed lg:leading-[34px] tracking-[0.168px] text-[#fff] px-2 sm:px-4 lg:px-0">
                        Register your services with Imo Digital City Ltd (IDCL) and become a part of a growing network of reputable vendors driving digital transformation across West Africa.
                    </p>
                </div>
                <RegisterVendorForm />
            </div>
        </section>
    );
}