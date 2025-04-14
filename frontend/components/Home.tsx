import React from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomeComponent = () => {
  const [showModal, setShowModal] = React.useState(false);
  const navigate = useNavigate();

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center">Welcome to Our Website</h1>
          <p className="lead">
            Discover the best restaurants and their delicious menus!
          </p>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <h2>Contact Us</h2>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Contact Us
          </Button>

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
        </Col>
      </Row>
    </Container>
  );
};

export default HomeComponent;
