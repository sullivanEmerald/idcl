"use client"
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion'

export default function HeroSection() {
    return (
        <section className="relative w-full h-screen min-h-[500px] md:h-[680px] overflow-hidden">
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-full h-full"
            >
                <Image
                    src="/images/hero2.jpg"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute z-10 w-full px-4 sm:px-6 md:px-8 lg:left-[80px] lg:w-[693px] top-[5%] sm:top-[10%] md:top-[65px] flex flex-col gap-6 sm:gap-8 md:gap-[45px]"
            >
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="font-satoshi font-black text-4xl sm:text-5xl md:text-6xl lg:text-[80px] leading-[1.2] md:leading-[1.12] tracking-[0.007em] text-white w-full lg:w-[639.33px]"
                >
                    Driving Africa's Digital Transformation
                </motion.h1>
                <div className="flex items-center border-l-4 border-white pl-4 sm:pl-6 md:pl-[25px]">
                    <p className="font-satoshi w-full font-medium text-base sm:text-lg md:text-xl lg:text-[24px] leading-[1.4] md:leading-[1.42] tracking-[0.007em] text-white">
                        Where Local Innovation Meets Global Technology
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-[24px]">
                    <Link
                        href='/'
                        className="          
                            rounded-[56px]               
                            py-3 sm:py-4 md:py-[16px] px-4 sm:px-5 md:px-[22px]          
                            bg-white                    
                            no-underline                
                            flex items-center justify-center
                            gap-2 sm:gap-[10px]                          
                            border-none
                            font-roboto font-medium
                            transition-all
                            hover:bg-transparent
                            hover:text-[#F5F9FF]
                            hover:border hover:border-solid hover:border-[#F5F9FF]
                            text-sm sm:text-base
                            w-full sm:w-auto text-center
                        "
                    >
                        Explore Our Ecosystem
                    </Link>
                    <Link
                        href='/'
                        className="         
                            rounded-[56px]               
                            py-3 sm:py-4 md:py-[16px] px-4 sm:px-5 md:px-[22px]          
                            bg-transparent                    
                            no-underline                
                            flex items-center justify-center
                            gap-2 sm:gap-[10px]                   
                            text-[#F5F9FF] 
                            text-sm sm:text-base
                            hover:bg-white
                            hover:border-none 
                            hover:text-[#373737]               
                            transition-all
                            border border-white
                            font-roboto font-medium
                            w-full sm:w-auto text-center
                        "
                    >
                        Partner With Us
                    </Link>
                </div>
            </motion.div>
        </section>
    );
}