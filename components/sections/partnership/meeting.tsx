"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "@/components/ui/dialog";
import { Globe, Info, X } from "lucide-react";

const GlobalPartnersCollection = [
    {
        image: '/images/partners/imo.png',
        header: 'Imo State Government',
        body: "Driving digital transformation, the Imo State Government's initiatives like Skill-Up Imo aim to train over 100,000 youths in digital technologies, positioning the state as Nigeria's tech hub",
        website: 'https://imostate.gov.ng/'
    },
    {
        image: '/images/partners/us.png',
        header: 'US Market Access Center (USMAC)',
        body: "Partnering with Imo State to establish a digital city, USMAC brings Silicon Valley expertise to empower Nigerian startups with global market access, mentorship, and investment opportunities.",
        website: 'https://usmarketaccess.com/'
    },
    {
        image: '/images/partners/zinox.png',
        header: 'Zinox Technologies',
        body: "As Nigeria's leading tech manufacturer, Zinox collaborates with Imo State to equip 15,000 youths with digital skills and laptops, fostering a new generation of tech-savvy entrepreneurs.",
        website: 'https://zinoxtechnologies.com/'
    },
    {
        image: '/images/partners/berkeley.png',
        header: 'University of California, Berkeley',
        body: "Through its SkyDeck accelerator, UC Berkeley offers Imo-based startups access to world-class incubation, mentorship, and funding, bridging Nigerian innovation with global opportunities",
        website: 'https://www.berkeley.edu/'
    },
    {
        image: '/images/partners/silicon.png',
        header: 'Silicon Valley Ecosystem',
        body: "Driving digital transformation, the Imo State Government's initiatives like Skill-Up Imo aim to train over 100,000 youths in digital technologies, positioning the state as Nigeria's tech hub.",
        website: 'https://www.siliconvalley.com/'
    },
];

export default function GlobalPartners() {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<null | typeof GlobalPartnersCollection[0]>(null);

    const handleOpen = (item: typeof GlobalPartnersCollection[0]) => {
        setSelected(item);
        setOpen(true);
    };

    return (
        <motion.section
            className="w-full px-4 sm:px-6 mx-auto py-12 sm:py-16 lg:py-[80px] max-w-[1200px]"
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
            <motion.h1
                className="font-satoshi font-bold text-2xl sm:text-3xl lg:text-[32px] text-center leading-[1.1] lg:leading-[35px] mb-6 lg:mb-[27px]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
                Meet Our Global Allies
            </motion.h1>
            <motion.div
                className="flex flex-col items-center sm:flex-row flex-wrap justify-center gap-4 sm:gap-[30px]"
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
                {GlobalPartnersCollection.map((item, index) => (
                    <motion.div
                        key={index}
                        className="w-full sm:w-[calc(50%-15px)] md:w-[calc(33.333%-20px)] lg:w-[256px] flex flex-col items-center gap-3 sm:gap-4 pb-4" // <-- Added pb-4 for bottom padding
                        initial={{ opacity: 0, scale: 0.92, y: 30 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(0,93,255,0.12)" }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <div className="w-[107px] h-[107px] relative overflow-hidden">
                            <Image
                                src={item.image}
                                alt={`${item.header} logo`}
                                fill
                                priority
                                className="object-contain"
                            />
                        </div>

                        <h2 className="text-[#3B3B3B] text-xl sm:text-2xl lg:text-[14px] font-bold leading-[1.2] lg:leading-[26px] text-center">
                            {item.header}
                        </h2>
                        <p className="text-[#000] font-satoshi text-base sm:text-lg lg:text-[14px] font-light leading-relaxed lg:leading-normal text-center">
                            {item.body.length > 110 ? item.body.slice(0, 110) + "..." : item.body}
                        </p>

                        <button
                            onClick={() => handleOpen(item)}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#005DFF] bg-[#f7faff] hover:bg-[#005DFF] hover:text-white transition-colors duration-200 font-roboto text-sm font-medium text-[#005DFF] shadow-sm"
                            style={{ minWidth: 0, width: "auto" }}
                        >
                            <Info className="w-4 h-4" />
                            Learn More
                        </button>
                    </motion.div>
                ))}
            </motion.div>

            {/* Modal */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-[95vw] sm:max-w-[480px] rounded-2xl p-0 overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-white via-[#f7faff] to-[#eaf1ff]">
                    {selected && (
                        <div className="flex flex-col items-center gap-7 py-10 px-6 bg-transparent">
                            <div className="w-28 h-28 relative rounded-full overflow-hidden border-4 border-[#E0E7FF] shadow-lg bg-white mb-2">
                                <Image
                                    src={selected.image}
                                    fill
                                    alt={selected.header}
                                    className="object-contain"
                                />
                            </div>
                            <div className="w-full flex flex-col items-center gap-3">
                                <span className="flex items-center gap-3 text-2xl font-bold text-[#101828]">
                                    <span className="rounded-full bg-[#e3edff] p-2 flex items-center justify-center">
                                        <Globe className="w-6 h-6 text-[#005DFF]" />
                                    </span>
                                    {selected.header}
                                </span>
                                <p className="text-[#222] text-base sm:text-lg font-satoshi text-center leading-relaxed">
                                    {selected.body}
                                </p>
                                <a
                                    href={selected.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#005DFF] text-white font-semibold shadow hover:bg-[#003e99] transition"
                                >
                                    <Globe className="w-4 h-4" />
                                    Visit Website
                                </a>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </motion.section>
    );
}