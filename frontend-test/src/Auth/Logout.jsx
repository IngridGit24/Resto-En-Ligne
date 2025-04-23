import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../Core/ApiProvider";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logoutUser = async () => {
            try {
                await postRequest("/logout");
                localStorage.clear();
                navigate("/login");
            } catch (error) {
                console.error("Logout failed:", error.response?.data || error.message);
            }
        };

        logoutUser();
    }, [navigate]);

    return (
        <div className="container mt-5 text-center">
            <h2>Logging out...</h2>
        </div>
    );
};

export default Logout;
