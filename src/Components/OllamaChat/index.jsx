import { useEffect, useState, useRef } from "react";
import { decodeAndStreamResponse, requestOllama } from "./util";

import TextEditor from "./TextEditor";
import ChatList from "./ChatList";

export default function OllamaChat() {
    const [input, setInput] = useState("");
    const [isProcessingQuery, setIsProcessingQuery] = useState(false);
    const controllerRef = useRef(null);

    const [chatItems, setChatItems] = useState([]);
    const chatListRef = useRef(null); // Add ref for chat list
    function handleRun(e) {
        if (isProcessingQuery && controllerRef.current) {
            try {
                controllerRef.current.abort();
            } catch {}
        } else {
            e.preventDefault();
            setChatItems((prev) => [...prev, { role: "user", content: input }]);
            setInput("");
        }
    }

    async function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    async function fetchMessages() {
        const controller = new AbortController();
        controllerRef.current = controller;

        setIsProcessingQuery(true);

        await delay(400);
        const newAgentResponse = {
            role: "assistant",
            content: "",
            isLoading: true,
            isStreaming: true,
        };
        setChatItems((prev) => [...prev, newAgentResponse]);

        try {
            const response = await requestOllama(chatItems, controller);
            decodeAndStreamResponse(
                response,
                setChatItems,
                setIsProcessingQuery
            );
        } catch (error) {
            console.error(error);
        } finally {
            setChatItems((prev) => {
                const newChatItems = [...prev];
                newChatItems[newChatItems.length - 1].isLoading = false;
                newChatItems[newChatItems.length - 1].isStreaming = false;
                return newChatItems;
            });
        }
    }

    useEffect(() => {
        if (chatItems.length && chatItems[chatItems.length - 1].role === "user")
            fetchMessages();

        if (chatListRef.current) {
            chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatItems]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: "calc(100vh - 71px)", // 100vh minus navbar height
                width: "100vw",
                background: "#1a1a1a", // dark background like ChatGPT
                color: "#e5e5e5", // light text for contrast
            }}
        >
            <div
                ref={chatListRef}
                style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "24px 0",
                    boxSizing: "border-box",
                    width: "100%",
                }}
            >
                <ChatList chatItems={chatItems} />
            </div>
            <TextEditor
                handleRun={handleRun}
                input={input}
                setInput={setInput}
                isProcessingQuery={isProcessingQuery}
            />
        </div>
    );
}
