import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRequest, deleteRequest } from "../Core/ApiProvider"; 

const MenuComponent = () => {
    const [menus, setMenus] = useState([]);
    const [restaurants, setRestaurants] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [menuToDelete, setMenuToDelete] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getRequest("/menus")
            .then(menus => {
                setMenus(menus);
                const restaurantIds = [...new Set(menus.map(menu => menu.restaurant_id))];
                return getRequest("/restaurants");
            })
            .then(restaurants => {
                const restaurantMap = {};
                restaurants.forEach(restaurant => {
                    restaurantMap[restaurant.id] = restaurant.name;
                });
                setRestaurants(restaurantMap);
            })
            .catch(error => {
                console.error("Error fetching menus:", error);
                setError("Failed to load menus. Please try again later.");
            })
            .finally(() => setLoading(false));
    }, []);

    const confirmDelete = (menu) => {
        setMenuToDelete(menu);
        setShowModal(true);
    };

    const handleDelete = async () => {
        if (!menuToDelete) return;
        try {
            await deleteRequest(`/menus/${menuToDelete.id}`);
            setMenus(prev => prev.filter(m => m.id !== menuToDelete.id));
            setShowModal(false);
            setMenuToDelete(null);
        } catch (error) {
            console.error("Failed to delete menu:", error);
            setError("Could not delete menu.");
            setShowModal(false);
        }
    };

    const formatPrice = (price) => {
        return !isNaN(parseFloat(price)) ? parseFloat(price).toFixed(2) : "N/A";
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center my-4">
                <h2>Menu List</h2>
                <button className="btn btn-success" onClick={() => navigate("/add-menu")}>Add New Menu</button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border"></div>
                </div>
            ) : menus.length > 0 ? (
                <table className="table table-striped table-bordered">
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
                                        <img src={menu.image} alt={menu.name} className="img-thumbnail" 
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
                                        <button className="btn btn-warning btn-sm" onClick={() => navigate(`/update-menu/${menu.id}`)}>Update</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => confirmDelete(menu)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-muted">No menus available.</p>
            )}

            {/* Delete Confirmation Modal */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Delete Menu</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete <strong>{menuToDelete?.name}</strong>?
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

export default MenuComponent;