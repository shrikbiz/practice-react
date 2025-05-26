const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const requiredFieldMessage = (fieldName) => `${fieldName} is a required field.`;

export const DEFAULT_FORM_CONTENT = {
    firstName: {
        value: "",
        displayName: "First name",
        required: true,
        errorMessage: "",
        isValid: true,
    },
    lastName: {
        value: "",
        displayName: "Last name",
        required: true,
        errorMessage: "",
        isValid: true,
    },
    dob: {
        value: "",
        displayName: "Date of birth",
        required: false,
        errorMessage: "",
        isValid: true,
    },
    email: {
        value: "",
        displayName: "Email",
        required: true,
        errorMessage: "",
        isValid: true,
    },
    phoneNumber: {
        value: "",
        displayName: "Phone number",
        required: true,
        errorMessage: "",
        isValid: true,
    },
    address: {
        value: "",
        displayName: "Address",
        required: false,
        errorMessage: "",
        isValid: true,
    },
    position: {
        value: "",
        displayName: "Position",
        required: true,
        errorMessage: "",
        isValid: true,
    },
};

export const getErrorMessageList = (formContent) =>
    Object.keys(formContent)
        .map((key) => {
            let errorMessage = "";
            const formObject = formContent[key];
            if (formObject.required && !formObject.value)
                errorMessage = requiredFieldMessage(formObject.displayName);
            else if (key === "phoneNumber" && formObject.value.length < 14)
                errorMessage = "Invalid phone number.";
            else if (key === "email" && !formObject.value.match(emailRegex))
                errorMessage = "Email is invalid.";

            return { key, errorMessage };
        })
        .filter(({ errorMessage }) => !!errorMessage);
