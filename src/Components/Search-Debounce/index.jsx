import React, { useState, useEffect } from "react";
import { NamesList } from "./nameList";

export default function SearchDebounce() {
    const [searchText, setSearchText] = useState("");

    const displayList = useDebounce(searchText);

    const handleSearchInput = (e) => {
        setSearchText(e.target.value);
    };

    return (
        <div style={{ display: "flex" }}>
            <span>
                <h1>Find the name</h1>
                <div style={{ marginTop: "50px", marginLeft: "2em" }}>
                    <input onChange={handleSearchInput} value={searchText} />
                </div>
                <div style={{ width: "550px", textAlign: "left" }}>
                    <ul>
                        {displayList.map((n, i) => (
                            <p key={i}>{n}</p>
                        ))}
                    </ul>
                </div>
            </span>
            <span>
                <div style={{ width: "300px", textAlign: "center" }}>
                    <h1>List of all the names</h1>
                    <ul style={{ textAlign: "left" }}>
                        {NamesList.map((n, i) => (
                            <p key={i}>{n}</p>
                        ))}
                    </ul>
                </div>
            </span>
        </div>
    );
}

const useDebounce = (searchText, delay = 500) => {
    const [displayList, setDisplayList] = useState([]);

    useEffect(() => {
        console.log("during running useEffect", searchText);
        const timer = setTimeout(() => {
            console.log("searchText in timer", searchText);
            setDisplayList(
                searchText.length
                    ? NamesList.filter(
                          (n) =>
                              stringMatching(
                                  n.toLowerCase(),
                                  searchText.toLowerCase()
                              )
                          //   n.toLowerCase().includes(searchText.toLowerCase())
                      )
                    : []
            );
        }, delay);

        // What does the return statement of useEffect do?
        return () => {
            console.log("during destroying", searchText);
            clearTimeout(timer);
        };
    }, [searchText, delay]);
    return displayList;
};

function stringMatching(str, matchingStr) {
    let m = 0;
    let c = 0;
    while (m < str.length) {
        if (str[m] === matchingStr[c]) c++;
        m++;
    }
    return c >= matchingStr.length;
}
