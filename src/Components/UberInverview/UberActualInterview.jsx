import React, { useEffect, useState } from "react";

import logo from "./logo.svg";
import "./App.css";

const fetchMessages = async (start = 0, limit = 20) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const now = new Date();
            const messages = Array.from({ length: limit }, (_, i) => {
                const id = start + i + 1;
                return {
                    id,
                    sender: ["Alice", "Bob", "You"][id % 3],
                    text: `This is message ${id}`,
                    timestamp: new Date(
                        now.getTime() - (limit - i) * 2 * 60 * 1000
                    ).toISOString(),
                };
            });
            resolve(messages);
        }, 500);
    });
};

function App() {
    const [messageList, setMessageList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(null);
    const [nextRequestingIndex, setNextRequestingIndex] = useState(0);
    const [draftMessage, setDraftMessage] = useState("");

    async function fetchRequiredMessage() {
        setIsLoading(true);
        const nextIndex = nextRequestingIndex;
        try {
            const response = await fetchMessages(nextIndex, 20);
            // update the order
            setMessageList((prev) => [...response, ...prev]);
        } catch (e) {
            setIsError(e);
        } finally {
            setIsLoading(false);
            setNextRequestingIndex((prev) => prev + 20);
        }
    }

    useEffect(() => {
        // need to work on this
        fetchRequiredMessage();
    }, []);

    useEffect(() => {
        let interval;
        function appendRandomMessage() {
            interval = setInterval(() => {
                setMessageList((prev) => [
                    ...prev,
                    {
                        id: "",
                        sender: "Alice",
                        text: `This is Random message`,
                        timestamp: new Date().toISOString(),
                    },
                ]);
            }, 5000);
        }
        appendRandomMessage();
        return () => clearInterval(interval);
    }, []);

    function hanldeTextArea(e) {
        setDraftMessage(e.target.value);
    }

    function handleSend() {
        setMessageList((prev) => [
            ...prev,
            {
                id: "",
                sender: "You",
                text: draftMessage,
                timestamp: new Date().toISOString(),
            },
        ]);
        setDraftMessage("");
    }

    function handleShowMore(e) {
        fetchRequiredMessage();
    }

    return (
        <section className="App">
            <div style={{ height: "80vh", overflowY: "scroll" }}>
                <div>
                    <button onClick={handleShowMore}>Show more</button>
                </div>
                {messageList.map((chatItem, index) => (
                    <div key={index}>
                        <div>{chatItem.sender}</div>
                        <div>{chatItem.text}</div>
                        <div>{chatItem.timestamp}</div>
                    </div>
                ))}
            </div>

            <footer>
                <div style={{ width: "80%" }}>
                    <textarea
                        style={{ width: "100%" }}
                        value={draftMessage}
                        onChange={hanldeTextArea}
                    ></textarea>
                </div>
                <div style={{ width: "20%" }} onClick={handleSend}>
                    <button>Send</button>
                </div>
            </footer>
        </section>
    );
}

export default App;
