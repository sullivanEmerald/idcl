import Image from "next/image";

const PartnersVoices = [
    {
        header: '“IDCL’s execution and local expertise made our pilot a success.”',
        body: 'Director, Zinox Education Program',
    },
    {
        header: '“IDCL’s execution and local expertise made our pilot a success.”',
        body: 'Director, Zinox Education Program',
    },
    {
        header: '“IDCL’s execution and local expertise made our pilot a success.”',
        body: 'Director, Zinox Education Program',
    },
];

export default function PartnershipVoices() {
    return (
        <section className="w-full max-w-[1200px] mx-auto py-12 md:py-16 lg:py-[80px] flex flex-col items-center gap-8 md:gap-12 lg:gap-[54px] px-4 sm:px-6">
            <h1 className="text-[#3B3B3B] font-satoshi text-2xl sm:text-3xl lg:text-[32px] font-bold leading-[1.1] lg:leading-[32px]">
                Voices from Our Partners
            </h1>

            <div className="w-full flex flex-col md:flex-row items-center gap-6 md:gap-4 lg:gap-[24px]">
                {PartnersVoices.map((item, index) => (
                    <div
                        key={index}
                        className="w-full md:w-1/2 lg:w-[384px] flex flex-col py-6 md:py-8 lg:py-[26px] px-6 md:px-8 lg:px-[32px] items-start gap-6 md:gap-8 lg:gap-[32px] border border-[#EAEAEA]"
                    >
                        <p className="text-[#616771] font-vietnam text-sm sm:text-[14px] font-normal leading-6 lg:leading-[24px] tracking-tight lg:tracking-[-0.035px]">
                            {item.header}
                        </p>
                        <p className="text-[#282A2D] font-vietnam text-base sm:text-lg lg:text-[18px] font-semibold leading-7 lg:leading-[28px] tracking-tight lg:tracking-[-0.45px]">
                            {item.body}
                        </p>

                        <div className="flex gap-2 lg:gap-[10px]">
                            {[...Array(5)].map((_, i) => (
                                <Image
                                    key={i}
                                    src='/images/testimonial/star.png'
                                    width={22}
                                    height={22}
                                    alt='star'
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}