import Image from "next/image";
import Link from "next/link";
export default function HeroSection() {
    return (
        <section className="relative w-full h-[680px] ">
            <Image
                src="/images/hero2.jpg"
                alt="Background"
                fill
                className="object-cover"
                priority
            />
            <div className="absolute z-10 w-[693px] items-start top-[65px] left-[120px] flex flex-col gap-[45px]">
                <h1 className="font-satoshi font-black text-[80px] leading-[1.12] tracking-[0.007em] text-[#ffffff] w-[639.33px]">
                    Driving Africa’s Digital Transformation
                </h1>
                <div className="flex items-center mt-[15px] border-l-4 border-[#ffffff] pl-[25px]">
                    <p className="font-satoshi w-[552px] font-medium text-[24px] leading-[1.42] tracking-[0.007em] text-[#ffffff]">
                        Where Local Innovation Meets Global Technology
                    </p>
                </div>
                <div className="flex items-center gap-[24px]">
                    <Link
                        href='/'
                        className="          
                            rounded-[56px]               
                            py-[16px] px-[22px]          
                            bg-white                    
                            no-underline                
                            flex items-center justify-center
                            gap-[10px]                          
                            border-none
                            font-roboto font-medium
                            transition-all
                            hover:bg-transparent
                            hover:text-[#F5F9FF]
                            hover:border-[1px] hover:border-solid hover:border-[#F5F9FF]
                        "
                    >
                        Explore Our Ecosystem
                    </Link>
                    <Link
                        href='/'
                        className="         
                        rounded-[56px]               
                        py-[16px] px-[22px]          
                        bg-transparent                    
                        no-underline                
                        flex items-center justify-center
                        gap-[10px]                   
                        text-[#F5F9FF] 
                        text-[15px] 
                        hover:bg-white
                        hover:border-none 
                        hover:text-[#373737]               
                        transition-all
                        border border-[#ffffff]
                        font-roboto font-medium
                        font-roboto font-medium
                    "
                    >
                        Partner With Us
                    </Link>
                </div>
            </div>
        </section >
    );
}