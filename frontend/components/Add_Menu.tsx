import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../src/api/axios";

const AddMenuComponent = () => {
  const [menuData, setMenuData] = useState({
    name: "",
    restaurant_id: "",
    image: "",
    category: "",
    ingredients: "",
    description: "",
    price: "",
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMenuData({ ...menuData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await API.post("/menus", menuData);
      if (response.status === 201 || response.status === 200) {
        navigate("/menus");
      } else {
        setError("Unexpected response. Please try again.");
      }
    } catch (error: any) {
      console.error("API Error:", error.response?.data || error.message);
      if (error.response?.status === 419) {
        setError("CSRF token mismatch! Try refreshing the page.");
      } else {
        setError("Failed to add menu. Please try again.");
      }
    }
  };

  return (
    <Container className="mt-4">
      <h2>Add New Menu</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="menuName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={menuData.name} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="menuRestaurant">
          <Form.Label>Restaurant ID</Form.Label>
          <Form.Control type="text" name="restaurant_id" value={menuData.restaurant_id} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="menuImage">
          <Form.Label>Image URL</Form.Label>
          <Form.Control type="text" name="image" value={menuData.image} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="menuCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" name="category" value={menuData.category} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="menuIngredients">
          <Form.Label>Ingredients</Form.Label>
          <Form.Control as="textarea" name="ingredients" value={menuData.ingredients} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="menuDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" name="description" value={menuData.description} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="menuPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" name="price" value={menuData.price} onChange={handleChange} required />
        </Form.Group>
        <Button variant="success" type="submit" className="mt-3">Add Menu</Button>
      </Form>
    </Container>
  );
};

export default AddMenuComponent;
