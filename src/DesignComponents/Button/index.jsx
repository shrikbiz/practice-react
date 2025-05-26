import React from "react";

export default function Button({ name, onClick, isSelected, type, disabled }) {
    const bgColor = getButtonBackgroundColor(isSelected, disabled);
    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            style={{
                backgroundColor: bgColor,
                color: `${isSelected ? "#c8cacc" : "#02020a"}`,
                margin: "10px",
                borderRadius: "7px",
            }}
        >
            <strong>{name}</strong>
        </button>
    );
}

function getButtonBackgroundColor(isSelected, disabled) {
    if (disabled) return "#8c8c8c";
    if (isSelected) return "#15223b";
    return "#5174bb";
}
