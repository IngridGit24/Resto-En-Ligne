import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            navigate("/login");
        } else {
            setUser(JSON.parse(storedUser));
        }
    }, [navigate]);

    return (
        <div className="container mt-5 text-center">
            {user ? (
                <>
                    <h2>Welcome, {user.name} 👋</h2>
                    <p>Email: {user.email}</p>
                </>
            ) : (
                <h2>Redirecting to Login...</h2>
            )}
        </div>
    );
};

export default Dashboard;
