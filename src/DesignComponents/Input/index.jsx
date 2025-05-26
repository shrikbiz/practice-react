import React from "react";

export default function Input({
    name,
    style,
    isError,
    onChange,
    value,
    onBlur,
    onFocus,
}) {
    const [isFocused, setIsFocused] = React.useState(false);
    const borderColor = isError ? "#cc3300" : "#8c8c8c";
    return (
        <input
            name={name}
            style={{
                height: "1.5rem",
                backgroundColor: `${isFocused ? "#f2f2f2" : "#fff"}`,
                borderRadius: "5px",
                borderColor: borderColor,
                fontSize: "17px",
                ...style,
            }}
            value={value}
            onChange={onChange}
            onBlur={(e) => {
                setIsFocused(false);
                onBlur && onBlur(e);
            }}
            onFocus={(e) => {
                setIsFocused(true);
                onFocus && onFocus(e);
            }}
        />
    );
}
