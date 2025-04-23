import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRequest, putRequest } from "../Core/ApiProvider"; // ✅ Import API provider

const UpdateRestaurantComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [restaurant, setRestaurant] = useState({
        name: "",
        address: "",
        city: "",
        phone: "",
        email: "",
        description: "",
        opening_hours: "",
        images: "",
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Fetch restaurant data from API
    useEffect(() => {
        getRequest(`/restaurants/${id}`)
            .then(response => setRestaurant(response))
            .catch(() => setError("Failed to load restaurant."))
            .finally(() => setLoading(false));
    }, [id]);

    const handleChange = (e) => {
        setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await putRequest(`/restaurants/${id}`, restaurant);
            setSuccess(true);
            setTimeout(() => navigate("/restaurants"), 1000);
        } catch (error) {
            setError("Update failed.");
        }
    };

    if (loading) return <div className="spinner-border d-block mx-auto mt-5"></div>;

    return (
        <div className="container mt-3">
            <h2>Update Restaurant</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">Restaurant updated successfully!</div>}

            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" name="name" className="form-control"
                                value={restaurant.name} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Address</label>
                            <input type="text" name="address" className="form-control"
                                value={restaurant.address} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">City</label>
                            <input type="text" name="city" className="form-control"
                                value={restaurant.city} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <input type="text" name="phone" className="form-control"
                                value={restaurant.phone} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" name="email" className="form-control"
                                value={restaurant.email} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea name="description" className="form-control"
                                value={restaurant.description} onChange={handleChange}></textarea>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Opening Hours</label>
                            <textarea name="opening_hours" className="form-control"
                                value={restaurant.opening_hours} onChange={handleChange}></textarea>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Image URL</label>
                            <input type="text" name="images" className="form-control"
                                value={restaurant.images} onChange={handleChange} />
                        </div>

                        <button type="submit" className="btn btn-primary mt-3">Update Restaurant</button>
                    </form>
                </div>

                {/* Image Preview */}
                <div className="col-md-6 d-flex align-items-center justify-content-center">
                    <img src={restaurant.images || "https://cdn.pixabay.com/photo/2016/11/29/05/08/architecture-1868667_1280.jpg"}
                        alt="Restaurant Preview" className="img-fluid rounded"
                        style={{ maxWidth: "50%" }} />
                </div>
            </div>
        </div>
    );
};

export default UpdateRestaurantComponent;