import React from "react";

export function FormItem({ label, children, isRequired }) {
    return (
        <tr style={{ height: "50px" }}>
            {label && (
                <td
                    style={{
                        minWidth: "100px",
                        textAlign: "right",
                    }}
                >
                    <strong style={{ marginRight: "10px" }}>
                        {label}
                        {isRequired && <span style={{ color: "red" }}> *</span>}
                    </strong>
                </td>
            )}
            {children && <td>{children}</td>}
        </tr>
    );
}
