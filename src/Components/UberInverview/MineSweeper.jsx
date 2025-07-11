import React, { useState, useEffect } from "react";

const BOMB = "💣";
const FLAG = "🚩";

export default function ManeSweeper() {
    const [grid, setGrid] = useState(createGrid(5, 5));
    const [isGameOver, setIsGameOver] = useState(false);
    const [isDevMode, _] = useState(true);
    const [isFlagActive, setIsFlagActive] = useState(false);
    const [isWin, setIsWin] = useState(false);

    function activateFlag() {
        setIsFlagActive((prev) => !prev);
    }

    function hanldeCellClick(row, col) {
        if (isFlagActive) {
            setGrid((prev) =>
                prev.map((r, rIdx) =>
                    r.map((c, cIdx) => ({
                        ...c,
                        isFlaged:
                            rIdx === row && cIdx === col
                                ? !c.isFlaged
                                : c.isFlaged,
                    }))
                )
            );
        } else {
            if (grid[row][col].isFlaged) {
                return;
            }
            const currentCell = grid[row][col];
            if (currentCell.isMine) {
                setIsGameOver(true);
                setGrid((prev) =>
                    prev.map((r) =>
                        r.map((c) => ({
                            ...c,
                            isOpened: c.isFlaged && c.isMine ? false : true,
                        }))
                    )
                );
                // do the actions for game over;
            } else {
                setGrid((prev) =>
                    prev.map((r, rIdx) =>
                        r.map((c, cIdx) => ({
                            ...c,
                            isOpened:
                                rIdx === row && cIdx === col
                                    ? true
                                    : c.isOpened,
                        }))
                    )
                );
            }
        }
    }

    useEffect(() => {
        function checkWin() {
            let success = true;
            grid.forEach((row) =>
                row.forEach((col) => {
                    // if(col.)
                    if (!col.isOpened && !col.isFlaged && !col.isMine)
                        success = false;
                    if (col.isOpened && col.isMine) success = false;
                    if (!col.isOpened && col.isFlaged && !col.isMine)
                        success = false;
                })
            );
            return success;
        }
        setIsWin(checkWin());
    }, [grid]);

    function handleRestart() {
        setGrid(createGrid(5, 5));
        setIsGameOver(false);
    }

    return (
        <section>
            <div
                style={{
                    margin: "30px 70px",
                    width: "200px",
                    textAlign: "center",
                }}
            >
                <button
                    onClick={activateFlag}
                    style={{ background: isFlagActive ? "darkgrey" : "grey" }}
                >
                    {FLAG}
                </button>
            </div>

            <div
                style={{
                    display: "flex",
                    // margin: "30px",
                    margin: "30px 100px",
                }}
            >
                {grid.map((row, rIdx) => (
                    <div>
                        {row.map((col, cIdx) => (
                            <div
                                style={{
                                    width: "30px",
                                    height: "30px",
                                    border: "1px solid black",
                                    textAlign: "center",
                                    position: "relative",
                                    background: col.isOpened
                                        ? col.isMine
                                            ? "red"
                                            : "lightgreen"
                                        : "lightblue",
                                }}
                                key={`${rIdx}-${cIdx}`}
                                onClick={() => hanldeCellClick(rIdx, cIdx)}
                            >
                                <MineSweepCell
                                    col={col}
                                    isGameOver={isGameOver}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div
                style={{
                    margin: "30px 70px",
                    width: "200px",
                    textAlign: "center",
                }}
            >
                {isWin || isGameOver ? (
                    <>
                        <div>
                            {isGameOver
                                ? "Ops! Game over."
                                : "YOU WON! Congratulations."}
                        </div>
                        <div>
                            <button onClick={handleRestart}>Restart</button>
                        </div>
                    </>
                ) : null}
            </div>

            {isDevMode && (
                <div style={{ display: "flex", margin: "100px" }}>
                    {grid.map((row, rIdx) => (
                        <div>
                            {row.map((col, cIdx) => (
                                <div
                                    style={{
                                        width: "30px",
                                        height: "30px",
                                        border: "1px solid black",
                                        textAlign: "center",
                                        position: "relative",
                                    }}
                                    key={`${rIdx}-${cIdx}`}
                                >
                                    {/* <MineSweepCell col={col} /> */}
                                    {col.isMine ? BOMB : col.revealedValue}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

function MineSweepCell({ col, isGameOver }) {
    if (col.isOpened) {
        return (
            <>
                {col.isMine
                    ? BOMB
                    : col.revealedValue && !isGameOver
                    ? col.revealedValue
                    : ""}
            </>
        );
    } else if (col.isFlaged) {
        return <>{FLAG}</>;
    } else {
        return <></>;
    }
}

function checkNeighbors(grid, row, col) {
    let totalBombs = 0;
    if (grid?.[row - 1]?.[col - 1] === 1) totalBombs++;
    if (grid?.[row - 1]?.[col] === 1) totalBombs++;
    if (grid?.[row - 1]?.[col + 1] === 1) totalBombs++;
    if (grid?.[row]?.[col - 1] === 1) totalBombs++;
    if (grid?.[row]?.[col + 1] === 1) totalBombs++;
    if (grid?.[row + 1]?.[col - 1] === 1) totalBombs++;
    if (grid?.[row + 1]?.[col] === 1) totalBombs++;
    if (grid?.[row + 1]?.[col + 1] === 1) totalBombs++;
    return totalBombs;
}

function createGrid(row, col) {
    const dummyGrid = Array.from({ length: row }, () => new Array(col).fill(0));
    const grid = Array.from({ length: row }, () => new Array(col).fill(0));
    let totalMines = 0;

    const maxAllowedMines = (row * col) / 3;
    const minAllowedMines = (row * col) / 6;

    while (totalMines > maxAllowedMines || totalMines < minAllowedMines) {
        totalMines = Math.floor(Math.random() * 100) % Math.floor(row * col);
    }

    const visited = new Set();

    while (totalMines > 0) {
        const rowIndex = Math.floor(Math.random() * 100) % row;
        const colIndex = Math.floor(Math.random() * 100) % col;
        const key = `${rowIndex}-${colIndex}`;
        if (!visited.has(key)) {
            visited.add(key);
            totalMines--;
            dummyGrid[rowIndex][colIndex] = 1;
        }
    }

    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            const isMine = dummyGrid[r][c] === 1;
            const revealedValue = checkNeighbors(dummyGrid, r, c);
            grid[r][c] = {
                isMine,
                isOpened: false,
                isFlaged: false,
                revealedValue,
            };
        }
    }

    return grid;
}
