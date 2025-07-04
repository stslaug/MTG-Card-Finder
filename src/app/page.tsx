"use client";
import {Checkbox} from "@/components/ui/checkbox"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input";
import Image from "next/image";
import {useState} from "react";
import * as Scry from "scryfall-sdk";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import CardMenuPopup from "@/components/ui/CardMenuPopup";
import Subbar from "@/components/ui/subbar/Subbar";
import {toast} from "sonner"


export default function CardHome() {
    /*
     * Query Parameters
     */
    const [searchedCardName, setSearchedCardName] = useState("");
    const [searchedTypeLine, setSearchedTypeLine] = useState("");
    const [searchedColors, setSearchedColors] = useState<string[]>([]);
    const [searchedColorsMatchType, setSearchedColorsMatchType] = useState(">=");
    const [searchedConvertedManaCost, setSearchedConvertedManaCost] = useState("");
    const [searchedFormat, setSearchedFormat] = useState("");
    const [searchedCommanderColors, setSearchedCommanderColors] = useState<string[]>([]);
    const [searchedSetName, setSearchedSetName] = useState("");

    const [cardResults, setCardResults] = useState<Scry.Card[]>([]);
    const [lastQuery, setLastQuery] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);

    /*
     *   Card Details State
     */
    const [showCardDetails, setShowCardDetails] = useState(false);
    const [currentCard, setCurrentCard] = useState<Scry.Card>();

    interface ScryfallApiError {
        status: number;
        code: string;
        details: string;
        warnings?: string[];
    }

    const commanderFormats = ['commander', 'oathbreaker', 'brawl', 'pauper_commander', 'brawl_historic'];

    const handleColorChange = (colorValue: string, isChecked: boolean) => {
        setSearchedColors(prevColors =>
            isChecked
                ? [...prevColors, colorValue]
                : prevColors.filter(color => color !== colorValue)
        );
    };

    const handleCommanderColorChange = (colorValue: string, isChecked: boolean) => {
        setSearchedCommanderColors(prevColors =>
            isChecked
                ? [...prevColors, colorValue]
                : prevColors.filter(color => color !== colorValue)
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Submitted from Page!");
        console.log("Card Name:", searchedCardName);
        console.log("Type Line:", searchedTypeLine);
        console.log("Colors:", searchedColors);
        console.log("Color Match Type:", searchedColorsMatchType);
        console.log("CMC:", searchedConvertedManaCost);
        console.log("Format:", searchedFormat);
        console.log("Commander Colors:", searchedCommanderColors);
        console.log("Set Name:", searchedSetName);

        let queryString = "";
        if (searchedCardName !== "") {
            queryString += `name:${searchedCardName} `;
        }
        if (searchedTypeLine !== "") {
            queryString += `type:${searchedTypeLine} `;
        }
        if (searchedColors.length > 0) {
            queryString += `color:${searchedColors.join(",")} `;
        }
        if (searchedColorsMatchType !== "") {
            queryString += `cmc:${searchedColorsMatchType} `;
        }
        if (searchedConvertedManaCost !== "") {
            queryString += `cmc:${parseInt(searchedConvertedManaCost)} `;
        }
        if (searchedFormat !== "") {
            queryString += `format:${searchedFormat} `;
        }
        if (searchedCommanderColors.length > 0) {
            queryString += `color:${searchedCommanderColors.join(",")} `;
        }
        if (searchedSetName !== "") {
            queryString += `set:${searchedSetName} `;
        }
        setLastQuery(queryString);
        setCurrentPage(1);
        setCardResults(await Scry.Cards.search(lastQuery, currentPage).cancelAfterPage().waitForAll());

    };
    const handlePageChange = async (page: number) => {
        try {
            let cards = await Scry.Cards.search(lastQuery, page)
                .cancelAfterPage()
                .waitForAll();

            if (cards.length !== 0) {
                setCardResults(cards);
                setCurrentPage(page);
            } else {
                toast.info('No more cards found!');
            }
        } catch (error) {
            console.error("Error fetching cards:", error);
            if (typeof error === 'object' && error !== null) {
                const scryfallError = error as ScryfallApiError;

                if (scryfallError.status) {
                    console.error("Error Status:", scryfallError.status);
                }
                if (scryfallError.details) {
                    console.error("Error Details:", scryfallError.details);
                }
            }
        }
    };

    const handleCardClick = async (cardID: string) => {
        try {
            const card = await Scry.Cards.byId(cardID);
            setCurrentCard(card);
        } catch (e) {
            console.log(e);
        }
        setShowCardDetails(true);

    }


    function buildCardGrid(cards: Scry.Card[]) {
        return (
            <div className = "p-8  flex flex-row flex-wrap justify-center gap-4 w-full">
                <div className = "flex flex-row flex-wrap justify-center gap-4">
                    {cards.map((card) => (
                        <>
                            <Image key = {card.id} onClick = {() => (handleCardClick(card.id))} className = {"rounded-3xl w-full max-h-[420px] max-w-[300px] hover:cursor-pointer"} width = {300} height = {200} src = {card.image_uris?.normal || card.card_faces[0].image_uris?.normal || ""/*Make placeholder effect*/} alt = {card.name}/>
                            {showCardDetails && currentCard?.id === card.id ? (
                                <CardMenuPopup card = {currentCard}/>
                            ) : null}
                        </>
                    ))}

                </div>
                {currentPage > 1 ?
                    <Button variant = "default" onClick = {() => (handlePageChange(currentPage - 1))}>Previous Page</Button> : null}
                <Button variant = "default" onClick = {() => (handlePageChange(currentPage + 1))}>Next Page</Button>

            </div>
        );
    }

    return (
        <>
            <div className = {"min-h-[85vh]"}>
                <Subbar/>

                <div className = {"flex sm:flex-row flex-col"}>
                    <form className = "sidebar p-8 sm:min-w-[325px] sm:max-w-1/5 w-full flex flex-col space-y-6" onSubmit = {handleSubmit}>
                        <h2 className = "text-2xl font-bold">Sort and Filter</h2>

                        <div className = "input-group space-y-2">
                            <Label htmlFor = "cardName">Card Name</Label>
                            <Input id = "cardName" placeholder = "ex. Rhystic Study" type = "text" value = {searchedCardName} onChange = {(e) => setSearchedCardName(e.target.value)}
                            />
                        </div>

                        <div className = "input-group space-y-2">
                            <Label htmlFor = "typeLine">Type Line</Label>
                            <Input id = "typeLine" placeholder = "ex. 'Creature' or 'Human Wizard'" type = "text" value = {searchedTypeLine} onChange = {(e) => setSearchedTypeLine(e.target.value)}
                            />
                        </div>

                        <div className = "input-group space-y-2">
                            <Label>Colors</Label>
                            <div className = "flex flex-row gap-5 text-nowrap flex-wrap">
                                {['W', 'U', 'B', 'R', 'G', 'C'].map(color => (
                                    <div className = "flex items-center space-x-2" key = {color}>
                                        <Checkbox id = {`color-${color}`} name = "colors[]" value = {color} checked = {searchedColors.includes(color)} onCheckedChange = {(checked) => handleColorChange(color, checked as boolean)}
                                        />
                                        <Label htmlFor = {`color-${color}`}>
                                            {color === 'W' ? 'White' :
                                                color === 'U' ? 'Blue' :
                                                    color === 'B' ? 'Black' :
                                                        color === 'R' ? 'Red' :
                                                            color === 'G' ? 'Green' :
                                                                color === 'C' ? 'Colorless' : color}
                                        </Label>
                                    </div>
                                ))}
                            </div>

                            <div className = "input-group space-y-2 mt-4">
                                <Label htmlFor = "color-match-type">Color Selection Type</Label>
                                <Select name = "colorsMatchType" value = {searchedColorsMatchType} onValueChange = {setSearchedColorsMatchType}
                                >
                                    <SelectTrigger className = "w-full">
                                        <SelectValue placeholder = "Select a match type"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value = ">=">Including these colors</SelectItem>
                                        <SelectItem value = "<=">At most these Colors</SelectItem>
                                        <SelectItem value = "=">Exactly these colors</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className = "input-group space-y-2">
                            <Label htmlFor = "converted-manaCost">Converted Mana Cost (CMC)</Label>
                            <Input id = "converted-manaCost" min = "0" placeholder = "ex. 3, 5" type = "text" value = {searchedConvertedManaCost} onChange = {(e) => setSearchedConvertedManaCost(e.target.value)}
                            />
                        </div>

                        <div className = "input-group space-y-2">
                            <Label htmlFor = "format">Format / Card Legality</Label>
                            <Select onValueChange = {setSearchedFormat} value = {searchedFormat}
                            >
                                <SelectTrigger className = "w-full">
                                    <SelectValue placeholder = "Select a format"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value = "any">Any</SelectItem>
                                    <SelectItem value = "commander">Commander</SelectItem>
                                    <SelectItem value = "standard">Standard</SelectItem>
                                    <SelectItem value = "future">Future Standard</SelectItem>
                                    <SelectItem value = "historic">Historic</SelectItem>
                                    <SelectItem value = "timeless">Timeless</SelectItem>
                                    <SelectItem value = "gladiator">Gladiator</SelectItem>
                                    <SelectItem value = "pioneer">Pioneer</SelectItem>
                                    <SelectItem value = "explorer">Explorer</SelectItem>
                                    <SelectItem value = "modern">Modern</SelectItem>
                                    <SelectItem value = "legacy">Legacy</SelectItem>
                                    <SelectItem value = "pauper">Pauper</SelectItem>
                                    <SelectItem value = "vintage">Vintage</SelectItem>
                                    <SelectItem value = "penny">Penny Dreadful</SelectItem>
                                    <SelectItem value = "oathbreaker">Oathbreaker</SelectItem>
                                    <SelectItem value = "brawl">Standard Brawl</SelectItem>
                                    <SelectItem value = "brawl_historic">Brawl</SelectItem>
                                    <SelectItem value = "alchemy">Alchemy</SelectItem>
                                    <SelectItem value = "pauper_commander">Pauper Commander</SelectItem>
                                    <SelectItem value = "duel">Duel Commander</SelectItem>
                                    <SelectItem value = "oldschool">Old School 93/94</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {commanderFormats.includes(searchedFormat) ? (
                            <div className = "input-group space-y-2" id = "commanderGroup">
                                <Label>Commander</Label>
                                <div className = "flex flex-row gap-5 text-nowrap flex-wrap">
                                    {['W', 'U', 'B', 'R', 'G', 'C'].map(color => (
                                        <div className = "flex items-center space-x-2" key = {`commander-${color}`}>
                                            <Checkbox id = {`commander-${color}`} name = "commander[]" value = {color} checked = {searchedCommanderColors.includes(color)} onCheckedChange = {(checked) => handleCommanderColorChange(color, checked as boolean)}
                                            />
                                            <Label htmlFor = {`commander-${color}`}>
                                                {color === 'W' ? 'White' :
                                                    color === 'U' ? 'Blue' :
                                                        color === 'B' ? 'Black' :
                                                            color === 'R' ? 'Red' :
                                                                color === 'G' ? 'Green' :
                                                                    color === 'C' ? 'Colorless' : color}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : null}

                        <div className = "input-group space-y-2">
                            <Label htmlFor = "setName">Set</Label>
                            <Input id = "setName" placeholder = "ex. MAR, DFT" type = "text" value = {searchedSetName} onChange = {(e) => setSearchedSetName(e.target.value)}
                            />
                        </div>

                        <Button variant = "default" type = "submit" className = "w-full">Search</Button>
                        <p id = "totalCards" className = "text-center"></p>
                    </form>

                    <div className = "page  w-full" id = "card-viewer">

                        <div className = "text-center mx-auto">
                            {cardResults.length === 0 ? (<>
                                <h2>Make a search to view some cards!</h2>
                                <p>Vague searches may take a moment to load!</p>
                            </>) : buildCardGrid(cardResults)}
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}