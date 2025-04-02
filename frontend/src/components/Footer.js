import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Css/Footer.css";
const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>
              We are a company dedicated to providing the best service possible.
            </p>
          </div>
          <div className="col-md-4">
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#home" className="text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#services" className="text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <a href="#facebook" className="text-white me-2">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#twitter" className="text-white me-2">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#instagram" className="text-white me-2">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className="mt-3">
          <p>
            &copy; {new Date().getFullYear()} Your Company Name. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
