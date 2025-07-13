import { motion } from "framer-motion";

const WhyUsData = [
    {
        image: '/images/why/prime.png',
        text: 'Prime location in the heart of Owerri'
    },
    {
        image: '/images/why/smart.png',
        text: 'Smart facilities with full tech support'
    },
    {
        image: '/images/why/site.png',
        text: 'On-site guest housing and hospitality'
    },
    {
        image: '/images/why/reliable.png',
        text: 'Reliable power and internet'
    },
    {
        image: '/images/why/skilled.png',
        text: 'Skilled event coordination team'
    },
    {
        image: '/images/why/access.png',
        text: 'Access to West Africa’s top tech talent'
    },
]
export default function EventsWhyUs() {
    return (
        <motion.section
            className="flex flex-col gap-[31px] py-[80px]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
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
                className="flex flex-col items-center justify-center gap-[21px] self-stretch text-[#3B3B3B] font-satoshi font-bold text-[32px] leading-[1.1] tracking-normal"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
                Why Choose IDCL for Your Event?
            </motion.h1>
            <motion.div
                className="flex gap-[31px] w-full flex-wrap items-center justify-center"
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
                {WhyUsData.map((item, index) => (
                    <motion.div
                        key={index}
                        className="w-[263px] h-[202px] pt-[24px] pr-[40px] pb-[16px] pl-[40px] flex flex-col items-center justify-center gap-[16px] bg-[#F9FAFB] rounded-[32px] self-stretch"
                        initial={{ opacity: 0, scale: 0.92, y: 30 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(0,93,255,0.12)" }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <img src={item.image} alt="logo" />
                        <p className="text-center font-figtree font-semibold leading-normal tracking-normal text-[18px] self-stretch ">{item.text}</p>
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    )
}
