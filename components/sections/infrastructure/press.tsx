"use client"
import Image from "next/image";

const PressImages = [
    '/images/innovation/one.png',
    '/images/innovation/two.png',
    '/images/innovation/three.png',
    '/images/innovation/four.png',
    '/images/innovation/five.png',
    '/images/innovation/six.png',
    '/images/innovation/four.png',
    '/images/innovation/four.png',
];

export default function InfrastructurePress() {
    return (
        <section className="w-full flex flex-col gap-4 lg:gap-[17px] items-center justify-center py-10 lg:py-[80px] px-4 lg:px-0">
            {/* Text Section */}
            <div className="w-full lg:w-[867px] h-auto lg:h-[160px] flex flex-col gap-3 lg:gap-[17px]">
                <div className="w-full h-auto lg:h-[35px] flex items-center justify-center">
                    <h2 className="font-satoshi font-bold text-2xl md:text-3xl lg:text-[32px] text-[#3B3B3B] leading-[1.1] tracking-normal">
                        3D Printing Press
                    </h2>
                </div>
                <p className="font-satoshi font-light text-base md:text-lg lg:text-[20px] leading-normal lg:leading-[1] tracking-normal text-center">
                    Our state-of-the-art 3D Printing & Digital Press delivers high-volume printing solutions for startups, government projects, and creative professionals. Whether it's rapid prototyping, signage, event materials, or branded merchandise, IDCL ensures quality, speed, and scalability—empowering innovation and business growth across West Africa.
                </p>
            </div>

            {/* Image Grid */}
            <div className="w-full max-w-[1200px] h-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-y-[35px]">
                {PressImages.map((item, index) => (

                    <Image
                        key={index}
                        src={item}
                        alt="3D Printing Press Example"
                        width={289}
                        height={289}
                        className="object-cover rounded-[10px]"
                    />

                ))}
            </div>
        </section>
    );
}