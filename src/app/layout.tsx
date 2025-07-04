import type {Metadata} from "next";
import {Noto_Sans, Noto_Sans_Mono} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/navbar/Navbar";
import {Footer} from "@/components/ui/footer";
import { Toaster } from "@/components/ui/sonner"

const notoSans = Noto_Sans({
    variable: "--font-noto-sans",
    subsets: ["latin"],
});

const notoMono = Noto_Sans_Mono({
    variable: "--font-noto-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Portfolio | Sean Slaughter",
    description: "Sean Tyler Slaughter's Portfolio"
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <html className="scroll-smooth" lang = "en">
            <head>
                <meta charSet = "utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta content = "ie=edge" httpEquiv = "X-UA-Compatible"/>
                <link crossOrigin = "anonymous" href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity = "sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" referrerPolicy = "no-referrer" rel = "stylesheet"/>

                <link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />


            </head>
            <body className = {`${notoSans.variable} ${notoMono.variable} antialiased`}
            >
                <Navbar/>

                <main className = "!overflow-x-hidden">  {children} </main>
                <Toaster />

                <Footer/>
            </body>
            </html>
        </>
    );
}
