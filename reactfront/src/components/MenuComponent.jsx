import React, { useEffect, useState } from "react";
import { Container, ListGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const MenuComponent = () => {
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/menus")
      .then(response => setMenus(response.data))
      .catch(error => {
        console.error("Error fetching menus:", error);
        setMenus([]); // Fallback
      });
  }, []);

  return (
    <Container>
      <h2 className="my-4">Menu List</h2>
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
    </Container>
  );
};

export default MenuComponent;
