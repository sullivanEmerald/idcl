import Image from "next/image"
import Link from "next/link"
import RegisterVendorForm from "./registerVendorForm"
export default function RegisterVendorHeroSectio() {
    return (
        <section className="relative w-full min-h-[639px] mb-0">
            {/* Background Images */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/vendor/image.png"
                    alt="Background"
                    width={1440}
                    height={618}
                    className="object-cover"
                    priority
                />
            </div>

            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/vendor/cover.png"
                    alt="Overlay"
                    width={1440}
                    height={618}
                    className="object-cover"
                    priority
                />
            </div>

            {/* Content */}
            <div className="relative z-10  flex flex-col justify-center items-center gap-[50px] py-[80px]">
                <div className="w-[1001px] flex flex-col items-center justify-center gap-[23px] shrink-0">
                    <h1 className="font-satoshi w-[991px] text-[60px] font-black leading-[67px] text-[#fff]"> Join Our Ecosystem of Excellence </h1>
                    <p className="font-satoshi w-[882px] text-[24px] font-medium text-center leading-[34px] tracking-[0.168px] flex-[1_0_0] text-[#fff]">Register your services with Imo Digital City Ltd (IDCL) and become a part of a growing network of reputable vendors driving digital transformation across West Africa.</p>
                </div>
                <RegisterVendorForm />
            </div>
        </section>
    )
}