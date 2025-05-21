import Image from "next/image"
import Link from "next/link"
const HireableSkills = [
    {
        image: '/images/talent/hire/one.png',
        header: 'Software Development',
        body: 'Frontend, Backend, Full-stack (JavaScript, Python, etc.)',
    },
    {
        image: '/images/talent/hire/two.png',
        header: 'Data Science & AI',
        body: 'Analysts, Machine Learning Engineers',

    },
    {
        image: '/images/talent/hire/three.png',
        header: 'UI/UX Design',
        body: 'Product Designers, Researchers',
    },
    {
        image: '/images/talent/hire/four.png',
        header: 'Cybersecurity ',
        body: ' Ethical Hackers, Risk Analysts',
    },
    {
        image: '/images/talent/hire/five.png',
        header: 'Cloud Engineering ',
        body: 'AWS, Azure, DevOps Engineers',
    },
    {
        image: '/images/talent/hire/six.png',
        header: 'Blockchain/Web3 ',
        body: 'Smart Contract Developers',
    },
    {
        image: '/images/talent/hire/seven.png',
        header: 'IT Support ',
        body: 'Desktop support, Network engineers',
    },
]
export default function TalentExpertise() {
    return (
        <section className="bg-[#F5F9FF] flex flex-col items-center justify-center gap-[64px] h-[1075px]">
            <h1 className="text-[#3B3B3B] font-satoshi text-[32px] font-bold leading-[110%] capitalize">
                Expertise You Can Hire Today
            </h1>
            <div className="flex flex-wrap items-center justify-center w-[1198px] gap-[22px]">
                {
                    HireableSkills.map((item, index) => (
                        <div key={index} className="rounded-[11px]">
                            <Image
                                src={item.image}
                                alt="Background"
                                width={283}
                                height={180}
                                className="object-cover rounded-tl-[11px] rounded-tr-[11px]"
                                priority
                            />
                            <div className="flex flex-col py-[20px] px-[22px] items-center justify-center h-[194px] w-[283px] gap-[10px] self-stretch border border-[#EAEAEA] bg-[#fff]">
                                <div className="flex flex-col justify-between items-start shrink-0 self-stretch h-[152px]">
                                    <h1 className="text-[#282A2D] font-satoshi text-[20px] font-bold leading-[32px] tracking-[0.14px]">
                                        {item.header}
                                    </h1>
                                    <p className="text-[#616771] font-satoshi text-[16px] font-normal leading-[142%] tracking-[0.112px]">
                                        {item.body}
                                    </p>
                                    <Link href='/' className="flex py-[12px] px-[10px] items-center gap-[10px] rounded-[50px]">
                                        <span className="text-[#005DFF] text-center font-roboto text-[15px] font-medium leading-normal">Request Now</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}