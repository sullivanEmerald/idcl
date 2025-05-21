import Image from "next/image"
const PressImages = [
    '/images/innovation/one.png',
    '/images/innovation/two.png',
    '/images/innovation/three.png',
    '/images/innovation/four.png',
    '/images/innovation/five.png',
    '/images/innovation/six.png',
]
export default function InfrastructurePress() {
    return (
        <section className="w-full flex flex-col gap-[17px] items-center justify-center py-[80px]">
            <div className="relative w-[867px] h-[160px] flex flex-col gap-[17px]">
                <div className="w-full h-[35px] flex items-center justify-center ">
                    <p className="font-satoshi font-bold text-[32px] text-[#3B3B3B] leading-[1.1] tracking-normal ">3D Printing Press</p>
                </div>
                <p className="font-satoshi font-light text-[20px] leading-[1] tracking-normal text-center">Our state-of-the-art 3D Printing & Digital Press delivers high-volume printing solutions for startups, government projects, and creative professionals. Whether it's rapid prototyping, signage, event materials, or branded merchandise, IDCL ensures quality, speed, and scalability—empowering innovation and business growth across West Africa.</p>
            </div>
            <div className="w-[1200px] h-[741.29px] flex items-center gap-[9px] flex-wrap">
                {PressImages.map((item, index) => (
                    <Image
                        src={item}
                        key={index}
                        alt="Overlay"
                        width={390.67}
                        height={361.29}
                        className="object-cover block"
                        priority
                    />
                ))}
            </div>
        </section>
    )
}