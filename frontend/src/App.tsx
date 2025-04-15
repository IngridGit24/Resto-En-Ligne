import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavbarComponent from "../components/Navbar";
import HomeComponent from "../components/Home";
import FooterComponent from "../components/Footer";
import MenuComponent from "../components/Menu";
import RestaurantComponent from "../components/Restaurant";
import AddMenuComponent from "../components/Add_Menu";
import AddRestaurantComponent from "../components/Add_Restaurant";

import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <NavbarComponent />
        <main className="main-container">
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/restaurants" element={<RestaurantComponent />} />
            <Route path="/menus" element={<MenuComponent />} />
            <Route path="/add-menu" element={<AddMenuComponent />} />
            <Route path="/add-restaurant" element={<AddRestaurantComponent />} />
            <Route path="/contact" element={<h2>Contact Page</h2>} />
          </Routes>
        </main>
        <FooterComponent />
      </div>
    </BrowserRouter>
  );
};

export default App;
