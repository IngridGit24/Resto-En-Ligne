import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getRequest } from "../Core/ApiProvider";

const Home = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]); // ✅ Added missing state
    const [popularMenus, setPopularMenus] = useState([
        { id: 1, name: "KFC", image: "https://example.com/kfc.jpg" },
        { id: 2, name: "McDonald's", image: "https://example.com/mcdonalds.jpg" },
        { id: 3, name: "Burger King", image: "https://example.com/burgerking.jpg" },
    ]);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
    
        try {
            if (storedUser) {
                console.log("User found in localStorage:", storedUser);
                setUser(JSON.parse(storedUser));
            } else {
                console.warn("No user found in localStorage.");
                setUser(null);
            }
        } catch (error) {
            console.error("Invalid JSON in localStorage:", error);
            localStorage.removeItem("user");
            setUser(null);
        }
    
        getRequest("/restaurants")
            .then(data => {
                setRestaurants(data);
                setFilteredRestaurants(data);
            })
            .catch(error => console.error("Failed to fetch restaurants:", error));
    }, []);
    

    // Handle search filtering
    const handleSearch = () => {
        const filtered = restaurants.filter(resto =>
            resto.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredRestaurants(filtered);
    };

    return (
        <div className="container mt-5">
            {/* Welcome Section */}
            {user && (
                <div className="mb-4 text-center">
                    <h2>Welcome, {user.name}! 🍽️</h2>
                    <p>Find the best restaurants and order your favorite food with ease!</p>
                </div>
            )}

            {/* Search Bar */}
            <div className="input-group mb-4">
                <input
                    type="text"
                    name="search" // ✅ Added missing name attribute
                    className="form-control"
                    placeholder="Search restaurants..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-warning" onClick={handleSearch}>Search</button>
            </div>

            {/* Restaurant Cards */}
            <h3 className="mb-3">Discover Restaurants Near You</h3>
            <div className="row">
                {filteredRestaurants.map(restaurant => (
                    <div key={restaurant.id} className="col-md-4 mb-4">
                        <div className="card">
                            <img
                                src={restaurant.image || "https://example.com/placeholder.jpg"}
                                className="card-img-top"
                                alt={restaurant.name}
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title">{restaurant.name}</h5>
                                <p className="card-text">{restaurant.city}</p>
                                <button className="btn btn-primary" onClick={() => navigate(`/menus?restaurant=${restaurant.id}`)}>
                                    View Menu
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Most Popular Menus */}
            <h3 className="mt-5 mb-3">Most Popular Menus</h3>
            <div className="row">
                {popularMenus.map(menu => (
                    <div key={menu.id} className="col-md-4 mb-4">
                        <div className="card">
                            <img src={menu.image} className="card-img-top" alt={menu.name} />
                            <div className="card-body text-center">
                                <h5 className="card-title">{menu.name}</h5>
                                <button className="btn btn-success" onClick={() => navigate(`/menus?restaurant=${menu.id}`)}>
                                    Order Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;