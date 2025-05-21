import Image from "next/image"
const Register = [
    {
        image: '/images/vendor/register/one.png',
        header: 'IT & Software Development',
    },
    {
        image: '/images/vendor/register/two.png',
        header: 'Logistics & Procurement',
    },
    {
        image: '/images/vendor/register/three.png',
        header: 'Catering & Hospitality',
    },
    {
        image: '/images/vendor/register/four.png',
        header: 'Event Planning & Rentals',
    },
    {
        image: '/images/vendor/register/five.png',
        header: 'Security Services',
    },
    {
        image: '/images/vendor/register/six.png',
        header: 'Training & Education',
    },
    {
        image: '/images/vendor/register/seven.png',
        header: 'Equipment Supply & Maintenance ',
    },
    {
        image: '/images/vendor/register/eight.png',
        header: 'Creative Media & Branding',
    },

]
export default function VendorRegistration() {
    return (
        <section className="w-full flex flex-col gap-[64px] items-center justify-center">
            <h1 className="font-satoshi text-center font-bold text-[32px] leading-[35px] text-[#3B3B3B] self-stretch">Who Should Register?</h1>
            <div className="w-[1198px] flex flex-wrap gap-[22px] items-start">
                {Register.map((item, index) => (
                    <div key={index} className="w-[283px] py-[1px] flex flex-col items-center">
                        <Image src={item.image} className="object-cover rounded-tr-[11px] rounded-tl-[11px]" width={283} height={180} alt="icons" priority />
                        <div className="w-[283px] flex h-[107px] py-[20px] px-[18px] flex-col items-start gap-[10px] self-stretch border border-[#EAEAEA]">
                            <p className="w-[247px]flex flex-col items-start gap-[19px] self-stretch text-[20px] text-[#282A2D] font-satoshi font-bold leading-[32px] tracking-[0.14px] self-stretch">{item.header}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}