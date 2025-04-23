import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRequest, postRequest, putRequest, deleteRequest } from "../Core/ApiProvider";
import { toast } from "react-toastify";

const Dashboard = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
    const [editUser, setEditUser] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch logged-in user & all users
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            navigate("/login");
        } else {
            setCurrentUser(JSON.parse(storedUser));
        }

        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await getRequest("/users");
                setUsers(response);
            } catch (error) {
                console.error("Error fetching users:", error);
                toast.error("Failed to fetch users.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [navigate]);

    // Handle new user creation
    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            const response = await postRequest("/users", newUser);
            setUsers([...users, response]); // Update state
            setNewUser({ name: "", email: "", password: "" }); // Reset form
            toast.success("User created successfully!");
        } catch (error) {
            console.error("Error creating user:", error);
            toast.error("Failed to create user.");
        }
    };

    // Handle user update
    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            await putRequest(`/users/${editUser.id}`, editUser);
            setUsers(users.map(user => user.id === editUser.id ? editUser : user));
            setEditUser(null);
            toast.success("User updated successfully!");
        } catch (error) {
            console.error("Error updating user:", error);
            toast.error("Failed to update user.");
        }
    };

    // Handle user deletion
    const handleDeleteUser = async (id) => {
        try {
            await deleteRequest(`/users/${id}`);
            setUsers(users.filter(user => user.id !== id)); // Remove from state
            toast.success("User deleted successfully!");
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Failed to delete user.");
        }
    };

    return (
        <div className="container mt-5 text-center">
            {currentUser ? (
                <>
                    <h2>Welcome, {currentUser.name} 👋</h2>
                    <p>Email: {currentUser.email}</p>

                    {/* Create New User */}
                    <form className="mt-4" onSubmit={handleCreateUser}>
                        <h4>Add New User</h4>
                        <input type="text" placeholder="Name" className="form-control my-2" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} required />
                        <input type="email" placeholder="Email" className="form-control my-2" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} required />
                        <input type="password" placeholder="Password" className="form-control my-2" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} required />
                        <button className="btn btn-success" disabled={loading}>Create User</button>
                    </form>

                    {/* Edit User */}
                    {editUser && (
                        <form className="mt-4" onSubmit={handleUpdateUser}>
                            <h4>Edit User</h4>
                            <input type="text" className="form-control my-2" value={editUser.name} onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} required />
                            <input type="email" className="form-control my-2" value={editUser.email} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} required />
                            <button className="btn btn-warning" disabled={loading}>Update User</button>
                        </form>
                    )}

                    {/* Users List */}
                    <h3 className="mt-5">Users List</h3>
                    <table className="table mt-3">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button className="btn btn-warning me-2" onClick={() => setEditUser(user)}>Edit</button>
                                        <button className="btn btn-danger" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <h2>Redirecting to Login...</h2>
            )}
        </div>
    );
};

export default Dashboard;
