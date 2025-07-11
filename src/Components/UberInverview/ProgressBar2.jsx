import React, { useState, useEffect } from "react";
import "./style.css";

const MAX_BARS = 3;

export default function ProgressBarMain() {
    const [bars, setBars] = useState([]);
    const [pending, setPending] = useState(0);

    function handleComplete(currentId) {
        setBars((prev) => prev.filter(({ id }) => id !== currentId));
    }

    function handleAdd() {
        if (bars.length >= MAX_BARS) {
            setPending((prev) => prev + 1);
        } else {
            setBars((prev) => [...prev, { id: keyGenerator() }]);
        }
    }

    useEffect(() => {
        if (bars.length < MAX_BARS && pending !== 0) {
            handleAdd();
            setPending((prev) => prev - 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bars]);

    return (
        <div style={{ height: "100px", width: "300px" }}>
            <div style={{ height: "100px" }}>
                <button onClick={handleAdd}>Add</button>
            </div>
            <div style={{ height: "50px" }}>
                <span>Pending requests: {pending}</span>
            </div>
            <div>
                {bars.map(({ id }) => (
                    <ProgressBar
                        key={id}
                        id={id}
                        handleComplete={handleComplete}
                    />
                ))}
            </div>
        </div>
    );
}

function ProgressBar({ id, handleComplete }) {
    const [filled, setFilled] = useState(0);

    useEffect(() => {
        let counter = 0;
        let interval;
        interval = setInterval(() => {
            if (counter > 100) {
                handleComplete(id);
                clearInterval(interval);
            }
            counter++;
            setFilled(counter);
        }, Math.floor(Math.random() * 100));

        return () => clearInterval(interval);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div key={id} className="progressContainer">
            <div className="progressBar">
                <div className="filled" style={{ width: `${filled}%` }}></div>
            </div>
            ;
        </div>
    );
}

function keyGenerator() {
    return `${Math.floor(Math.random() * 1000)}-${Math.floor(
        Math.random() * 1000
    )}`;
}
