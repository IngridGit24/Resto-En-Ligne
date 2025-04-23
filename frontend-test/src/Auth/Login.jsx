import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest, getRequest } from "../Core/ApiProvider";
import { toast } from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (loading) return;
    
        setLoading(true);
    
        try {
            const response = await postRequest("/login", { email, password });
    
            if (response?.token) {
                localStorage.setItem("token", response.token);
    
                // Fetch user info
                let user = response.user;
                if (!user) {
                    try {
                        user = await getRequest("/me");
                    } catch (error) {
                        toast.error("Failed to fetch user information.");
                        return;
                    }
                }
    
                localStorage.setItem("user", JSON.stringify(user));
                toast.success(`Welcome back, ${user.name}!`);
                
                // Navigate directly to the dashboard
                navigate("/dashboard");
                // Trigger an event to inform other parts of the app (optional)
                window.dispatchEvent(new Event("storage"));
            } else {
                toast.error("Invalid credentials. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error.response?.data || error.message);
    
            const errorMsg = error.response?.data?.error ||
                             error.response?.data?.message ||
                             "Login failed. Check your credentials.";
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="container mt-5 text-center">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input 
                    type="email" 
                    className="form-control my-2" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    disabled={loading}
                    id="email" 
                    name="email" 
                />
                <input 
                    type="password" 
                    className="form-control my-2" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    disabled={loading} 
                    id="password" 
                    name="password" 
                />
                <button className="btn btn-primary" disabled={loading}>
                    {loading ? "Logging in..." : "Login"} 
                </button>
            </form>
            <p className="mt-3">
                Don't have an account? <a href="/register">Register now</a>
            </p>
        </div>
    );
};

export default Login;
