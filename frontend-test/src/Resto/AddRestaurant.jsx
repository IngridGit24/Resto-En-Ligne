import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../Core/ApiProvider"; // ✅ Import centralized API logic

const AddRestaurantComponent = () => {
    const [restaurantData, setRestaurantData] = useState({
        name: "",
        address: "",
        city: "",
        phone: "",
        email: "",
        description: "",
        opening_hours: "",
        images: "",
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setRestaurantData({ ...restaurantData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await postRequest("/restaurants", restaurantData);
            if (response) {
                navigate("/restaurants");
            } else {
                setError("Unexpected response. Please try again.");
            }
        } catch (error) {
            console.error("API Error:", error.response?.data || error.message);
            if (error.response?.status === 419) {
                setError("CSRF token mismatch! Try refreshing the page.");
            } else {
                setError("Failed to add restaurant. Please try again.");
            }
        }
    };

    return (
        <div className="container mt-3 pb-5 pt-3">
            <h2 className="mb-5 text-center">Add New Restaurant</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            
            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" name="name" className="form-control"
                                value={restaurantData.name} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Address</label>
                            <input type="text" name="address" className="form-control"
                                value={restaurantData.address} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">City</label>
                            <input type="text" name="city" className="form-control"
                                value={restaurantData.city} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <input type="text" name="phone" className="form-control"
                                value={restaurantData.phone} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" name="email" className="form-control"
                                value={restaurantData.email} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea name="description" className="form-control"
                                value={restaurantData.description} onChange={handleChange}></textarea>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Opening Hours</label>
                            <input type="text" name="opening_hours" className="form-control"
                                value={restaurantData.opening_hours} onChange={handleChange} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Image URL</label>
                            <input type="text" name="images" className="form-control"
                                value={restaurantData.images} onChange={handleChange} />
                        </div>

                        <button type="submit" className="btn btn-success mt-3">Add Restaurant</button>
                        <button className="btn btn-warning mt-3 ms-2" onClick={() => navigate(-1)}> Go Back </button>
                    </form>
                </div>

                {/* Image Preview */}
                <div className="col-md-6 d-flex align-items-center justify-content-center">
                    <img src={restaurantData.images || "https://irp.cdn-website.com/deafcbd6/dms3rep/multi/1B3A8109+2-d26305a4.jpg"}
                        alt="Restaurant Preview" className="img-fluid rounded"
                        style={{ borderRadius: "8px", maxHeight: "350px", objectFit: "cover" }} />
                </div>
            </div>
        </div>
    );
};

export default AddRestaurantComponent;