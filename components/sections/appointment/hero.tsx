import Image from "next/image"
export default function AppointmentHeroSection() {
    return (
        <section className="relative w-full h-[420px] sm:h-[480px] md:h-[540px] lg:h-[601px] overflow-hidden">
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

            <div className="
                absolute z-10
                w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[800px] lg:max-w-[896.51px]
                px-4 sm:px-8 left-[10px] lg:left-[120px] top-[80px] lg:top-[100px]
                flex flex-col items-center lg:items-start gap-4 lg:gap-[15px]
            ">
                <h1 className="font-satoshi font-black text-3xl sm:text-5xl md:text-6xl lg:text-[80px] leading-[1.12] tracking-[0.007em] text-[#ffffff] text-center lg:text-left">
                    Book Your Visit to Imo Digital City
                </h1>
                <div className="flex items-center mt-4 lg:mt-[15px] border-l-4 border-[#ffffff] pl-4 lg:pl-[25px] w-full">
                    <p className="font-satoshi font-medium text-base sm:text-lg md:text-xl lg:text-[24px] leading-[1.42] tracking-[0.007em] text-[#ffffff] text-center lg:text-left w-full lg:w-[552px]">
                        To ensure security, efficiency, and a productive experience, all visits to IDCL must be scheduled in advance. Kindly fill out the form below to request your appointment.
                    </p>
                </div>
            </div>
        </section>
    )
}