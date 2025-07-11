import React, { useEffect, useState } from "react";

const BOARD = [
    [0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1, 0, 0],
];

export default function MineSweeper() {
    const [board, setBoard] = useState(getBoard());
    const [isGameOver, setIsGameOver] = useState(false);
    const [isWin, setIsWin] = useState(false);
    const [isFlaggingActive, setIsFlaggingActive] = useState(false);

    function handleCellClick(row, col) {
        if (isGameOver || isWin) {
            return;
        }
        if (isFlaggingActive) {
            setBoard((prev) =>
                prev.map((r, rIdx) =>
                    r.map((c, cIdx) => {
                        if (rIdx === row && cIdx === col) {
                            return {
                                ...c,
                                isFlagged: !c.isFlagged,
                            };
                        } else {
                            return c;
                        }
                    })
                )
            );
        } else if (!board[row][col].isFlagged && board[row][col].isMine) {
            setIsGameOver(true);
        } else if (!board[row][col].isFlagged) {
            setBoard((prev) =>
                prev.map((r, rIdx) =>
                    r.map((c, cIdx) => {
                        if (rIdx === row && cIdx === col) {
                            return {
                                ...c,
                                isOpen: true,
                            };
                        } else {
                            return c;
                        }
                    })
                )
            );
        }
    }

    function checkWin() {
        let isWin = true;
        board.forEach((row) =>
            row.forEach((col) => {
                if (col.isFlagged && !col.isMine) isWin = false;
                if (!col.isOpen && !col.isMine) isWin = false;
            })
        );
        return isWin;
    }
    useEffect(() => {
        setIsWin(checkWin());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [board]);

    return (
        <section>
            <div style={{ padding: "20px 100px" }}>
                <button
                    style={{
                        background: isFlaggingActive ? "grey" : "lightGrey",
                    }}
                    onClick={() => setIsFlaggingActive((prev) => !prev)}
                >
                    Flag
                </button>
            </div>
            <div style={{ display: "flex", padding: "10px 100px" }}>
                {board.map((row, rIdx) => (
                    <div>
                        {row.map((col, cIdx) => (
                            <div
                                style={{
                                    border: "1px black solid",
                                    width: "50px",
                                    height: "50px",
                                    background:
                                        col.isOpen || isGameOver
                                            ? col.isMine
                                                ? "lightpink"
                                                : "lightgreen"
                                            : "lightgrey",
                                    textAlign: "center",
                                    justifyContent: "center",
                                    // position: 'relative'
                                }}
                                onClick={() => handleCellClick(rIdx, cIdx)}
                            >
                                <div style={{ marginTop: "15px" }}>
                                    {col.isOpen || isGameOver
                                        ? col.isMine
                                            ? "💣"
                                            : col.mineCount !== 0
                                            ? col.mineCount
                                            : ""
                                        : col.isFlagged
                                        ? "🚩"
                                        : ""}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div style={{ padding: "20px 100px" }}>
                <div>
                    {!isWin && !isGameOver
                        ? "Game on"
                        : isWin
                        ? "You won the game"
                        : isGameOver
                        ? "Ops! Game over"
                        : ""}
                </div>
            </div>
        </section>
    );
}

function getBoard() {
    return BOARD.map((row, rIdx) =>
        row.map((col, cIdx) => ({
            isMine: col === 1,
            mineCount:
                col === 0 ? getSurroundingMineCount(BOARD, rIdx, cIdx) : 0,
            isOpen: false,
            isFlagged: false,
        }))
    );
}

function getSurroundingMineCount(grid, row, col) {
    let count = 0;
    if (grid?.[row - 1]?.[col - 1] === 1) count++;
    if (grid?.[row - 1]?.[col] === 1) count++;
    if (grid?.[row - 1]?.[col + 1] === 1) count++;
    if (grid?.[row]?.[col - 1] === 1) count++;
    if (grid?.[row]?.[col + 1] === 1) count++;
    if (grid?.[row + 1]?.[col - 1] === 1) count++;
    if (grid?.[row + 1]?.[col] === 1) count++;
    if (grid?.[row + 1]?.[col + 1] === 1) count++;
    return count;
}
