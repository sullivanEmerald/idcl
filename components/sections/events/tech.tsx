"use client";
import { motion } from "framer-motion";

const TechOccations = [
    {
        image: '/images/tech/one.png',
        alt: 'Tech',
        header: 'Hackathons & Coding Camps',
        body: 'Upload unlimited external lists like tax liens, absentee owners, foreclosure notices — and stack them all.'
    },
    {
        image: '/images/tech/two.png',
        alt: 'Tech',
        header: 'Innovation Labs & Demo Days ',
        body: 'Equipped with digital screens, 3D printers, and live-stream capabilities.'
    },
    {
        image: '/images/tech/three.png',
        alt: 'Tech',
        header: 'Conferences & Keynotes',
        body: 'Fully furnished halls with smart lighting, sound, and video systems.'
    },
    {
        image: '/images/tech/four.png',
        alt: 'Tech',
        header: 'Corporate Meetings & Trainings',
        body: 'Modular seating, whiteboards, and digital presentation tools.'
    },
    {
        image: '/images/tech/five.png',
        alt: 'Tech',
        header: 'Government & NGO Workshops',
        body: 'Secure environment, translation booths, and policy-focused amenities.'
    },
    {
        image: '/images/tech/six.png',
        alt: 'Tech',
        header: 'Startup Showcases ',
        body: 'Pitch-ready stages and networking spaces.'
    },
]
export default function EventsTech() {
    return (
        <motion.section
            className="w-full flex flex-col items-center justify-center py-12 md:py-[50px] gap-8 md:gap-[55px] px-4 sm:px-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.18 }
                }
            }}
        >
            <motion.div
                className="w-full max-w-[1200px] flex items-center justify-center text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
                <h2 className="font-satoshi font-bold text-2xl sm:text-3xl md:text-[32px] leading-[1.1] text-[#3B3B3B]">
                    Tech-Forward Facilities for Every Occasion
                </h2>
            </motion.div>
            <motion.div
                className="w-full max-w-[1200px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-y-[30px]"
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
                {TechOccations.map((item, index) => (
                    <motion.div
                        key={index}
                        className="w-full bg-[#F9FAFB] p-5 md:pt-[21px] md:pr-[19px] md:pb-[13px] md:pl-[19px] rounded-[32px] flex flex-col gap-4 md:gap-[16px]"
                        initial={{ opacity: 0, scale: 0.92, y: 30 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(0,93,255,0.12)" }}
                        whileTap={{ scale: 0.97 }}
                    >
                        {/* Image - responsive while maintaining aspect ratio */}
                        <div className="w-full aspect-video overflow-hidden rounded-lg">
                            <img
                                src={item.image}
                                alt={item.alt}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Content - responsive text sizing */}
                        <div className="flex flex-col gap-4 md:gap-[16px]">
                            <h3 className="font-satoshi font-bold text-base md:text-[16px] leading-tight text-[#1D2939]">
                                {item.header}
                            </h3>
                            <p className="font-satoshi font-light text-sm md:text-[16px] leading-snug md:leading-[1.35] text-[#475467]">
                                {item.body}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    )
}
