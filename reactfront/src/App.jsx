import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import MenuComponent from "./components/MenuComponent";
import RestaurantComponent from "./components/RestaurantComponent";

const App = () => {
  return (
    <div>
      Hello World
      <Footer />
    </div>
    // <Router>
    //   <div className="d-flex flex-column min-vh-100">
    //     <Navbar />
    //     <Container className="flex-grow-1 d-flex">
    //       <Routes>
    //         <Route path="/" element={<Home />} />
    //         <Route path="/restaurants" element={<RestaurantComponent />} />
    //         <Route path="/menus" element={<MenuComponent />} />
    //       </Routes>
    //     </Container>
    //     <Footer />
    //   </div>
    // </Router>
  );
};

export default App;
