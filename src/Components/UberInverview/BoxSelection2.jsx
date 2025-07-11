import React from "react";

const GRID = [
    [1, 1, 0],
    [0, 1, 1],
    // [1, 0, 1],
    // [1, 1, 1],
    [1, 1, 0],
];

const SELECTABLE = GRID.reduce(
    (prev, curr) => prev + curr.reduce((a, b) => a + b),
    0
);
export function BoxSelection2() {
    const [grid, setGrid] = React.useState(GRID);

    const [selectionSequence, setSelectionSequence] = React.useState([]);

    const hanldeClick = (row, col) => {
        if (grid[row][col] !== 0) {
            if (grid[row][col] === 1) {
                setSelectionSequence((prev) => [...prev, [row, col]]);
                updateGridCell(row, col, 2);
            }
        }
    };

    function updateGridCell(row, col, val) {
        setGrid((prev) => {
            const newGrid = structuredClone(prev);
            newGrid[row][col] = val;
            return newGrid;
        });
    }

    React.useEffect(() => {
        if (selectionSequence.length === SELECTABLE) {
            let index = 0;
            function offLoadSelected() {
                if (index === selectionSequence.length) {
                    setSelectionSequence([]);
                } else {
                    setTimeout(() => {
                        const [row, col] = selectionSequence[index];
                        updateGridCell(row, col, 1);
                        index++;
                        offLoadSelected();
                    }, 200);
                }
            }
            offLoadSelected();
        }
    }, [selectionSequence]);

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "50px ".repeat(grid[0].length),
                gridTemplateRows: "50px ".repeat(grid.length),
                gap: "10px",
                padding: "100px",
            }}
        >
            {grid.map((row, rIdx) =>
                row.map((col, cIdx) => (
                    <div
                        key={`${rIdx}-${cIdx}`}
                        style={{
                            border: col === 0 ? "none" : "1px black solid",
                            borderRadius: "10px",
                            background: col === 2 ? "green" : "none",
                        }}
                        onClick={() => hanldeClick(rIdx, cIdx)}
                    ></div>
                ))
            )}
        </div>
    );
}
