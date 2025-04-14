import { Container, Row, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const FooterComponent = () => {
  return (
    <footer className="bg-dark text-white text-center py-5 mt-5 fixed-bottom">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>Providing quality restaurant listings and menus.</p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/" className="text-white">Home</Nav.Link>
              <Nav.Link as={Link} to="/restaurants" className="text-white">Restaurants</Nav.Link>
              <Nav.Link as={Link} to="/menus" className="text-white">Menus</Nav.Link>
              <Nav.Link as={Link} to="/contact" className="text-white">Contact</Nav.Link>
            </Nav>
          </Col>
          <Col md={4}>
            <h5>Follow Us</h5>
            <a href="https://facebook.com" className="text-white me-2" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" className="text-white me-2" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" className="text-white me-2" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterComponent;
