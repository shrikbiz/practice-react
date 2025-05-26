import { useEffect, useState } from "react";

export const useDebounce = (searchText, countriesData, delay = 500) => {
    const [displayList, setDisplayList] = useState([]);
    useEffect(() => {
        const timer = setTimeout(() => {
            setDisplayList(
                searchText.length
                    ? countriesData
                          .filter((n) =>
                              stringMatching(
                                  n.name.common.toLowerCase(),
                                  searchText.toLowerCase()
                              )
                          )
                          .sort((a, b) =>
                              sortingCloseToSearchText(a, b, searchText)
                          )
                    : []
            );
        }, delay);
        return () => clearTimeout(timer);
    }, [countriesData, searchText, delay]);
    return displayList;
};

export function stringMatching(str, matchingStr) {
    let m = 0;
    let c = 0;
    while (m < str.length) {
        if (str[m] === matchingStr[c]) c++;
        m++;
    }
    return c >= matchingStr.length;
}

function sortingCloseToSearchText(a, b, searchText) {
    // Calculate how well each country matches the searchText
    // 1. Exact match (case-insensitive) comes first
    // 2. Then, startsWith
    // 3. Then, indexOf (closer to 0 is better)
    // 4. Then, fallback to alphabetical

    const aName = a.name.common.toLowerCase();
    const bName = b.name.common.toLowerCase();
    const search = searchText.toLowerCase();

    // Exact match
    if (aName === search && bName !== search) return -1;
    if (bName === search && aName !== search) return 1;

    // Starts with
    if (aName.startsWith(search) && !bName.startsWith(search)) {
        return -1;
    }
    if (bName.startsWith(search) && !aName.startsWith(search)) {
        return 1;
    }

    // First matching char
    const firstA = aName.charAt(0);
    const firstB = bName.charAt(0);
    const firstSearch = search.charAt(0);
    if (firstA === firstSearch && firstB !== firstSearch) {
        return -1;
    }
    if (firstB === firstSearch && firstA !== firstSearch) {
        return 1;
    }

    // Index of (closer to 0 is better)
    const aIndex = aName.indexOf(search);
    const bIndex = bName.indexOf(search);
    if (aIndex !== bIndex) return aIndex - bIndex;

    // Fallback to alphabetical
    return aName.localeCompare(bName);
}
