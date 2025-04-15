import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavbarComponent from "../components/Navbar";
import FooterComponent from "../components/Footer";
import HomeComponent from "../components/Home";

import MenuComponent from "../components/Menu";
import RestaurantComponent from "../components/Restaurant";
import AddMenuComponent from "../components/Add_Menu";
import AddRestaurantComponent from "../components/Add_Restaurant";
import UpdateRestaurantComponent from "../components/Update_Restaurant";
import UpdateMenuComponent from "../components/Update_Menu";

import Login from "./views/Login";
import Register from "./views/Register";
// import Dashboard from "./views/Dashboard";

import PrivateRoute from "./api/private_route";

import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <NavbarComponent />
        <main className="main-container">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomeComponent />} />
            <Route path="/contact" element={<h2>Contact Page</h2>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            {/* <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} /> */}
            <Route path="/restaurants" element={<PrivateRoute><RestaurantComponent /></PrivateRoute>} />
            <Route path="/menus" element={<PrivateRoute><MenuComponent /></PrivateRoute>} />
            <Route path="/add-menu" element={<PrivateRoute><AddMenuComponent /></PrivateRoute>} />
            <Route path="/add-restaurant" element={<PrivateRoute><AddRestaurantComponent /></PrivateRoute>} />
            <Route path="/update-restaurant/:id" element={<PrivateRoute><UpdateRestaurantComponent /></PrivateRoute>} />
            <Route path="/update-menu/:id" element={<PrivateRoute><UpdateMenuComponent /></PrivateRoute>} />
          </Routes>
        </main>
        <FooterComponent />
      </div>
    </BrowserRouter>
  );
};

export default App;
