"use client";
import "./navbar.css";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "next/link";






export default function Subbar() {
    return (
        <div id="subbar" className="bg-[#0f0026] w-full flex sm:sticky mx-auto relative">
            <div className="relative justify-center flex-1 flex justify-end mr-5">
                <NavigationMenu className="w-auto flex relative" viewport={false}>
                    <NavigationMenuList>

                        <NavigationMenuItem>
                            <Link href = "/pages/projects/mtg-db/" className = {navigationMenuTriggerStyle()}>
                                <i className="fa-solid fa-magnifying-glass mr-2"></i>Search
                            </Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <Link href = "/pages/projects/mtg-db/pages/about" legacyBehavior passHref>
                                <NavigationMenuLink className = {"flex flex-row w-full" + navigationMenuTriggerStyle()}>
                                    <i className="fa-solid fa-info mr-2"></i> About
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <Link href = "/pages/projects/mtg-db/pages/stats" legacyBehavior passHref>
                                <NavigationMenuLink className = {"flex flex-row w-full" + navigationMenuTriggerStyle()}>
                                    <i className="fa-regular fa-chart-bar mr-2"></i>Stats
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>
    );
}
