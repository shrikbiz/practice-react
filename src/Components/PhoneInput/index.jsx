import { useState } from "react";
import React from "react";

export default function PhoneInput() {
    const [phoneNumber, setPhoneNumber] = useState("");

    const handlePhoneInput = (e) =>
        setPhoneNumber(phoneValidator(e.target.value));

    return <input onChange={handlePhoneInput} value={phoneNumber} />;
}

export function phoneValidator(n) {
    let number = n.replace(/\D/g, "");
    if (number.length > 3) {
        const areaCode = number.slice(0, 3);
        const centralOfficeCode = number.slice(3, 6);
        const lineNumber = number.slice(6, 10);
        number = `(${areaCode})`;
        if (centralOfficeCode) {
            number = `${number} ${centralOfficeCode}`;
        }
        if (lineNumber) {
            number = `${number}-${lineNumber}`;
        }
    }
    return number;
}
