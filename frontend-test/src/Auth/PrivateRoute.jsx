import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        // Redirect to login page if no token found
        return <Navigate to="/login" />;
    }

    // If token exists, allow access to the protected route
    return children;
};

export default PrivateRoute;
