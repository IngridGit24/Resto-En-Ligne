import { Routes, Route } from "react-router-dom";

// Componnents Pages
import Home from "./Components/Home";
import Contacts from "./Components/Contacts";
import NavbarComponent from "./Components/Navbar";
import FooterComponent from "./Components/Footer"; 

const RouterComponent = () => {
    return (
        <>
            <NavbarComponent />
            <div className="main-content pb-5">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/contacts" element={<Contacts />} />
                </Routes>
            </div>
            <FooterComponent />
        </>
    );
};

export default RouterComponent;
