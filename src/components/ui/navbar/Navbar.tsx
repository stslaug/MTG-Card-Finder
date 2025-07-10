"use client";
import "./navbar.css";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuContent,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "next/link";

const projects = [
    {
        name: "Card Database",
        to: "/"
    }
]







export default function Navbar() {
    return (
        <div id="mynav" className="bg-[#0f0026] w-full sm:sticky flex mx-auto relative">
            <p className="mr-auto !text-white !text-2xl ml-5">Sean Slaughter</p>
            <div className="relative justify-center flex-1 flex justify-end mr-5">
                <NavigationMenu className="w-auto flex relative" viewport={false}>
                    <NavigationMenuList>

                        <NavigationMenuItem>
                            <Link href = "https://www.seanslaughter.dev" className = {navigationMenuTriggerStyle()}>
                                Home
                            </Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <Link href = "https://www.seanslaughter.dev/pages/experience" legacyBehavior passHref>
                                <NavigationMenuLink className = {navigationMenuTriggerStyle()}>
                                    Experience
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
                            <NavigationMenuContent className={"absolute min-w-min"}>
                                {projects.map((project, index) => (
                                    <Link key = {index} href = {project.to} legacyBehavior passHref>
                                        <NavigationMenuLink title = {project.name}>
                                            {project.name}
                                        </NavigationMenuLink>
                                    </Link>

                                ))}
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>
    );
}
