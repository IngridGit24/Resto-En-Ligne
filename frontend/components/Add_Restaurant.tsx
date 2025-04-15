import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../src/api/axios";

const AddRestaurantComponent = () => {
  const [restaurantData, setRestaurantData] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
    email: "",
    description: "",
    opening_hours: "",
    images: "",
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRestaurantData({ ...restaurantData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await API.post("/restaurants", restaurantData);
      if (response.status === 201 || response.status === 200) {
        navigate("/restaurants");
      } else {
        setError("Unexpected response. Please try again.");
      }
    } catch (error: any) {
      console.error("API Error:", error.response?.data || error.message);
      if (error.response?.status === 419) {
        setError("CSRF token mismatch! Try refreshing the page.");
      } else {
        setError("Failed to add restaurant. Please try again.");
      }
    }
  };

  return (
    <Container className="mt-4">
      <h2>Add New Restaurant</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="restaurantName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={restaurantData.name} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="restaurantAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" name="address" value={restaurantData.address} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="restaurantCity">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" name="city" value={restaurantData.city} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="restaurantPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="text" name="phone" value={restaurantData.phone} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="restaurantEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={restaurantData.email} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="restaurantDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" name="description" value={restaurantData.description} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="restaurantOpeningHours">
          <Form.Label>Opening Hours</Form.Label>
          <Form.Control type="text" name="opening_hours" value={restaurantData.opening_hours} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="restaurantImages">
          <Form.Label>Image URL</Form.Label>
          <Form.Control type="text" name="images" value={restaurantData.images} onChange={handleChange} />
        </Form.Group>
        <Button variant="success" type="submit" className="mt-3">Add Restaurant</Button>
      </Form>
    </Container>
  );
};

export default AddRestaurantComponent;