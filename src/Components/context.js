import { createContext, useContext, useState } from "react";

const MyContext = createContext(null);

export const useMyContext = () => {
    const [userName, setUserName] = useState("");
    const context = useContext(MyContext);
    if (context === null) return { userName, setUserName };
    return context;
};

export default MyContext;
