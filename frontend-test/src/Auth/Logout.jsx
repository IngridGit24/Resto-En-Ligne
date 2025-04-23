import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.clear();
        navigate("/login");
    }, [navigate]);

    return (
        <div className="container mt-5 text-center">
            <h2>Logging out...</h2>
        </div>
    );
};

export default Logout;
