import React, { useEffect, useState } from "react";
import Button from "../../DesignComponents/Button";

export default function Counter() {
    const [counter, setCounter] = useState(0);
    const [incementBy, setIncrementBy] = useState(0);
    const [decrementBy, setDecrementBy] = useState(0);
    const [rNumber, setRNumber] = useState(0);

    useEffect(() => {
        setRNumber(Math.floor(1000000 * Math.random()));
        console.log("Counter: ", counter);
        return () => {
            console.log("Destroying with number: ", counter);
        };
    }, [counter]);

    const handleIncrementButton = () => {
        setCounter((val) => val + incementBy);
        setIncrementBy(0);
    };

    const handleDecrementButton = () => {
        setCounter((val) => val - decrementBy);
        setDecrementBy(0);
    };

    const handleKeyDownWith = (fn) => (e) => e.key === "Enter" && fn();

    const handleOnFocus = (fn) => () => fn((val) => (val === 0 ? "" : val));

    const handleInput = (fn) => (e) =>
        fn(Number(e.target.value.replace(/\D/g, "")));

    const handleReset = () => {
        setCounter(0);
        setIncrementBy(0);
        setDecrementBy(0);
    };

    return (
        <div>
            <h1>Counter: {counter}</h1>
            <div>
                <span>
                    <Button
                        onClick={() => setCounter((val) => ++val)}
                        name={"Increment by 1"}
                    />
                </span>
                <span>
                    <Button
                        onClick={() => setCounter((val) => --val)}
                        name={"Decreement by 1"}
                    />
                </span>
            </div>
            <div>
                <span>
                    <strong>Increment counter by:</strong>
                </span>{" "}
                <input
                    value={incementBy}
                    onChange={handleInput(setIncrementBy)}
                    onKeyDown={handleKeyDownWith(handleIncrementButton)}
                    onFocus={handleOnFocus(setIncrementBy)}
                />
                <Button name={"Increment"} onClick={handleIncrementButton} />
            </div>
            <div>
                <span>
                    <strong>Decrement counter by: </strong>
                </span>{" "}
                <input
                    value={decrementBy}
                    onChange={handleInput(setDecrementBy)}
                    onKeyDown={handleKeyDownWith(handleDecrementButton)}
                    onFocus={handleOnFocus(setDecrementBy)}
                />
                <Button name={"Decrement"} onClick={handleDecrementButton} />
            </div>

            <div>
                <Button name="Reset" onClick={handleReset} />
            </div>

            <div
                style={{
                    width: "150px",
                    height: "150px",
                    backgroundColor: `#${rNumber}`,
                }}
            >
                <span style={{ margin: "10px" }}>RandomNumber: </span>
                <span style={{ margin: "10px" }}>#{rNumber} </span>
            </div>
        </div>
    );
}
