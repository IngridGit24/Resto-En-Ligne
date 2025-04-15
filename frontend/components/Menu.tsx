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

interface Menu {
  id: number;
  name: string;
  restaurant_id: string;
  image: string;
  category: string;
  ingredients: string;
  description: string;
  price: number | string; // Allow both number and string types for price
  restaurant_name?: string; // Optionally include restaurant name for display
}

const MenuComponent: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [restaurants, setRestaurants] = useState<{ [key: string]: string }>({}); // Mapping for restaurant data
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState(false);
  const [menuToDelete, setMenuToDelete] = useState<Menu | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch menus first
    API.get("/menus")
      .then((response) => {
        setMenus(response.data);
        return response.data;
      })
      .then((menus) => {
        // Fetch restaurant information after menus
        const restaurantIds = [...new Set(menus.map((menu: Menu) => menu.restaurant_id))];
        API.get("/restaurants")
          .then((response) => {
            const restaurantMap: { [key: string]: string } = {};
            response.data.forEach((restaurant: { id: string; name: string }) => {
              if (restaurantIds.includes(restaurant.id)) {
                restaurantMap[restaurant.id] = restaurant.name;
              }
            });
            setRestaurants(restaurantMap);
          })
          .catch((err) => {
            console.error("Error fetching restaurants:", err);
          });
      })
      .catch((error) => {
        console.error("Error fetching menus:", error);
        setError("Failed to load menus. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  const confirmDelete = (menu: Menu) => {
    setMenuToDelete(menu);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!menuToDelete) return;
    try {
      await API.delete(`/menus/${menuToDelete.id}`);
      setMenus((prev) => prev.filter((m) => m.id !== menuToDelete.id));
      setShowModal(false);
      setMenuToDelete(null);
    } catch (err) {
      console.error("Failed to delete menu:", err);
      setError("Could not delete menu.");
      setShowModal(false);
    }
  };

  // Function to safely format price
  const formatPrice = (price: number | string) => {
    const numericPrice = typeof price === "string" ? parseFloat(price) : price;
    return !isNaN(numericPrice) ? numericPrice.toFixed(2) : "N/A";
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center my-4">
        <h2>Menu List</h2>
        <Button variant="success" onClick={() => navigate("/add-menu")}>
          Add New Menu
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : menus.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Restaurant</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu, index) => (
              <tr key={menu.id}>
                <td>{index + 1}</td>
                <td>
                  {menu.image ? (
                    <Image
                      src={menu.image}
                      alt={menu.name}
                      thumbnail
                      style={{ width: "60px", height: "60px", objectFit: "cover" }}
                    />
                  ) : (
                    <span className="text-muted">No Image</span>
                  )}
                </td>
                <td>{menu.name}</td>
                <td>{menu.category}</td>
                <td>${formatPrice(menu.price)}</td>
                <td>{restaurants[menu.restaurant_id] || "Unknown Restaurant"}</td>
                <td>
                  <div className="d-flex gap-2 flex-wrap">
                    {/* <Button
                      size="sm"
                      variant="primary"
                      onClick={() =>
                        navigate(`/menus/${menu.id}`, { state: { menuId: menu.id } })
                      }
                    >
                      View Details
                    </Button> */}
                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() => navigate(`/update-menu/${menu.id}`)}
                    >
                      Update
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => confirmDelete(menu)}
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
        <p className="text-muted">No menus available.</p>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Menu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <strong>{menuToDelete?.name}</strong>?
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

export default MenuComponent;
