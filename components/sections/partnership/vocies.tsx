import Image from "next/image"

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

]

export default function PartnershipVoices() {
    return (
        <section className="w-[1200px] py-[80px] flex flex-col items-center gap-[54px] mx-auto">
            <h1 className="text-[#3B3B3B] font-satoshi text-[32px] font-bold leading-[32px]">Voices from Our Partners</h1>
            <div className="flex items-center gap-[24px] self-stretch">
                {PartnersVoices.map((item, index) => (
                    <div key={index} className="w-[384px] flex flex-col py-[26px] px-[32px] items-start gap-[32px] border border-[#EAEAEA]">
                        <p className="text-[#616771] font-vietnam text-[14px] font-normal leading-[24px] tracking-[-0.035px]">{item.header}</p>
                        <p className="text-[#282A2D] font-vietnam text-[18px] font-semibold leading-[28px] traking-[-0.45px]">{item.body}</p>

                        <div className="flex gap-[10px]">
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
    )
}