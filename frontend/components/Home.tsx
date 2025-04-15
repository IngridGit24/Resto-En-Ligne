import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomeComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    setUsername(storedUser);
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1 className="text-center">Welcome {username ? `back, ${username}` : "to Our Website"}</h1>
          <p className="lead text-center">
            Discover the best restaurants and their delicious menus!
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col md={6} className="text-center">
          <h2>Contact Us</h2>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Contact Us
          </Button>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Contact Us</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Send us your inquiries, and we will get back to you soon!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => navigate("/restaurants")}>
            View Restaurants
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default HomeComponent;
