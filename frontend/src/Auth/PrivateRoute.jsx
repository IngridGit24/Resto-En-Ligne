import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const token = localStorage.getItem("token");

    // Ensure valid authentication before granting access
    return token && token !== "undefined" ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
