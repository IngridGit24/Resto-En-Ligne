import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { postRequest } from "../Core/ApiProvider";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../Auth/AuthContext";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = async () => {
    try {
      await postRequest("/logout");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    } finally {
      logout();
      navigate("/login");
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
                    <button
                      className="btn btn-success me-3"
                      onClick={() => setShowProfile(true)}
                      aria-haspopup="dialog"
                    >
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
      {showProfile && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          aria-modal="true"
          aria-labelledby="profileModalLabel"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="profileModalLabel">User Profile</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowProfile(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p><strong>Name:</strong> {user?.name}</p>
                <p><strong>Email:</strong> {user?.email}</p>
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
