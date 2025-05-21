import Link from "next/link";

const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    {
        label: "Services",
        href: "/services",
        subItems: [
            { label: "Web Development", href: "/services/web" },
            { label: "Mobile Apps", href: "/services/mobile" },
            { label: "UI/UX Design", href: "/services/design" },
        ],
    },
    { label: "Contact Us", href: "/contact" },
    { label: "Link", href: "/link1" },
    { label: "Link", href: "/link2" },
]

export default function Navigation() {
    return (
        <ul
            className="flex items-center justify-center gap-[34px] py-[15px] px-[19px]
            list-none
        ">
            {['Home', 'About Us', 'Services', 'Contact Us', 'Link', 'Link'].map((item, index) => (
                <li key={index}>
                    <Link
                        href="/"
                        className="
                            no-underline 
                            font-poppins 
                            font-semibold  
                            text-[14px]   
                            leading-none   
                            tracking-[0] 
                            text-[#81838C] 
                            hover:text-[#1e40af]
                            transition-colors duration-200 
                            inline-block
            "
                    >
                        {item}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
