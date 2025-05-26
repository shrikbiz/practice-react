import "./App.css";
import { useState } from "react";
import MyContext from "./Components/context";
import TopNav from "./Components/Nav";
import AppRouter from "./routes";

export default function App() {
    const [userName, setUserName] = useState("shrikbiz");

    return (
        <MyContext.Provider value={{ userName, setUserName }}>
            <TopNav />
            <AppRouter />
        </MyContext.Provider>
    );
}
