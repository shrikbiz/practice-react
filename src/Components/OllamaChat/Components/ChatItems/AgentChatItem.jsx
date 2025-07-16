import GradientText from "../Animations/GradientText";
import MarkdownRenderer from "../MarkdownRenderer";

export default function AgentChatItem({ chatItem }) {
    return chatItem.isLoading ? (
        <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={3}
            showBorder={false}
            className="custom-class"
        >
            <h3>Thinking</h3>
        </GradientText>
    ) : (
        <MarkdownRenderer markdown={chatItem.content} />
    );
}
