import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-4">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>Providing quality restaurant listings and menus.</p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/restaurants" className="text-white">Restaurants</a></li>
              <li><a href="/menus" className="text-white">Menus</a></li>
              <li><a href="/contact" className="text-white">Contact</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Follow Us</h5>
            <a href="#facebook" className="text-white me-2"><i className="fab fa-facebook-f"></i></a>
            <a href="#twitter" className="text-white me-2"><i className="fab fa-twitter"></i></a>
            <a href="#instagram" className="text-white me-2"><i className="fab fa-instagram"></i></a>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <p>&copy; {new Date().getFullYear()} Resto-En-Ligne. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
