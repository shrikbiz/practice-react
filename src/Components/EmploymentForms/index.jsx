import React, { useState } from "react";
import Button from "../../DesignComponents/Button";
import { phoneValidator } from "../PhoneInput";
import { DEFAULT_FORM_CONTENT, getErrorMessageList } from "./defaultContent";
import { useMyContext } from "../context";
import ErrorBoundary from "../errorBoundary";
import Input from "../../DesignComponents/Input";
import { Forms } from "../../DesignComponents/Forms";
import { FormItem } from "../../DesignComponents/Forms/formItem";

export default function EmploymentForms() {
    const { setUserName } = useMyContext();
    const storedValues =
        JSON.parse(sessionStorage.getItem("shrikbizForm")) ?? "";

    const [formContent, setFormContent] = useState(
        storedValues || DEFAULT_FORM_CONTENT
    );

    const [errorMessages, setErrorMessages] = useState([]);
    const [storedForms, setStoredForms] = useState([]);
    const handleOnChange = (e) => {
        const key = e.target.name;
        // if (e.target.name.includes("s")) {
        //     throw new Error("Shrikbiz error");
        // }
        setFormContent((prev) => ({
            ...prev,
            [key]: {
                ...prev[key],
                value:
                    key === "phoneNumber"
                        ? phoneValidator(e.target.value)
                        : e.target.value,
            },
        }));
        setErrorMessages([]);
        sessionStorage.setItem("shrikbizForm", JSON.stringify(formContent));
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        const errorList = getErrorMessageList(formContent);

        setErrorMessages(errorList);
        if (!errorList.length) {
            setUserName(() => formContent.firstName.value);
            setStoredForms((prev) => [...prev, formContent]);
            sessionStorage.setItem("shrikbizForm", null);
            setFormContent(() => DEFAULT_FORM_CONTENT);
            setErrorMessages(() => []);
        } else {
            const errorKeys = new Set(errorList.map(({ key }) => key));
            setFormContent((prev) => {
                Object.keys(prev).forEach(
                    (k) => (prev[k].isValid = !errorKeys.has(k))
                );
                return prev;
            });
        }
    };

    return (
        <>
            <div>
                <h1>Shrikbiz corp Employment form</h1>
                <section>
                    <form onSubmit={handleSubmitForm}>
                        <Forms>
                            {Object.keys(formContent).map((key, index) => (
                                <FormItem
                                    label={formContent[key].displayName}
                                    key={index}
                                >
                                    <Input
                                        name={key}
                                        value={formContent[key].value}
                                        onChange={handleOnChange}
                                        isError={!formContent[key].isValid}
                                    />
                                </FormItem>
                            ))}
                        </Forms>
                        <Button name="Submit" type="submit" />
                        <Button
                            name="Reset"
                            onClick={() => {
                                sessionStorage.setItem("shrikbizForm", null);
                                setFormContent(() => DEFAULT_FORM_CONTENT);
                                setErrorMessages(() => []);
                            }}
                        />
                        <ErrorArea
                            errorMessages={errorMessages}
                            isDisplaying={!!errorMessages.length}
                        />
                    </form>
                </section>
            </div>
            <Devider />
            <ErrorBoundary>
                <DisplayEmployees storedForms={storedForms} />
            </ErrorBoundary>
        </>
    );
}

function ErrorArea({ errorMessages, isDisplaying }) {
    const errorList = errorMessages.map(({ errorMessage }) => errorMessage);
    const displayError = (
        <>
            <h6>Error(s):</h6>
            <ul>
                {errorList.map((err) => (
                    <li>{err}</li>
                ))}
            </ul>
        </>
    );

    return (
        <div style={{ height: "200px", color: "red" }}>
            {isDisplaying && !!errorList.length && displayError}
        </div>
    );
}

function DisplayEmployees({ storedForms }) {
    return (
        <div>
            <h2>All Employees</h2>
            {storedForms.map((eachForm, k1) => (
                <div key={k1}>
                    <h3>Employee: {eachForm.firstName.value}</h3>
                    {Object.keys(eachForm).map((key, k2) => (
                        <div key={k2}>
                            {" "}
                            <strong>{key}</strong>: {eachForm[key].value}{" "}
                        </div>
                    ))}
                    <Devider size="sm" />
                </div>
            ))}
        </div>
    );
}

function Devider({ size }) {
    if (size === "sm") {
        return <div>---------------------------</div>;
    }
    return (
        <div>
            --------------------------------------------------------------------
        </div>
    );
}
