import Image from "next/image";

const Benefits = [
    {
        image: '/images/vendor/icons/one.png',
        header: 'Access to Projects',
        body: 'Secure high-value contracts and gain recurring business.'
    },
    {
        image: '/images/vendor/icons/two.png',
        header: 'Network Expansion',
        body: 'Work with local startups, government agencies, and global tech partners.'
    },
    {
        image: '/images/vendor/icons/three.png',
        header: 'Build Credibility',
        body: 'Strengthen your brand by affiliating with IDCL.'
    },
    {
        image: '/images/vendor/icons/four.png',
        header: 'Timely Notifications',
        body: 'Get notified about tenders, vendor fairs, and partnership opportunities.'
    },
];

export default function VendorBenefits() {
    return (
        <section className="flex flex-col gap-8 md:gap-9 lg:gap-[36px] py-12 md:py-16 lg:py-[80px] items-center justify-center px-4 sm:px-6 lg:px-0">
            <h1 className="font-satoshi text-center font-bold text-2xl sm:text-3xl lg:text-[32px] leading-snug lg:leading-[35px] text-[#3B3B3B] w-full">
                Key Benefits
            </h1>

            <div className="w-full max-w-[1197px] grid grid-cols-1 sm:grid-cols-2 lg:flex lg:justify-between items-center gap-8 md:gap-10 lg:gap-0">
                {Benefits.map((item, index) => (
                    <div
                        key={index}
                        className="flex w-full sm:w-[calc(50%-20px)] lg:w-[241px] p-3 lg:p-[10px] flex-col items-center justify-center gap-6 lg:gap-[26px] shrink-0 hover:scale-[1.02] transition-transform duration-200"
                    >
                        <div className="w-[60px] h-[60px] sm:w-[65px] sm:h-[65px] lg:w-[73px] lg:h-[73px] relative">
                            <Image
                                src={item.image}
                                alt={item.header}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center gap-3 lg:gap-[14px] w-full max-w-[221px]">
                            <h1 className="font-satoshi font-bold text-lg lg:text-[19px] leading-tight lg:leading-[23px] text-[#1D2130] text-center w-full">
                                {item.header}
                            </h1>
                            <p className="font-satoshi font-normal text-base lg:text-[17px] leading-snug lg:leading-[20px] text-[#1D2130] text-center w-full">
                                {item.body}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}