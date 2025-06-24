import Image from "next/image";

export default function UpcomingHeroSection() {
    return (

        <div
            className="w-full h-[401px] relative flex-shrink-0 bg-[url('/images/upcoming/image.png')] bg-cover bg-no-repeat bg-center overflow-hidden"
        >
            <Image
                src="/images/upcoming/cover.png"
                alt="Background"
                fill
                className="object-cover"
                priority
            />

            <div className="absolute z-10 top-[100px] left-[120px] inline-flex flex-col items-start gap-[15px] ">
                <h1 className="font-satoshi font-black text-[80px] leading-[1.12] tracking-[0.007em] text-[#ffffff]">
                    Upcoming Events
                </h1>
                <div className="flex items-center  border-l-4 border-[#ffffff] pl-[25px]">
                    <p className=" w-[552px] font-satoshi self-stretch flex-[1_0_0] font-medium text-[24px] leading-[1.42] tracking-[0.007em] text-[#ffffff]">
                        Where innovation meets experience—host your event in a space built for the future.
                    </p>
                </div>
            </div>
        </div>
    );
}