import { Routes, Route } from "react-router-dom";

// Componnents Pages
import Home from "./Components/Home";
import Contacts from "./Components/Contacts";
import NavbarComponent from "./Components/Navbar";
import FooterComponent from "./Components/Footer"; 

// Auth Pages 
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Dashboard from "./Auth/Dashboard";
import Logout from "./Auth/Logout";
import PrivateRoute from "./Auth/PrivateRoute";
import NotFound from "./Auth/NotFound";

const RouterComponent = () => {
    return (
        <>
            <NavbarComponent />
            <div className="main-content pb-5">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/contacts" element={<Contacts />} />
                   

                    {/* Protected Routes (Authenticated Users Only) */}
                    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="/logout" element={<Logout />} />

                    {/* Catch-All 404 Page */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
            <FooterComponent />
        </>
    );
};

export default RouterComponent;
