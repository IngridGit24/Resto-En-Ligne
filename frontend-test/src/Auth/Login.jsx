import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        
        // Mock authentication (replace with API call)
        localStorage.setItem("token", "mockToken");
        localStorage.setItem("user", JSON.stringify({ name: "John Doe", email }));

        navigate("/dashboard");
    };

    return (
        <div className="container mt-5 text-center">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" className="form-control my-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" className="form-control my-2" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                <button className="btn btn-primary">Login</button>
            </form>
            <p className="mt-3">Don't have an account? <a href="/register">Register now</a></p>
        </div>
    );
};

export default Login;