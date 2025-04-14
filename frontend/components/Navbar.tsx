import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="fixed-top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">Resto-En-Ligne</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/restaurants">Restaurants</Nav.Link>
            <Nav.Link as={Link} to="/menus">Menus</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
