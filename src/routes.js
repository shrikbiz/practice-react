import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import DebounceExample from "./Components/Debounce";
import SearchDebounce from "./Components/Search-Debounce";
import PhoneInput from "./Components/PhoneInput";
import Counter from "./Components/Counter";
import EmploymentForms from "./Components/EmploymentForms";
import Countries from "./Components/Countries";

export const NavigationPaths = [
    {
        path: "/",
        name: "Home",
        component: <Home />,
    },
    {
        path: "/debounce",
        name: "Debounce",
        component: <DebounceExample />,
    },
    {
        path: "/seachAndDebounce",
        name: "Seach and debounce",
        component: <SearchDebounce />,
    },
    {
        path: "/phoneInput",
        name: "Phone input",
        component: <PhoneInput />,
    },
    {
        path: "/counter",
        name: "Counter",
        component: <Counter />,
    },
    {
        path: "/employmentForms",
        name: "Employment forms",
        component: <EmploymentForms />,
    },
    {
        path: "/countries",
        name: "Countries",
        component: <Countries />,
    },
    {
        path: "/employmentForms",
        name: "Employment forms",
        component: <EmploymentForms />,
    },
];

export default function AppRouter() {
    return (
        <div className="Content">
            <Routes>
                {NavigationPaths.map(({ path, component }, key) => (
                    <Route path={path} element={component} key={key} />
                ))}
            </Routes>
        </div>
    );
}
