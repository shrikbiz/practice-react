// import { useLocation } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../DesignComponents/Button";
import { NavigationPaths } from "../../routes";
import { useMyContext } from "../context";

export default function TopNav() {
    const navigate = useNavigate();
    const location = useLocation();
    const { userName } = useMyContext();
    return (
        <div className="Nav">
            {NavigationPaths.map(({ name, path }, index) => (
                <Button
                    name={name === "Home" ? userName : name}
                    onClick={() => navigate(path)}
                    isSelected={location.pathname === path}
                    key={index}
                />
            ))}
        </div>
    );
}
