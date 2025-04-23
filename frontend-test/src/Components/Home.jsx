import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getRequest } from "../Core/ApiProvider";

const Home = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [popularMenus, setPopularMenus] = useState([
        { id: 1, name: "KFC", image: "https://th.bing.com/th/id/OIP.0_TZrVYh2BUjnYkK85e4PQHaE8?w=274&h=183&c=7&r=0&o=5&dpr=2&pid=1.7" },
        { id: 2, name: "McDonald's", image: "https://th.bing.com/th/id/OIP.pLIeeJkgFiAS-xSW3u6iVwHaE8?w=282&h=188&c=7&r=0&o=5&dpr=2&pid=1.7" },
        { id: 3, name: "Burger King", image: "https://th.bing.com/th/id/OIP.dtkDxD5Q1X91mrDhiSqTjAHaE8?w=249&h=180&c=7&r=0&o=5&dpr=2&pid=1.7" },
    ]);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        try {
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            } else {
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

    // Live filtering effect
    useEffect(() => {
        const filtered = restaurants.filter(resto =>
            resto.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredRestaurants(filtered);
    }, [searchQuery, restaurants]);

    // Optional manual search button
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
                    name="search"
                    className="form-control"
                    placeholder="Search restaurants..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-warning" onClick={handleSearch}>Search</button>
            </div>

            {/* Restaurant Cards */}
            <h3 className="mb-3">Discover Restaurants Near You</h3>
            {filteredRestaurants.length === 0 && searchQuery ? (
                <p className="text-muted">No restaurants found matching your search.</p>
            ) : (
                <div className="row">
                    {filteredRestaurants.map(restaurant => (
                        <div key={restaurant.id} className="col-md-4 mb-4">
                            <div className="card">
                                <img
                                    src={restaurant.image}
                                    className="card-img-top"
                                    alt={restaurant.name}
                                />
                                <div className="card-body text-center">
                                    <h5 className="card-title">{restaurant.name}</h5>
                                    <p className="card-text">{restaurant.city}</p>
                                    <div className="d-flex justify-content-center gap-2">
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => navigate(`/menus?restaurant=${restaurant.id}`)}
                                        >
                                            View Menu
                                        </button>
                                        <button
                                            className="btn btn-success"
                                            onClick={() => navigate(`/menus?restaurant=${restaurant.id}`)}
                                        >
                                            Order
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

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
