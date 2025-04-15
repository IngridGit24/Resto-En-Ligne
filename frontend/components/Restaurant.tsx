import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Alert,
  Spinner,
  Image,
  Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../src/api/axios";

interface Restaurant {
  id: number;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  description: string;
  opening_hours: string;
  images: string;
}

const RestaurantComponent: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState(false);
  const [restaurantToDelete, setRestaurantToDelete] = useState<Restaurant | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    API.get("/restaurants")
      .then((response) => setRestaurants(response.data))
      .catch((error) => {
        console.error("Error fetching restaurants:", error);
        setError("Failed to load restaurants. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  const confirmDelete = (restaurant: Restaurant) => {
    setRestaurantToDelete(restaurant);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!restaurantToDelete) return;
    try {
      await API.delete(`/restaurants/${restaurantToDelete.id}`);
      setRestaurants(prev => prev.filter(r => r.id !== restaurantToDelete.id));
      setShowModal(false);
      setRestaurantToDelete(null);
    } catch (err) {
      console.error("Failed to delete restaurant:", err);
      setError("Could not delete restaurant.");
      setShowModal(false);
    }
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center my-4">
        <h2>Restaurant List</h2>
        <Button variant="success" onClick={() => navigate("/add-restaurant")}>
          Add New Restaurant
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : restaurants.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Address</th>
              <th>City</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Description</th>
              <th>Opening Hours</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant, index) => (
              <tr key={restaurant.id}>
                <td>{index + 1}</td>
                <td>
                  {restaurant.images ? (
                    <Image
                      src={restaurant.images}
                      alt={restaurant.name}
                      thumbnail
                      style={{ width: "60px", height: "60px", objectFit: "cover" }}
                    />
                  ) : (
                    <span className="text-muted">No Image</span>
                  )}
                </td>
                <td>{restaurant.name}</td>
                <td>{restaurant.address}</td>
                <td>{restaurant.city}</td>
                <td>{restaurant.phone}</td>
                <td>{restaurant.email}</td>
                <td style={{ maxWidth: "200px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {restaurant.description}
                </td>
                <td>{restaurant.opening_hours}</td>
                <td>
                  <div className="d-flex gap-2 flex-wrap">
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => navigate("/menus", { state: { restaurantId: restaurant.id } })}
                    >
                      View Menus
                    </Button>
                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() => navigate(`/update-restaurant/${restaurant.id}`)}
                    >
                      Update
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => confirmDelete(restaurant)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-muted">No restaurants available.</p>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Restaurant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete{" "}
          <strong>{restaurantToDelete?.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default RestaurantComponent;
