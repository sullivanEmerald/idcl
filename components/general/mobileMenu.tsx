"use client";

import Link from "next/link";
import { useMobileMenuStore } from "@/stores/useMobileMenuStore";
import { navItems } from "./navigation";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GetStarted from "./getStarted";

export default function MobileMenu() {
    const { isOpen, closeMenu } = useMobileMenuStore();
    const pathname = usePathname();
    const prevPath = useRef(pathname);

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
                    <div className="flex flex-col gap-4">
                        {navItems.map((item, index) => (
                            <div key={index}>
                                {!item.subItems ? (
                                    <Link
                                        href={item.href}
                                        onClick={closeMenu}
                                        className="block text-[#1e293b] font-semibold text-sm py-2 hover:text-blue-700"
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="text-left w-full text-[#1e293b] font-semibold text-sm py-2 hover:text-blue-700">
                                            {item.label}
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-48">
                                            {item.subItems.map((sub, subIdx) => (
                                                <DropdownMenuItem key={subIdx} asChild>
                                                    <Link
                                                        href={sub.href}
                                                        onClick={closeMenu}
                                                        className="text-sm text-[#64748b] hover:text-blue-600"
                                                    >
                                                        {sub.label}
                                                    </Link>
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="">
                        <GetStarted />
                    </div>
                </div>
            </aside>
        </>
    );
}
