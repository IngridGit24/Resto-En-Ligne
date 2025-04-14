import React, { useEffect, useState } from "react";
import { Container, ListGroup, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../src/api/axios";

const MenuComponent = () => {
  const [menus, setMenus] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/menus")
      .then(response => setMenus(response.data))
      .catch(error => {
        console.error("Error fetching menus:", error);
        setError("Failed to load menus. Please try again later.");
      });
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="my-4">Menu List</h2>
      <Button variant="success" className="mb-3" onClick={() => navigate("/add-menu")}>
        Add New Menu
      </Button>

      {error && <Alert variant="danger">{error}</Alert>}

      {menus.length > 0 ? (
        <ListGroup>
          {menus.map(menu => (
            <ListGroup.Item key={menu.id}>
              <h3>{menu.name}</h3>
              <p>{menu.description}</p>
              <p>Price: ${menu.price}</p>
              <Button onClick={() => navigate("/restaurants")}>View Restaurants</Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        !error && <p className="text-muted">No menus available.</p>
      )}
    </Container>
  );
};

export default MenuComponent;
