import React, { useState } from "react";
import "./Calculator.css";

export default function Calculator() {
    const [expression, setExpression] = useState("");

    const appendValue = (val) => {
        setExpression((prev) => prev + val);
    };

    const appendOperator = (op) => {
        if (expression === "" || /[+\-*/.]$/.test(expression)) return;
        setExpression((prev) => prev + op);
    };

    const clear = () => {
        setExpression("");
    };

    const calculate = () => {
        try {
            const result = evaluateExpression(expression);
            setExpression(result.toString());
        } catch {
            setExpression("Error");
        }
    };

    return (
        <div className="calculator">
            <div className="display">{expression || "0"}</div>
            <div className="buttons">
                <button className="clear" onClick={clear}>
                    C
                </button>
                <button className="equals" onClick={calculate}>
                    =
                </button>
                <button onClick={() => appendValue("7")}>7</button>
                <button onClick={() => appendValue("8")}>8</button>
                <button onClick={() => appendValue("9")}>9</button>
                <button
                    className="operator"
                    onClick={() => appendOperator("+")}
                >
                    +
                </button>

                <button onClick={() => appendValue("4")}>4</button>
                <button onClick={() => appendValue("5")}>5</button>
                <button onClick={() => appendValue("6")}>6</button>
                <button
                    className="operator"
                    onClick={() => appendOperator("-")}
                >
                    −
                </button>

                <button onClick={() => appendValue("1")}>1</button>
                <button onClick={() => appendValue("2")}>2</button>
                <button onClick={() => appendValue("3")}>3</button>
                <button
                    className="operator"
                    onClick={() => appendOperator("*")}
                >
                    ×
                </button>

                <button></button>
                <button onClick={() => appendValue("0")}>0</button>
                <button onClick={() => appendValue(".")}>.</button>

                <button
                    className="operator"
                    onClick={() => appendOperator("/")}
                >
                    ÷
                </button>
            </div>
        </div>
    );
}

function evaluateExpression(expr) {
    console.log("🚀 ~ evaluateExpression ~ expr:", expr);
    // const tokens = expr.match(/(\d+(\.\d+)?|[+\-*/])/g);
    // const tokens = expr.match(/(\d+(\.\d+)?|[+\-*/])/g);

    const tokens = [];

    let index = 0;

    while (index < expr.length) {
        let char = expr[index];

        if (!isNaN(char) || char === ".") {
            // Start of a number (could be multi-digit or decimal)
            let numStr = "";
            while (
                index < expr.length &&
                (!isNaN(expr[index]) || expr[index] === ".")
            ) {
                numStr += expr[index];
                index++;
            }
            tokens.push(parseFloat(numStr));
        } else if ("+-*/".includes(char)) {
            tokens.push(char);
            index++;
        } else {
            // Invalid character, skip or throw error
            index++;
        }
    }

    if (!tokens) throw new Error("Invalid expression");

    // First pass: handle *, /
    let stack = [];
    let i = 0;

    while (i < tokens.length) {
        const token = tokens[i];
        if (token === "*" || token === "/") {
            const prev = parseFloat(stack.pop());
            const next = parseFloat(tokens[++i]);
            const result = token === "*" ? prev * next : prev / next;
            stack.push(result);
        } else {
            stack.push(token);
        }

        i++;
    }

    // Second pass: handle +, -
    let result = parseFloat(stack[0]);
    i = 1;
    while (i < stack.length) {
        const operator = stack[i];
        const next = parseFloat(stack[i + 1]);
        result = operator === "+" ? result + next : result - next;
        i += 2;
    }

    return result;
}
