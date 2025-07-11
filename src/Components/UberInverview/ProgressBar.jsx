import React, { useEffect } from "react";

export default function ProgressBar() {
    const [activeBars, setActiveBars] = React.useState([]);
    const [pendingRequests, setPendingRequests] = React.useState(0);

    useEffect(() => {
        if (activeBars.length < 3 && pendingRequests !== 0) {
            addNewBar();
            setPendingRequests((prev) => prev - 1);
        }
    }, [activeBars.length, pendingRequests]);

    function addNewBar() {
        const newBar = {
            uid: Math.floor(Math.random() * 1000),
        };
        setActiveBars((prev) => [...prev, newBar]);
    }

    function handleOnCompelet(id) {
        setActiveBars((prev) => [...prev].filter(({ uid }) => uid !== id));
    }

    function handleAdd() {
        if (activeBars.length < 3) addNewBar();
        else setPendingRequests((prev) => prev + 1);
    }

    return (
        <div style={{ margin: "30px" }}>
            <div>
                <>ProgressBar</>
            </div>
            <div>
                <button onClick={handleAdd}>Add</button>
                {pendingRequests !== 0 && (
                    <span style={{ marginLeft: "10px" }}>
                        Pending requests: {pendingRequests}
                    </span>
                )}
            </div>

            <div style={{ width: "500px", margin: "20px" }}>
                {activeBars.map(({ uid }, index) => (
                    <div key={uid}>
                        <span
                            style={{
                                marginRight: "10px",
                                alignContent: "center",
                                bottom: 0,
                            }}
                        >
                            {uid}
                        </span>
                        <span>
                            <Bar
                                index={index}
                                onComplete={handleOnCompelet}
                                uid={uid}
                            />
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Bar({ height, width, uid, onComplete }) {
    const [completed, setCompleted] = React.useState(0);

    React.useEffect(() => {
        let counter = 0;
        let interval;
        interval = setInterval(() => {
            setCompleted(counter++);
            if (counter > 100) {
                onComplete(uid);
                clearInterval(interval);
            }
        }, 30);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            style={{
                marginTop: "20px",
                border: "1px solid black",
                height: height ?? "20px",
                width: width ?? "100%",
            }}
        >
            <div
                style={{
                    height: height ?? "20px",
                    backgroundColor: "green",
                    width: `${completed}%`,
                }}
            ></div>
        </div>
    );
}
