import React, { useEffect, useState } from "react";
import API from "../api";

const RestaurantComponent = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        API.get("/restaurants")
            .then(response => setRestaurants(response.data))
            .catch(error => console.error("Error fetching restaurants:", error));
    }, []);

    return (
        <div>
            <h2>Restaurant List</h2>
            <ul>
                {restaurants.map(restaurant => (
                    <li key={restaurant.id}>
                        <h3>{restaurant.name}</h3>
                        <p>{restaurant.address}, {restaurant.city}</p>
                        <p>Phone: {restaurant.phone}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RestaurantComponent;
