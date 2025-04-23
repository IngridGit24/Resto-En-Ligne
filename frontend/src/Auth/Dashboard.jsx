import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getRequest, postRequest, putRequest, deleteRequest } from "../Core/ApiProvider";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [editingUserId, setEditingUserId] = useState(null);

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getRequest("/users");
      setUsers(data);
    } catch (error) {
      toast.error("Failed to load users.");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingUserId) {
      // Update existing user
      try {
        await putRequest(`/users/${editingUserId}`, formData);
        toast.success("User updated successfully!");
        setEditingUserId(null);
      } catch (error) {
        toast.error("Failed to update user.");
      }
    } else {
      // Create new user
      try {
        await postRequest("/users", formData);
        toast.success("User created successfully!");
      } catch (error) {
        toast.error("Failed to create user.");
      }
    }
    setFormData({ name: "", email: "", password: "" });
    fetchUsers();
  };

  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setFormData({ name: user.name, email: user.email, password: "" });
  };

  const handleDelete = async (id) => {
    try {
      await deleteRequest(`/users/${id}`);
      toast.success("User deleted successfully!");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to delete user.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>User Management Dashboard</h2>

      {/* User Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="name"
          className="form-control my-2"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          className="form-control my-2"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          className="form-control my-2"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required={!editingUserId} 
        />
        <button className="btn btn-success" type="submit">
          {editingUserId ? "Update User" : "Add User"}
        </button>
      </form>

      {/* User List */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button className="btn btn-warning btn-sm mx-1" onClick={() => handleEdit(user)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm mx-1" onClick={() => handleDelete(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;