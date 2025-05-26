import React from "react";

export default function DebounceExample() {
    const [inputText, setInputText] = React.useState("");

    return (
        <>
            <header>
                <div>
                    <input
                        id="input"
                        onChange={(e) => setInputText(e.target.value)}
                        value={inputText}
                    />
                </div>
                <div>
                    <h3>Default:</h3> <span id="default"></span>
                </div>
                <div>
                    <h3>Debounce:</h3> <span id="debounce"></span>
                </div>
                <div>
                    <h3>Throttle:</h3> <span id="throttle"></span>
                </div>
            </header>
        </>
    );
}
