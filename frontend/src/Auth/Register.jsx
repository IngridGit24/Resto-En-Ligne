import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postRequest } from "../Core/ApiProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await postRequest("/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      });

      if (response.token) {
        localStorage.setItem("token", response.token); 
        toast.success("Registration successful! Logging in...");
        navigate("/"); 
      }
    } catch (error) {
      toast.error("Registration failed. Try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" className="form-control my-2" placeholder="Name" onChange={handleInputChange} required />
        <input type="email" name="email" className="form-control my-2" placeholder="Email" onChange={handleInputChange} required />
        <input type="password" name="password" className="form-control my-2" placeholder="Password" onChange={handleInputChange} required />
        <input type="password" name="confirmPassword" className="form-control my-2" placeholder="Confirm Password" onChange={handleInputChange} required />
        <button className="btn btn-success" type="submit">Register</button>
      </form>

      <p className="mt-3">Already have an account? <a href="/login">Login now</a></p>
    </div>
  );
}

export default Register;
