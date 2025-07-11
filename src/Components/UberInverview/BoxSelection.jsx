import React, { useState, useEffect } from "react";

export default function BoxSelection() {
    const grid = [
        [1, 1, 0],
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
        [1, 1, 0],
    ];

    const [currentGrid, setCurrentGrid] = useState(grid);
    const [selectedSequence, setSelectedSequence] = useState([]);
    const validGridSize = grid
        .map((row) => row.reduce((a, b) => a + b))
        .reduce((a, b) => a + b);

    useEffect(() => {
        if (!selectedSequence.length) return;
        const isLastItemSelected = selectedSequence.length === validGridSize;

        function selectItem([row, column], value) {
            setCurrentGrid((prev) => {
                const newGrid = structuredClone(prev);
                newGrid[row][column] = value;
                return newGrid;
            });
        }

        selectItem(selectedSequence[selectedSequence.length - 1], 2);

        const lastIndex = selectedSequence.length - 1;
        if (isLastItemSelected) {
            let index = 0;
            function unSelect() {
                setTimeout(() => {
                    selectItem(selectedSequence[index], 1);

                    if (index < lastIndex - 1) {
                        index++;
                        unSelect();
                    } else {
                        const lastSelectedCell =
                            selectedSequence[selectedSequence.length - 1];
                        setSelectedSequence([lastSelectedCell]);
                    }
                }, 500);
            }
            unSelect();
        }
    }, [selectedSequence, validGridSize]);

    function handleSelection(row, column) {
        const isCurrentItemInSelectedSequence = selectedSequence.some(
            ([r, c]) => row === r && c === column
        );

        if (!isCurrentItemInSelectedSequence) {
            setSelectedSequence((prev) => {
                const newSq = structuredClone(prev);
                newSq.push([row, column]);
                return newSq;
            });
        }
    }

    return (
        <div style={{ top: "50px", left: "50px" }}>
            {currentGrid.map((row, rIndex) => (
                <div style={{ display: "flex" }}>
                    {row.map((column, cIndex) => (
                        // <div>{` | row: ${rIndex}, column: ${cIndex} | `}</div>
                        <Box
                            isVisible={column === 1 || column === 2}
                            isSelected={column === 2}
                            column={cIndex}
                            row={rIndex}
                            handleSelection={handleSelection}
                            setSelectedSequence={setSelectedSequence}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

function Box({ isSelected, isVisible, row, column, handleSelection }) {
    // console.log("🚀 ~ Box ~ row, column:", row, column, isSelected, isVisible);
    return (
        <div
            style={{
                height: "100px",
                width: "100px",
                border: isVisible ? "1px solid black" : "",
                margin: "10px",
                backgroundColor: isVisible && isSelected ? "green" : "white",
            }}
            onClick={() => isVisible && handleSelection(row, column)}
        ></div>
    );
}

/**
 * [
 *  [1,1,0]
 *  [1,1,1]
 *  [1,1,1]
 * ]
 *
 * // State that manages the state of the cell
 *      - isFilled
 *      -
 *
 *
 *
 *
 */
