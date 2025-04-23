import { Routes, Route, Navigate } from "react-router-dom";

// Components
import Home from "./Components/Home";
import NavbarComponent from "./Components/Navbar";
// import FooterComponent from "./Components/Footer"; 

// Restaurant Pages
import RestaurantComponent from "./Resto/Restaurant";
import AddRestaurantComponent from "./Resto/AddRestaurant";
import UpdateRestaurantComponent from "./Resto/UpdateRestaurant";

// Menu Pages
import MenuComponent from "./Menu/Menu";
import AddMenuComponent from "./Menu/AddMenu";
import UpdateMenuComponent from "./Menu/UpdateMenu";

// Auth Pages
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Dashboard from "./Auth/Dashboard";
import PrivateRoute from "./Auth/PrivateRoute";
import NotFound from "./Auth/NotFound"; 

const RouterComponent = () => {
    const token = localStorage.getItem("token"); 

    return (
        <>
            <NavbarComponent /> 
            <div className="main-content pb-5">
                <Routes>
                    <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                    <Route path="/register" element={token ? <Navigate to="/dashboard" /> : <Register />} />
                    <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <Login />} />

                    {/* Private Dashboard Route */}
                    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

                    {/* Private Restaurant Routes */}
                    <Route path="/restaurants" element={<PrivateRoute><RestaurantComponent /></PrivateRoute>} />
                    <Route path="/add-restaurant" element={<PrivateRoute><AddRestaurantComponent /></PrivateRoute>} />
                    <Route path="/update-restaurant/:id" element={<PrivateRoute><UpdateRestaurantComponent /></PrivateRoute>} />

                    {/* Private Menu Routes */}
                    <Route path="/menus" element={<PrivateRoute><MenuComponent /></PrivateRoute>} />
                    <Route path="/add-menu" element={<PrivateRoute><AddMenuComponent /></PrivateRoute>} />
                    <Route path="/update-menu/:id" element={<PrivateRoute><UpdateMenuComponent /></PrivateRoute>} />

                    {/* Catch-all Route for Undefined Paths */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
            {/* <FooterComponent /> */}
        </>
    );
};

export default RouterComponent;