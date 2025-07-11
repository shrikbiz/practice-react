import React from "react";

const STICKERS = [
    "cat",
    "dog",
    "lion",
    "horse",
    "unicon",
    "zebra",
    "deer",
    "mountainLion",
];

const GRID_SIZE = [4, 4];

export function MemoryGame() {
    const [rowSize, columnSize] = GRID_SIZE;

    const [displayPair, setDisplayPair] = React.useState([]);

    const [grid, setGrid] = React.useState(createGrid(rowSize, columnSize));

    const handleCardClick = (row, col) => {
        // condition to check if we are not clicking on revealed item;
        if (!grid[row][col].isHidden || grid[row][col].isSolved) {
            return;
        }

        if (displayPair.length > 1) {
            setGrid((prev) => {
                prev[displayPair[0][0]][displayPair[0][1]].isHidden = true;
                prev[displayPair[1][0]][displayPair[1][1]].isHidden = true;
                prev[row][col].isHidden = false;
                return prev;
            });

            setDisplayPair(() => [[row, col]]);
            // reset displayPair and make sure we are not clicking on revealed item.
        } else {
            // reveal the clicked box.
            setGrid((prev) => {
                if (
                    displayPair.length > 0 &&
                    prev[displayPair[0][0]][displayPair[0][1]].sticker ===
                        prev[row][col].sticker
                ) {
                    prev[displayPair[0][0]][displayPair[0][1]].isSolved = true;
                    prev[row][col].isSolved = true;
                }
                prev[row][col].isHidden = false;
                return prev;
            });
            setDisplayPair((prev) => [...prev, [row, col]]);
        }
    };

    return (
        <div style={{ width: "660px", marginLeft: "150px" }}>
            <div
                style={{
                    display: "grid",
                    gridTemplateRows: "150px ".repeat(rowSize),
                    gridTemplateColumns: "150px ".repeat(columnSize),
                    gap: "10px",
                    border: "2px black solid",
                    padding: "10px",
                }}
            >
                {grid.map((row, rIdx) =>
                    row.map((col, cIdx) => (
                        <div
                            key={`${rIdx}-${cIdx}`}
                            style={{
                                textAlign: "center",
                                paddingTop: "70px",
                                border: "2px black solid",
                            }}
                            onClick={() => handleCardClick(rIdx, cIdx)}
                        >
                            {!col.isHidden || col.isSolved ? (
                                <span>{col.sticker}</span>
                            ) : null}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

function createGrid(rowSize, columnSize) {
    const grid = Array.from({ length: rowSize }, () =>
        new Array(columnSize).fill("-")
    );

    // 16 stricker for now.
    const stickers = STICKERS.concat(STICKERS);
    jumbleStricker(stickers);

    let index = 0;
    for (let row = 0; row < rowSize; row++) {
        for (let col = 0; col < columnSize; col++) {
            grid[row][col] = {
                sticker: stickers[index],
                isSolved: false,
                isHidden: true,
            };
            index++;
        }
    }

    return grid;
}

function jumbleStricker(stickers) {
    let index = 0;

    while (index < stickers.length) {
        const swapingIndex = Math.floor(Math.random() * 1000) % stickers.length;
        swap(stickers, index, swapingIndex);
        index++;
    }
}

function swap(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
