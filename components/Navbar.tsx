"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

type NavbarProps = {
    list: {
        href: string;
        title: string;
        icon?: React.ReactNode;
    }[];
};

export default function Navbar({ list }: NavbarProps) {
    const pathname = usePathname();
    const isActive = (href: string) => pathname === href;

    return (
        <NavigationMenu className="w-full h-10">
            <NavigationMenuList className="flex w-full max-w-none justify-start gap-3 px-4">

                {/* LINKS */}
                {list.map((item) => (
                    <NavigationMenuItem key={item.href}>
                        <NavigationMenuLink
                            asChild
                            className={navigationMenuTriggerStyle()}
                        >
                            <Link href={item.href} className={(isActive(item.href) ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground")}>
                                {item.title} {item.icon}
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}