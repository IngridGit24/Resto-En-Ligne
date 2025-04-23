import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../Core/ApiProvider";
import { toast } from "react-toastify";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);

        try {
            const response = await postRequest("/register", formData);
            if (response?.token && response?.user) {
                localStorage.setItem("token", response.token);
                localStorage.setItem("user", JSON.stringify(response.user));
                toast.success(`Welcome, ${response.user.name}!`);
                navigate("/dashboard");
            } else {
                toast.error("Registration failed.");
            }
        } catch (error) {
            console.error("Registration error:", error.response?.data || error.message);
            const validationErrors = error.response?.data?.errors;
            if (validationErrors) {
                const firstError = Object.values(validationErrors)[0][0];
                toast.error(firstError);
            } else {
                toast.error("Registration failed. Try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5 text-center">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    name="name"
                    className="form-control my-2"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                />
                <input
                    type="email"
                    name="email"
                    className="form-control my-2"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                />
                <input
                    type="password"
                    name="password"
                    className="form-control my-2"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={loading}
                />
                <input
                    type="password"
                    name="password_confirmation"
                    className="form-control my-2"
                    placeholder="Confirm Password"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    required
                    disabled={loading}
                />
                <button className="btn btn-success" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
            <p className="mt-3">
                Already have an account? <a href="/login">Login</a>
            </p>
        </div>
    );
};

export default Register;