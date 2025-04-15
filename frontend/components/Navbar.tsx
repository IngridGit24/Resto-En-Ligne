import { Navbar, Nav, Container, NavDropdown, Badge, Modal, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

const NavbarComponent = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("username");

    if (token && storedUser) {
      setUser({ name: storedUser });
    } else {
      setUser(null); // Ensure it's reset when no user data is found
    }
  };

  useEffect(() => {
    fetchUserData(); // Fetch user on load

    // Listen for localStorage changes
    window.addEventListener("storage", fetchUserData);

    return () => {
      window.removeEventListener("storage", fetchUserData);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
    navigate("/login");

    // Trigger storage event so navbar updates
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <>
      {/* Navbar */}
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

            <Nav>
              {user ? (
                <NavDropdown
                  title={
                    <>
                      <FaUserCircle className="me-1" />
                      {user.name}
                      <Badge bg="secondary" className="ms-2">User</Badge>
                    </>
                  }
                  id="user-nav-dropdown"
                  align="end"
                >
                  <NavDropdown.Item onClick={() => setShowProfile(true)}>Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Bootstrap Modal for Profile */}
      <Modal show={showProfile} onHide={() => setShowProfile(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>User Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Status:</strong> Logged in</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowProfile(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavbarComponent;
