"use client";
import Image from "next/image";
import { motion } from "framer-motion";

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
        <motion.section
            className="w-full flex flex-col gap-4 lg:gap-[17px] items-center justify-center py-10 lg:py-[80px] px-4 lg:px-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.15 }
                }
            }}
        >
            <motion.div
                className="w-full lg:w-[867px] h-auto lg:h-[160px] flex flex-col gap-3 lg:gap-[17px]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
                <div className="w-full h-auto lg:h-[35px] flex items-center justify-center">
                    <h2 className="font-satoshi font-bold text-2xl md:text-3xl lg:text-[32px] text-[#3B3B3B] leading-[1.1] tracking-normal">
                        3D Printing Press
                    </h2>
                </div>
                <p className="font-satoshi font-light text-base md:text-lg lg:text-[20px] leading-normal lg:leading-[1] tracking-normal text-center">
                    Our state-of-the-art 3D Printing & Digital Press delivers high-volume printing solutions for startups, government projects, and creative professionals. Whether it's rapid prototyping, signage, event materials, or branded merchandise, IDCL ensures quality, speed, and scalability—empowering innovation and business growth across West Africa.
                </p>
            </motion.div>
            <motion.div
                className="w-full max-w-[1200px] h-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-y-[35px]"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.12, delayChildren: 0.2 }
                    }
                }}
                initial="hidden"
                animate="visible"
            >
                {PressImages.map((item, index) => (
                    <motion.div
                        key={index}
                        className="w-full flex justify-center items-center"
                        initial={{ opacity: 0, scale: 0.92, y: 30 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        // whileHover={{ scale: 1.03, boxShadow: "0 4px 16px rgba(0,93,255,0.10)" }}
                        viewport={{ once: true, amount: 0.2 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <div className="w-full max-w-[320px] sm:max-w-[260px] md:max-w-[289px]">
                            <Image
                                src={item}
                                alt="3D Printing Press Example"
                                width={289}
                                height={289}
                                className="object-cover rounded-[10px] w-full h-auto"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 289px"
                                priority={index === 0}
                            />
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    );
}