import React from "react";

export default class ErrorBoundary extends React.Component {
    state = { hasError: false };

    // Only used for updating the state.
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    // Running specific code
    componentDidCatch(error, info) {
        console.log(error, info);
    }

    render() {
        if (this.state.hasError) return <>Error! Please try again.</>;
        return this.props.children;
    }
}
