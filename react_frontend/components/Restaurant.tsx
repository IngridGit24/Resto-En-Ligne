import React, { useEffect, useState } from "react";
import { Container, ListGroup, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../src/api/axios";

const RestaurantComponent = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/restaurants")
      .then(response => setRestaurants(response.data))
      .catch(error => {
        console.error("Error fetching restaurants:", error);
        setError("Failed to load restaurants. Please try again later.");
      });
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="my-4">Restaurant List</h2>
      <Button variant="success" className="mb-3" onClick={() => navigate("/add-restaurant")}>
        Add New Restaurant
      </Button>

      {error && <Alert variant="danger">{error}</Alert>}

      {restaurants.length > 0 ? (
        <ListGroup>
          {restaurants.map(restaurant => (
            <ListGroup.Item key={restaurant.id}>
              <h3>{restaurant.name}</h3>
              <p>{restaurant.address}, {restaurant.city}</p>
              <p>Phone: {restaurant.phone}</p>
              <Button onClick={() => navigate("/menus")}>View Menus</Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        !error && <p className="text-muted">No restaurants available.</p>
      )}
    </Container>
  );
};

export default RestaurantComponent;
