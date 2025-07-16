import React, { useRef, useState, useEffect } from "react";

const CircleDrawer = () => {
    const canvasRef = useRef(null);
    const [circles, setCircles] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPos, setStartPos] = useState(null);
    const [tempCircle, setTempCircle] = useState(null);

    const getMousePos = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();

        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    };

    const drawCircle = (ctx, circle, color = "rgba(0, 150, 255, 0.4)") => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
    };

    const redraw = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw permanent circles
        circles.forEach((circle) => drawCircle(ctx, circle));

        // Draw temp circle while dragging
        if (tempCircle) {
            drawCircle(ctx, tempCircle, "rgba(0,255,0,0.3)");
        }
    };

    const handleMouseDown = (e) => {
        const pos = getMousePos(e);
        setStartPos(pos);
        setIsDrawing(true);
    };

    const handleMouseMove = (e) => {
        if (!isDrawing) return;
        const currentPos = getMousePos(e);
        const radius = Math.hypot(
            currentPos.x - startPos.x,
            currentPos.y - startPos.y
        );
        setTempCircle({
            x: startPos.x,
            y: startPos.y,
            radius,
        });
    };

    const handleMouseUp = () => {
        if (tempCircle) {
            setCircles([...circles, tempCircle]);
        }
        setIsDrawing(false);
        setTempCircle(null);
    };

    useEffect(() => {
        redraw();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [circles, tempCircle]);

    return (
        <div style={{ margin: "200px" }}>
            <canvas
                ref={canvasRef}
                width={600}
                height={400}
                style={{ border: "1px solid black", cursor: "crosshair" }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            />
            <p>Draw up to two circles by dragging on the canvas.</p>
        </div>
    );
};

export default CircleDrawer;
