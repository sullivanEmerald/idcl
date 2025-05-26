import Image from "next/image"

export default function VendorNetwork() {
    return (
        <section className="relative w-full h-auto min-h-[200px] sm:min-h-[230px] lg:h-[263px] py-12 sm:py-16 md:py-20 lg:py-[87px] flex flex-col items-center justify-center overflow-hidden bg-[#F5F9FF]">
            <div className="w-full max-w-[320px] sm:max-w-[600px] md:max-w-[750px] lg:w-[867px] px-4 sm:px-6 lg:px-0 flex flex-col gap-6 sm:gap-8 lg:gap-[36px] items-center justify-center">
                <h1 className="font-satoshi font-bold text-xl sm:text-2xl md:text-3xl lg:text-[32px] leading-tight sm:leading-tight md:leading-tight lg:leading-[35px] tracking-normal text-[#3B3B3B] text-center">
                    Why Join the IDCL Vendor Network?
                </h1>
                <p className="w-full font-satoshi font-light text-sm sm:text-base md:text-lg lg:text-[20px] leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-none tracking-normal text-center">
                    Our vendor ecosystem is built on trust, professionalism, and opportunity. Whether you're a freelance expert or a registered company, our platform connects you to high-impact projects in both the public and private sectors.
                </p>
            </div>
        </section>
    )
}