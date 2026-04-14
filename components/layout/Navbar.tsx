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
    }[];
};

export default function Navbar({ list }: NavbarProps) {
    const pathname = usePathname();
    const isActive = (href: string) => pathname === href;

    return (
        <NavigationMenu className="w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <NavigationMenuList className="flex w-full max-w-none items-center gap-2 px-4 py-2">

                {list.map((item) => {
                    const active = isActive(item.href);

                    return (
                        <NavigationMenuItem key={item.href}>
                            <NavigationMenuLink
                                asChild
                                className={navigationMenuTriggerStyle()}
                            >
                                <Link
                                    href={item.href}
                                    className={`relative flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors
                                        ${active
                                            ? "text-foreground"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                        }`
                                    }
                                >
                                    
                                    {item.title}

                                    {/* Indicador ativo (linha embaixo) */}
                                    {active && (
                                        <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-primary rounded-full" />
                                    )}
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    );
                })}

            </NavigationMenuList>
        </NavigationMenu>
    );
}