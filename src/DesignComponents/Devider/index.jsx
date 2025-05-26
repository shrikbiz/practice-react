import React from "react";

export default function Devider({ size }) {
    if (size === "sm") {
        return <div>---------------------------</div>;
    }
    return (
        <div>
            --------------------------------------------------------------------
        </div>
    );
}
