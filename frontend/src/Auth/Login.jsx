import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postRequest } from "../Core/ApiProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("User already logged in, redirecting...");
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postRequest("/login", { email, password });

      if (response.token && response.user) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        toast.success(`Welcome back, ${response.user.name}!`);
        navigate("/");
        window.location.reload(); // ✅ Ensures Navbar updates immediately
      } else {
        console.error("Unexpected login response format:", response);
        toast.error("Login failed, please try again.");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      toast.error("Invalid credentials, please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          className="form-control my-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          id="password"
          name="password"
          className="form-control my-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-primary" type="submit">Login</button>
      </form>

      <p className="mt-3">
        Don't have an account? <a href="/register">Register now</a>
      </p>
    </div>
  );
}

export default Login;
