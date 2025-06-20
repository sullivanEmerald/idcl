"use client";

import Link from "next/link";
import { useMobileMenuStore } from "@/stores/useMobileMenuStore";
import { navItems } from "./navigation";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import GetStarted from "./getStarted";

export default function MobileMenu() {
    const { isOpen, closeMenu } = useMobileMenuStore();
    const pathname = usePathname();
    const prevPath = useRef(pathname);
    const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);


    const toggleSubmenu = (index: number | null) => {
        setActiveSubmenu(activeSubmenu === index ? null : index);
    };

    useEffect(() => {
        if (prevPath.current !== pathname) {
            closeMenu();
            prevPath.current = pathname;
        }
    }, [pathname]);

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-40 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={closeMenu}
            />

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-[260px] bg-white shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Close button */}
                <div className="flex justify-end p-4">
                    <button onClick={closeMenu} aria-label="Close menu">
                        <X className="w-6 h-6 text-gray-800 hover:text-red-500 transition-colors duration-200" />
                    </button>
                </div>
                <div className="flex flex-col h-[500px] justify-between px-5">
                    <ul className="flex flex-col gap-4">
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
                    <div className="">
                        <GetStarted />
                    </div>
                </div>
            </aside>
        </>
    );
}
