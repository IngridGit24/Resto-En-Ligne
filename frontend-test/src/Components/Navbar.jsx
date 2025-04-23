import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { getRequest, postRequest } from "../Core/ApiProvider";

const NavbarComponent = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // This effect runs once on component mount to load the user from localStorage
    useEffect(() => {
        const fetchUser = async () => {
            const storedUser = localStorage.getItem("user");
            if (!storedUser) {
                setUser(null);
                return;
            }

            try {
                const parsedUser = JSON.parse(storedUser); // Safely parse JSON
                if (parsedUser?.id) {
                    const response = await getRequest(`/users/${parsedUser.id}`);
                    setUser(response);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Failed to fetch user:", error);
                localStorage.removeItem("user");
                setUser(null);
            }
        };

        fetchUser();

        // Listen for changes in localStorage to update user state when it changes
        const handleStorageChange = () => {
            const storedUser = localStorage.getItem("user");
            setUser(storedUser ? JSON.parse(storedUser) : null);
        };

        window.addEventListener("storage", handleStorageChange);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []); // Dependency array is empty, so this effect runs only once

    const handleLogout = async () => {
        try {
            await postRequest("/logout");
            localStorage.clear();  // Clear all localStorage data
            setUser(null);  // Clear the user state
            navigate("/login");  // Redirect to login page
        } catch (error) {
            console.error("Logout failed:", error.response?.data || error.message);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top py-3">
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold fs-2" to="/">Resto-En-Ligne</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link fs-4" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fs-4" to="/contacts">Contacts</Link>
                        </li>
                    </ul>

                    <ul className="navbar-nav ms-auto">
                        {user ? (
                            <>
                                <li className="nav-item">
                                    <Link className="btn btn-info me-3" to="/dashboard">Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-success me-3">
                                        <FaUserCircle className="me-1" /> {user.name}
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="btn btn-primary me-3" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn btn-success" to="/register">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavbarComponent;
