"use client"
import GetStarted from "./getStarted";
import Logo from "./logo";
import Navigation from "./navigation";
import MobileMenu from "./mobileMenu";
import { useMobileMenuStore } from "@/stores/useMobileMenuStore";
import { Menu } from "lucide-react";

export default function Header() {
    const { toggleMenu } = useMobileMenuStore();

    return (
        <>
            <header
                className="
                    w-full
                    flex items-center justify-between
                    px-6 lg:px-[80px] py-[17px]
                    bg-white bg-opacity-80
                    backdrop-blur-[14.4px]
                    border-b border-opacity-10 border-black
                    shadow-[3px_4px_16px_0px_rgba(88,124,88,0.02)]
                    sticky top-0 z-50
                    h-[69px]"

            >
                <Logo />
                <Navigation />
                <div className="hidden md:block">
                    <GetStarted />
                </div>
                <button
                    onClick={toggleMenu}
                    className="md:hidden flex items-center justify-center w-10 h-10 text-[#1e293b]"
                >
                    <Menu size={24} />
                </button>
            </header>
            <MobileMenu />
        </>
    );
}
