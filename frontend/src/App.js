import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Body from "./components/Body";

const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="flex-grow-1 d-flex">
        <Body />
      </div>
      <Footer />
    </div>
  );
};

export default App;
