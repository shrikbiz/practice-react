import React from "react";
// import BoxSelection from "./BoxSelection";
// import ProgressBar from "./ProgressBar";
import Unnamed from "./Unnamed";
import { MemoryGame } from "./MemoryGame";
import { BoxSelection2 } from "./BoxSelection2";
import ProgressBarMain from "./ProgressBar2";
import ManeSweeper from "./MineSweeper2";
import CircleDrawer from "./DrawCircles";
import BentoGrid from "./BentoGrid";

export default function UberInterview() {
    // const visible = "BOX";
    // const visible = "PROGRESS_BAR";
    // const visible = "RANDOM";
    // const visible = "MEMORY_GAME";
    // const visible = "MINESWEEPER";
    // const visible = "BENTO_GRID";
    const visible = "DRAW_CIRCLES";

    if (visible === "BOX") {
        return <BoxSelection2 />;
    } else if (visible === "PROGRESS_BAR") {
        return <ProgressBarMain />;
    } else if (visible === "RANDOM") {
        return <Unnamed />;
    } else if (visible === "MEMORY_GAME") {
        return <MemoryGame />;
    } else if (visible === "MINESWEEPER") {
        return <ManeSweeper />;
    } else if (visible === "DRAW_CIRCLES") {
        return <CircleDrawer />;
    } else if (visible === "BENTO_GRID") {
        return <BentoGrid />;
    } else {
        return <>Nothing</>;
    }
}
