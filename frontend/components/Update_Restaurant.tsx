import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Form,
  Button,
  Alert,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";
import API from "../src/api/axios";

const UpdateRestaurantComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
    email: "",
    description: "",
    opening_hours: "",
    images: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    API.get(`/restaurants/${id}`)
      .then((response) => setRestaurant(response.data))
      .catch(() => setError("Failed to load restaurant."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.put(`/restaurants/${id}`, restaurant);
      setSuccess(true);
      setTimeout(() => navigate("/restaurants"), 1000);
    } catch (err) {
      setError("Update failed.");
    }
  };

  if (loading)
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return (
    <Container className="mt-3">
      <h2>Update Restaurant</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && (
        <Alert variant="success">Restaurant updated successfully!</Alert>
      )}

      <Row>
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="restaurantName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={restaurant.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="restaurantAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={restaurant.address}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="restaurantCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={restaurant.city}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="restaurantPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={restaurant.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="restaurantEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={restaurant.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="restaurantDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={restaurant.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="restaurantHours">
              <Form.Label>Opening Hours</Form.Label>
              <Form.Control
                as="textarea"
                name="opening_hours"
                value={restaurant.opening_hours}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="restaurantImages">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="images"
                value={restaurant.images}
                onChange={handleChange}
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-3">
              Update Restaurant
            </Button>
          </Form>
        </Col>
        <Col md={6} className="pt-5 mt-5">
          <img
            src={
              restaurant.images ||
              "https://cdn.pixabay.com/photo/2016/11/29/05/08/architecture-1868667_1280.jpg"
            }
            alt="Restaurant Preview"
            className="img-fluid rounded"
            style={{ maxWidth: "50%" }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateRestaurantComponent;
