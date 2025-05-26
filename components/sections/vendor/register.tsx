import Image from "next/image";

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
        header: 'Equipment Supply & Maintenance',
    },
    {
        image: '/images/vendor/register/eight.png',
        header: 'Creative Media & Branding',
    },
];

export default function VendorRegistration() {
    return (
        <section className="w-full flex flex-col gap-12 md:gap-16 lg:gap-[64px] items-center justify-center px-4 sm:px-6 lg:px-0 py-12 md:py-16 lg:py-0">
            <h1 className="font-satoshi text-center font-bold text-2xl sm:text-3xl lg:text-[32px] leading-snug lg:leading-[35px] text-[#3B3B3B] w-full">
                Who Should Register?
            </h1>

            <div className="w-full max-w-[1198px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-[22px] items-start">
                {Register.map((item, index) => (
                    <div
                        key={index}
                        className="w-full sm:w-[calc(50%-10px)] md:w-[calc(33.333%-15px)] lg:w-[283px] flex flex-col items-center transition-all duration-200 hover:shadow-md"
                    >
                        <div className="w-full aspect-[283/180] relative">
                            <Image
                                src={item.image}
                                alt={item.header}
                                fill
                                className="object-cover rounded-tr-[11px] rounded-tl-[11px]"
                                priority
                            />
                        </div>
                        <div className="w-full h-[107px] flex py-5 lg:py-[20px] px-4 lg:px-[18px] flex-col items-start gap-2 lg:gap-[10px] border border-[#EAEAEA]">
                            <p className="w-full font-satoshi font-bold text-lg lg:text-[20px] leading-relaxed lg:leading-[32px] tracking-[0.14px] text-[#282A2D]">
                                {item.header}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}