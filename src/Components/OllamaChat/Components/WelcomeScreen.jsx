import React from "react";
import GradientText from "./Animations/GradientText";
import Threads from "./Animations/Threads";

const WelcomeScreen = () => {
    return (
        <div
            style={{
                width: "100%",
                height: "300px",
                position: "relative",
            }}
        >
            <div style={{ paddingTop: "100px" }}>
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
                    <h1>Welcome to Ollama chat</h1>
                </GradientText>
            </div>
            <Threads
                amplitude={2.6}
                distance={0.4}
                enableMouseInteraction={true}
            />
        </div>
    );
};

export default React.memo(WelcomeScreen);
