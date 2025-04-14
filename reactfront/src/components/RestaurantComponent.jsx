import React, { useEffect, useState } from "react";
import { Container, ListGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const RestaurantComponent = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/restaurants")
      .then(response => setRestaurants(response.data))
      .catch(error => {
        console.error("Error fetching restaurants:", error);
        setRestaurants([]); // Fallback
      });
  }, []);

  return (
    <Container>
      <h2 className="my-4">Restaurant List</h2>
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
    </Container>
  );
};

export default RestaurantComponent;
