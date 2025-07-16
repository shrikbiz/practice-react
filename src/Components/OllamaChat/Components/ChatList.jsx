import GradientText from "./Animations/GradientText";
import MarkdownRenderer from "./MarkdownRenderer";

export default function ChatList({ chatItems }) {
    return (
        <div
            style={{
                width: "100%",
                maxWidth: 800,
                minWidth: 0,
                margin: "0 auto",
                padding: "0 16px",
                boxSizing: "border-box",
            }}
        >
            {chatItems.map((chatItem, index) => (
                <div
                    key={index}
                    style={{
                        marginTop: "30px",
                        display: "flex",
                        justifyContent:
                            chatItem.role === "user" ? "flex-end" : "center",
                    }}
                >
                    {chatItem.role === "user" ? (
                        <div
                            style={{
                                maxWidth: "70%",
                                padding: "10px",
                                borderRadius: "10px",
                                background: "#383942", // dark gray for user
                                color: "#f7f7f8",
                                textAlign: "right",
                                border: "1px solid #444654",
                                wordBreak: "break-word",
                                overflowWrap: "break-word",
                                whiteSpace: "pre-wrap",
                            }}
                        >
                            <pre
                                style={{
                                    lineHeight: "1.5",
                                    margin: 0,
                                    background: "none",
                                    border: "none",
                                    color: "inherit",
                                    fontFamily: "inherit",
                                    whiteSpace: "pre-wrap",
                                    wordBreak: "break-word",
                                    overflowWrap: "break-word",
                                }}
                            >
                                {chatItem.content}
                            </pre>
                        </div>
                    ) : chatItem.isLoading ? (
                        <GradientText
                            colors={[
                                "#40ffaa",
                                "#4079ff",
                                "#40ffaa",
                                "#4079ff",
                                "#40ffaa",
                            ]}
                            animationSpeed={3}
                            showBorder={false}
                            className="custom-class"
                        >
                            {" "}
                            Thinking{" "}
                        </GradientText>
                    ) : (
                        <MarkdownRenderer markdown={chatItem.content} />
                    )}
                </div>
            ))}
        </div>
    );
}
