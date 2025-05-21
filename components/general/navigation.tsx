import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    {
        label: "Services",
        href: "/services",
        subItems: [
            { label: "Event", href: "/services/event" },
            { label: "Infastruture", href: "/services/infrastructure" },
            { label: "Tour", href: "/services/tour" },
            { label: "Talent", href: "/services/talent" },
            { label: "Startup", href: "/services/startup" },
            { label: "Partnerships", href: "/services/partnership" },
            { label: "Public", href: "/services/public" },
            { label: "Awareness", href: "/services/awareness" },
            { label: "Commercialization", href: "/services/commercialization" },
            { label: "Vendor", href: "/services/vendor" },
            { label: "jobs", href: "/services/jobs" },
        ],
    },
    { label: "Contact Us", href: "/contact" },
    { label: "Link", href: "/link1" },
    { label: "Link", href: "/link2" },
];

export default function Navigation() {
    return (
        <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-8 py-4 px-5">
                {navItems.map((item, index) => (
                    <NavigationMenuItem key={index}>
                        {item.subItems ? (
                            <>
                                <NavigationMenuTrigger className="font-poppins font-semibold text-sm text-[#81838C] hover:text-[#1e40af] data-[active]:text-[#1e40af] data-[state=open]:text-[#1e40af] bg-transparent hover:bg-transparent px-0 flex items-center gap-2">
                                    {item.label}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="bg-white p-2 rounded-md shadow-lg border">
                                    <ul className="grid gap-1 p-2 w-[200px]">
                                        {item.subItems.map((subItem, subIndex) => (
                                            <li key={subIndex}>
                                                <NavigationMenuLink asChild>
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
                                                </NavigationMenuLink>
                                            </li>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </>
                        ) : (
                            <Link
                                href={item.href}
                                legacyBehavior
                                passHref
                            >
                                <NavigationMenuLink className={cn(
                                    "font-poppins font-semibold text-sm",
                                    "text-[#81838C] hover:text-[#1e40af]",
                                    "transition-colors duration-200",
                                    "inline-block px-0 py-2"
                                )}>
                                    {item.label}
                                </NavigationMenuLink>
                            </Link>
                        )}
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
            <NavigationMenuViewport className="relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-white shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]" />
        </NavigationMenu>
    );
}