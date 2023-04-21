import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { LoginComponent } from "./components/pages/Login";

const ValidateAuth = ({ children } : any) => {
    const { user } = useContext( UserContext );
    return user ? children : <LoginComponent />
}

export const Navigation = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route 
                    path = "/"
                    element = {
                        <ValidateAuth>
                            <Home />
                        </ValidateAuth>
                    } 
                />
            </Routes>
        </BrowserRouter>
    )
}
