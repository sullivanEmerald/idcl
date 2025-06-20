
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import { usePathname } from "next/navigation";

export const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    {
        label: "Services",
        href: "/services",
        subItems: [
            { label: "Smart Infrastructure and Innovation Facilities", href: "/services/infrastructure" },
            { label: "Startup Incubation/Accleration", href: "/services/startup" },
            { label: "Public Sector & Business Solutions", href: "/services/public" },
            { label: "IP Awareness & Training", href: "/services/awareness" },
            { label: "Commercialization of IP & Innovation Support", href: "/services/commercialization" },
            // { label: "Vendor Registration – IDCL", href: "/services/vendor" },
            // { label: "Tour – IDCL", href: "/services/tour" },
            // { label: "Jobs & Recruitment", href: "/services/jobs" },
        ],
    },
    { label: "Talents", href: "/talent" },
    { label: "Global Partners", href: "/partnership" },
    { label: "Smart Infrastructure", href: "/infrastructure" },
    { label: "Events", href: "/event" },
];

export default function Navigation() {
    const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
    const pathname = usePathname();
    const navRef = useRef(null);

    const toggleSubmenu = (index: number | null) => {
        setActiveSubmenu(activeSubmenu === index ? null : index);
    };

    return (
        <nav className="hidden md:block" ref={navRef}>
            <ul className="flex items-center gap-8 py-4 px-5">
                {navItems.map((item, index) => {

                    const isActiveLink = pathname.startsWith(item.href);

                    return (<li key={index} className="relative group">
                        {item.subItems ? (
                            <>
                                <button
                                    onClick={() => toggleSubmenu(index)}
                                    className={cn(
                                        "font-poppins font-semibold text-sm",
                                        "text-[#81838C] hover:text-[#1e40af]",
                                        "transition-colors duration-200",
                                        "px-0 flex items-center gap-2",
                                        "group-hover:text-[#1e40af]",
                                        activeSubmenu === index && "text-[#1e40af]"
                                    )}
                                >
                                    {item.label}
                                    <svg
                                        className={`h-4 w-4 transform transition-transform ${activeSubmenu === index ? "rotate-180" : ""
                                            } group-hover:rotate-180`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                                <ul
                                    className={`${activeSubmenu === index ? "block" : "hidden"
                                        } absolute left-0 mt-0 bg-white p-2 rounded-md shadow-lg border w-[300px] group-hover:block z-10`}
                                >
                                    {item.subItems.map((subItem, subIndex) => (
                                        <li key={subIndex}>
                                            <Link
                                                href={subItem.href}
                                                className={cn(
                                                    "block w-full rounded-md px-3 py-2 text-sm font-medium",
                                                    "text-[#81838C] hover:text-[#1e40af] hover:bg-gray-50",
                                                    "transition-colors duration-200"
                                                )}
                                            >
                                                {subItem.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <Link
                                href={item.href}
                                className={cn(
                                    "font-poppins font-semibold text-sm relative inline-block px-0 py-2 text-[#81838C]",
                                    "transition-colors duration-200 hover:text-[#1e40af]",
                                    isActiveLink && "text-[#1e40af] font-bold",
                                    "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#1e40af]",
                                    "after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100",
                                    isActiveLink && "after:scale-x-100"
                                )}
                            >
                                {item.label}
                            </Link>
                        )}
                    </li>)

                })}
            </ul>
        </nav>
    );
}