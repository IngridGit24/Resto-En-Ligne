import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRequest, deleteRequest } from "../Core/ApiProvider"; // ✅ Import API provider

const RestaurantComponent = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [restaurantToDelete, setRestaurantToDelete] = useState(null);
    const navigate = useNavigate();

    // Fetch Restaurants from API
    useEffect(() => {
        getRequest("/restaurants")
            .then(response => setRestaurants(response))
            .catch(error => {
                console.error("Error fetching restaurants:", error);
                setError("Failed to load restaurants. Please try again later.");
            })
            .finally(() => setLoading(false));
    }, []);

    // Confirm Delete Modal
    const confirmDelete = (restaurant) => {
        setRestaurantToDelete(restaurant);
        setShowModal(true);
    };

    // Handle Delete API Call
    const handleDelete = async () => {
        if (!restaurantToDelete) return;
        try {
            await deleteRequest(`/restaurants/${restaurantToDelete.id}`);
            setRestaurants(prev => prev.filter(r => r.id !== restaurantToDelete.id));
            setShowModal(false);
            setRestaurantToDelete(null);
        } catch (error) {
            console.error("Failed to delete restaurant:", error);
            setError("Could not delete restaurant.");
            setShowModal(false);
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center my-4">
                <h2>Restaurant List</h2>
                <button className="btn btn-success" onClick={() => navigate("/add-restaurant")}>
                    Add New Restaurant
                </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border"></div>
                </div>
            ) : restaurants.length > 0 ? (
                <table className="table table-striped table-bordered">
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
                                        <img 
                                            src={restaurant.images} 
                                            alt={restaurant.name} 
                                            className="img-thumbnail" 
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
                                <td className="text-truncate" style={{ maxWidth: "200px" }}>
                                    {restaurant.description}
                                </td>
                                <td>{restaurant.opening_hours}</td>
                                <td>
                                    <div className="d-flex gap-2 flex-wrap">
                                        <button 
                                            className="btn btn-primary btn-sm"
                                            onClick={() => navigate("/menus", { state: { restaurantId: restaurant.id } })}
                                        >
                                            View Menus
                                        </button>
                                        <button 
                                            className="btn btn-warning btn-sm"
                                            onClick={() => navigate(`/update-restaurant/${restaurant.id}`)}
                                        >
                                            Update
                                        </button>
                                        <button 
                                            className="btn btn-danger btn-sm"
                                            onClick={() => confirmDelete(restaurant)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-muted">No restaurants available.</p>
            )}

            {/* Delete Confirmation Modal */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Delete Restaurant</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete <strong>{restaurantToDelete?.name}</strong>?
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button className="btn btn-danger" onClick={handleDelete}>Confirm Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RestaurantComponent;