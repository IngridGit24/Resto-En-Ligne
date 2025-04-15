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

const UpdateMenuComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [menu, setMenu] = useState({
    name: "",
    restaurant_id: "",
    image: "",
    category: "",
    ingredients: "",
    description: "",
    price: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    API.get(`/menus/${id}`)
      .then((response) => setMenu(response.data))
      .catch(() => setError("Failed to load menu."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMenu({ ...menu, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.put(`/menus/${id}`, menu);
      setSuccess(true);
      setTimeout(() => navigate("/menus"), 1000);
    } catch (err) {
      setError("Update failed.");
    }
  };

  if (loading)
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return (
    <Container className="mt-3">
      <h2>Update Menu</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Menu updated successfully!</Alert>}

      <Row>
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="menuName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={menu.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="menuRestaurant">
              <Form.Label>Restaurant ID</Form.Label>
              <Form.Control
                type="text"
                name="restaurant_id"
                value={menu.restaurant_id}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="menuImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={menu.image}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="menuCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={menu.category}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="menuIngredients">
              <Form.Label>Ingredients</Form.Label>
              <Form.Control
                as="textarea"
                name="ingredients"
                value={menu.ingredients}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="menuDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={menu.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="menuPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={menu.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Update Menu
            </Button>
          </Form>
        </Col>
        <Col md={6} className="pt-5 mt-5">
          <img
            src={
              menu.image ||
              "https://irp.cdn-website.com/deafcbd6/dms3rep/multi/1B3A8109+2-d26305a4.jpg"
            }
            alt="Menu Preview"
            className="img-fluid rounded"
            style={{ maxWidth: "50%" }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateMenuComponent;
