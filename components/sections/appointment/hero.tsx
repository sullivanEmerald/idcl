import Image from "next/image"
import Link from "next/link"
export default function AppointmentHeroSection() {
    return (
        <section className="relative w-full h-[601.34px] overflow-hidden">
            <Image
                src="/images/tour/coverimage.png"
                alt="Background"
                fill
                className="object-cover"
                priority
            />

            <Image
                src="/images/about/cover.png"
                alt="Overlay"
                fill
                className="object-cover"
                priority
            />

            <div className="absolute z-10 w-[896.51px] h-[297px] top-[130px] left-[110px] flex-inline flex-col items-start gap-[15px]">
                <h1 className="font-satoshi font-black text-[80px] leading-[1.12] tracking-[0.007em] text-[#ffffff] self-stretch">
                    Book Your Visit to Imo Digital City
                </h1>
                <div className="flex items-center mt-[15px] border-l-4 border-[#ffffff] pl-[25px]">
                    <p className="font-satoshi w-[552px] font-medium text-[24px] leading-[1.42] tracking-[0.007em] text-[#ffffff]">
                        To ensure security, efficiency, and a productive experience, all visits to IDCL must be scheduled in advance. Kindly fill out the form below to request your appointment.
                    </p>
                </div>
            </div>
        </section>
    )
}