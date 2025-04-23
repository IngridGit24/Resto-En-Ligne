import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { postRequest } from "../Core/ApiProvider";
import { FaUserCircle } from "react-icons/fa";

const NavbarComponent = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [showProfile, setShowProfile] = useState(false);

    // Check if user is logged in and retrieve stored user data
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No valid token found, redirecting to login...");
            localStorage.clear();
            setUser(null);
            navigate("/login");
            return;
        }

        try {
            await postRequest("/logout", {}, { headers: { Authorization: `Bearer ${token}` } });

            localStorage.clear();
            setUser(null);
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error.response?.data || error.message);
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Resto-En-Ligne</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/restaurants">Restaurants</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/menus">Menus</Link></li>
                        </ul>

                        <ul className="navbar-nav">
                            {user ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="btn btn-info me-3" to="/dashboard">Dashboard</Link>
                                    </li>
                                    <li className="nav-item">
                                        <button className="btn btn-success me-3" onClick={() => setShowProfile(true)}>
                                            <FaUserCircle className="me-1" /> Profile
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item"><Link className="btn btn-primary me-3" to="/login">Login</Link></li>
                                    <li className="nav-item"><Link className="btn btn-success" to="/register">Register</Link></li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Profile Modal */}
            {showProfile && user && (
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">User Profile</h5>
                                <button type="button" className="btn-close" onClick={() => setShowProfile(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Name:</strong> {user.name}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Status:</strong> Logged in</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowProfile(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default NavbarComponent;
