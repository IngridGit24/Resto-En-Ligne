import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleRegister = (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        // Mock registration (replace with API call)
        localStorage.setItem("token", "mockToken");
        localStorage.setItem("user", JSON.stringify({ name, email }));

        navigate("/dashboard");
    };

    return (
        <div className="container mt-5 text-center">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input type="text" className="form-control my-2" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
                <input type="email" className="form-control my-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" className="form-control my-2" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                <input type="password" className="form-control my-2" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} required />

                {/* Display error if passwords don't match */}
                {error && <p className="text-danger">{error}</p>}

                <button className="btn btn-success">Register</button>
            </form>
            <p className="mt-3">Already have an account? <a href="/login">Login here</a></p>
        </div>
    );
};

export default Register;