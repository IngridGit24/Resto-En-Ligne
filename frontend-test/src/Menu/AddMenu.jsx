import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../Core/ApiProvider"; 

const AddMenuComponent = () => {
    const [menuData, setMenuData] = useState({
        name: "",
        restaurant_id: "",
        image: "",
        category: "",
        ingredients: "",
        description: "",
        price: "",
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setMenuData({ ...menuData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await postRequest("/menus", menuData);
            if (response) {
                navigate("/menus");
            } else {
                setError("Unexpected response. Please try again.");
            }
        } catch (error) {
            console.error("API Error:", error.response?.data || error.message);
            setError("Failed to add menu. Please try again.");
        }
    };

    return (
        <div className="container mt-3">
            <h2 className="mb-4 text-center">Add New Menu</h2>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" name="name" className="form-control"
                                value={menuData.name} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Restaurant ID</label>
                            <input type="text" name="restaurant_id" className="form-control"
                                value={menuData.restaurant_id} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Image URL</label>
                            <input type="text" name="image" className="form-control"
                                value={menuData.image} onChange={handleChange} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Category</label>
                            <input type="text" name="category" className="form-control"
                                value={menuData.category} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Ingredients</label>
                            <textarea name="ingredients" className="form-control"
                                value={menuData.ingredients} onChange={handleChange}></textarea>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea name="description" className="form-control"
                                value={menuData.description} onChange={handleChange}></textarea>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Price</label>
                            <input type="number" name="price" className="form-control"
                                value={menuData.price} onChange={handleChange} required />
                        </div>

                        <div className="d-flex gap-3 mt-3">
                            <button type="submit" className="btn btn-success">Add Menu</button>
                            <button type="button" className="btn btn-warning" onClick={() => navigate(-1)}>Go Back</button>
                        </div>
                    </form>
                </div>

                <div className="col-md-6 d-flex align-items-center justify-content-center">
                    <img src={menuData.image || "https://irp.cdn-website.com/deafcbd6/dms3rep/multi/1B3A8109+2-d26305a4.jpg"}
                        alt="Menu Image" className="img-fluid rounded"
                        style={{ maxWidth: "50%", objectFit: "cover" }} />
                </div>
            </div>
        </div>
    );
};

export default AddMenuComponent;