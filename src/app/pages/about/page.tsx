import {Separator} from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import ReactLogo from "./react.png";
import React from "react";
import Subbar from "@/components/ui/subbar/Subbar";

export default function Page() {
    return (
        <>
            <Subbar></Subbar>
            <div className = {"flex flex-col justify-center items-center w-full min-h-[85vh]"}>
                <div className = {"flex flex-col justify-center items-center"}>
                    <div className = {"flex flex-row gap-8"}>
                        <Image alt = {"Scryfall Logo"} className = {"rounded-2xl"} width = {100} height = {100} src = {"https://avatars.githubusercontent.com/u/22605579"}></Image>

                        <h1 className = {"text-2xl font-bold justify-center align-middle items-center flex"}>About this Data Source</h1>
                    </div>

                    <div className = {"max-w-2/3 w-full my-8"}>
                        <p>
                            This service leverages the Scryfall API, to retrieve and display Magic: The Gathering card data.
                            Scryfall is a comprehensive, community-driven database that aggregates information from various sources, including official Wizards of the Coast releases.</p>
                    </div>
                </div>
                <Separator></Separator>

                <div className = {"flex flex-col max-w-2/3 w-full my-8"}>
                    <h2 className = {"text-xl font-bold text-center mb-2"}>
                        Key technical details: </h2>
                    <ul>
                        <li>
                            <strong>API Endpoint:</strong> Data is fetched via a JavaScript SDK, which is then used to fetch data via HTTP requests to the Scryfall API endpoints.
                        </li>
                        <li>
                            <strong>Data Format:</strong> The API returns data in JSON format.
                        </li>
                        <li>
                            <strong>Data Scope:</strong> Scryfall&#39;s database includes card metadata (names, mana costs, rules text, etc.), pricing information, image URIs, legality information, and more.
                        </li>
                        <li>
                            <strong>Data Freshness:</strong> Scryfall actively updates its database with new releases and
                            errata, ensuring relatively up-to-date information. This includes having an even larger, and
                            more up-to-date database of cards, even compared to Magic&#39;s Creator&#39;s own!
                        </li>
                        <li>
                            <strong>API Documentation:</strong> For detailed information on available endpoints and data structures, please refer to the official Scryfall API documentation:
                            <a href = "https://scryfall.com/docs/api" target = "_blank"> https://scryfall.com/docs/api</a>
                        </li>
                    </ul>

                </div>

                <Separator></Separator>

                <div className = {"flex flex-col  max-w-2/3 w-full my-8"}>
                    <h2 className = {"text-xl font-bold text-center mb-2"}>What I Learned and Reinforced</h2>
                    <p>Developing this applicationw as a great way for me to learn more about the Scryfall API, but also learn more how to interact with some third party sources.
                    Thinking about how to convert this project from a PHP application to a React application, really helped teach me more modular approaches. </p>

                    <p>To continue functionality with my original project, I still needed to implement a login system and a user&#39;s favorites. This involves the creation of a database, and the use of cookies to store user information. </p>
                </div>
                <Separator></Separator>

                <div className = {"max-w-2/3 w-full my-8"}>
                    <h2 className = {"text-xl font-bold text-center mb-2"}>Technologies</h2>
                    <div className = {"flex flex-row gap-4"}>

                        <Link href = "https://scryfall.com/docs/api" target = "_blank" className = {"flex flex-col gap-2 mx-auto w-full max-w-[150px] align-middle justify-center text-center"}>

                            <Image alt = {"Scryfall Logo"} className = {"rounded-2xl flex justify-center mx-auto w-full"} width = {100} height = {100} src = {"https://avatars.githubusercontent.com/u/22605579"}></Image>
                            <p>Scryfall SDK & API</p>
                        </Link>
                        <Link href = "https://www.php.net/" target = "_blank" className = {"flex flex-col gap-2 mx-auto w-full max-w-[150px] align-middle justify-center text-center"}>
                            <Image alt = {"PHP Logo"} className = {"rounded-2xl flex justify-center mx-auto w-full"} width = {100} height = {100} src = {"https://avatars.githubusercontent.com/u/25158"}></Image>
                            <p>PHP</p>
                        </Link>
                        <Link href = "https://reactjs.org/" target = "_blank" className = {"flex flex-col gap-2 mx-auto w-full max-w-[150px] align-middle justify-center text-center"}>
                            <Image alt = {"React Logo"} className = {"rounded-2xl flex justify-center mx-auto w-full"} width = {100} height = {100} src = {ReactLogo}></Image>
                            <p>React.js</p>
                        </Link>
                    </div>
                </div>

                <Separator></Separator>

                <div className = {"max-w-2/3 w-full my-8"}>
                    <p>
                        While Scryfall is a community-driven project, it strives for accuracy and completeness, often surpassing official sources in terms of data richness and accessibility. It is important to remember, that while Scryfall is very accurate, it is not an offical source of Hasbro, and that Hasbro&#39;s official database can be found here:
                        <a href = "https://gatherer.wizards.com/Pages/Default.aspx" target = "_blank">Hasbro&#39;s Official Card Database</a>
                    </p>
                </div>

                <hr/>
            </div>
        </>
    );
}