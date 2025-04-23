import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRequest, putRequest } from "../Core/ApiProvider";

const UpdateMenuComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [menu, setMenu] = useState({
        name: "",
        restaurant_id: "",
        image: "",
        category: "",
        ingredients: "",
        description: "",
        price: "",
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        getRequest(`/menus/${id}`)
            .then(response => setMenu(response))
            .catch(() => setError("Failed to load menu."))
            .finally(() => setLoading(false));
    }, [id]);

    const handleChange = (e) => {
        setMenu({ ...menu, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await putRequest(`/menus/${id}`, menu);
            setSuccess(true);
            setTimeout(() => navigate("/menus"), 1000);
        } catch (err) {
            setError("Update failed.");
        }
    };

    if (loading) return <div className="spinner-border d-block mx-auto mt-5"></div>;

    return (
        <div className="container mt-3">
            <h2 className="mb-4 text-center">Update Menu</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">Menu updated successfully!</div>}

            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" name="name" className="form-control"
                                value={menu.name} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Restaurant ID</label>
                            <input type="text" name="restaurant_id" className="form-control"
                                value={menu.restaurant_id} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Image URL</label>
                            <input type="text" name="image" className="form-control"
                                value={menu.image} onChange={handleChange} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Category</label>
                            <input type="text" name="category" className="form-control"
                                value={menu.category} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Ingredients</label>
                            <textarea name="ingredients" className="form-control"
                                value={menu.ingredients} onChange={handleChange}></textarea>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea name="description" className="form-control"
                                value={menu.description} onChange={handleChange}></textarea>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Price</label>
                            <input type="number" name="price" className="form-control"
                                value={menu.price} onChange={handleChange} required />
                        </div>

                        <div className="d-flex gap-3 mt-3">
                            <button type="submit" className="btn btn-primary">Update Menu</button>
                            <button type="button" className="btn btn-warning" onClick={() => navigate(-1)}>Go Back</button>
                        </div>
                    </form>
                </div>

                <div className="col-md-6 d-flex align-items-center justify-content-center">
                    <img src={menu.image || "https://irp.cdn-website.com/deafcbd6/dms3rep/multi/1B3A8109+2-d26305a4.jpg"}
                        alt="Menu Preview" className="img-fluid rounded"
                        style={{ maxWidth: "50%", objectFit: "cover" }} />
                </div>
            </div>
        </div>
    );
};

export default UpdateMenuComponent;