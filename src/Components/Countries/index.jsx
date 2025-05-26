import React, { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";
import Input from "../../DesignComponents/Input";
import Devider from "../../DesignComponents/Devider";

/**
 * type = Array< {
 *    flags: {
 *      alt: string;
 *      png: string;
 *      svg: string; //image of the country flag
 *    },
 *  name: {
 *      common: string; //name of the country
 *  }
 * }>
 *
 */
const COUNTRIES_API = "https://restcountries.com/v3.1/all?fields=name,flags";

export default function Countries() {
    return (
        <div
            className="CountriesContainer"
            style={{
                backgroundColor: "#2d364827",
                bottom: "0px",
                padding: "100px",
            }}
        >
            <CountriesComponent />
        </div>
    );
}

export function CountriesComponent() {
    const controller = new AbortController();

    const [searchText, setSearchText] = useState("");
    const [countriesData, setCountriesData] = useState([]);

    const [apiError, setApiError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function requestCountries() {
            setApiError(null);
            setIsLoading(true);
            try {
                const networkResp = await fetch(COUNTRIES_API, controller);

                if (!networkResp.ok) {
                    console.log("Something went wrong");
                }

                const resp = await networkResp.json();
                setCountriesData(resp);
            } catch (e) {
                setApiError(e.message);
            } finally {
                setIsLoading(false);
            }
        }
        requestCountries();
        // Only want to load on first load
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const displayList = useDebounce(searchText, countriesData);

    const handleSearchInput = (e) => {
        setSearchText(e.target.value);
    };

    if (isLoading) {
        return <>Loading...</>;
    } else if (apiError) {
        return <>{apiError}</>;
    } else {
        return (
            <div style={{ display: "flex" }}>
                <span>
                    <h1>Find the name</h1>
                    <div style={{ marginTop: "50px", marginLeft: "2em" }}>
                        <Input
                            onChange={handleSearchInput}
                            value={searchText}
                        />
                    </div>
                    <div style={{ width: "550px", textAlign: "left" }}>
                        <ul>
                            {displayList.map((country, key) => (
                                <DisplayEachCountry
                                    src={country.flags.svg}
                                    alt={country.flags.alt}
                                    countryName={country.name.common}
                                    key={key}
                                />
                            ))}
                        </ul>
                    </div>
                </span>
                <span>
                    <div style={{ width: "300px", textAlign: "center" }}>
                        <h1>List of all the names</h1>
                        <div
                            style={{
                                maxHeight: "600px",
                                overflow: "auto",
                                padding: "20px",
                                paddingTop: "10px",
                                borderColor: "#c7c7c73f",
                                backgroundColor: "#0d10161a",
                                borderStyle: "inset",
                                borderRadius: "7px",
                            }}
                        >
                            <ul
                                style={{
                                    textAlign: "left",
                                    paddingLeft: "0px",
                                }}
                            >
                                {countriesData.map((country, key) => (
                                    <DisplayEachCountry
                                        src={country.flags.svg}
                                        alt={country.flags.alt}
                                        countryName={country.name.common}
                                        key={key}
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>
                </span>
            </div>
        );
    }
}

function DisplayEachCountry({ src, alt, countryName }) {
    return (
        <span
            style={{
                display: "flex",
                marginTop: "20px",
            }}
        >
            <img
                style={{
                    height: "20px",
                    width: "auto",
                    marginRight: "20px",
                }}
                src={src}
                alt={alt}
            />
            <span>{countryName}</span>
        </span>
    );
}
