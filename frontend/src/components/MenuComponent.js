import React, { useEffect, useState } from "react";
import API from "../api";

const MenuComponent = () => {
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        API.get("/menus")
            .then(response => setMenus(response.data))
            .catch(error => console.error("Error fetching menus:", error));
    }, []);

    return (
        <div>
            <h2>Menu List</h2>
            <ul>
                {menus.map(menu => (
                    <li key={menu.id}>
                        <h3>{menu.name}</h3>
                        <p>{menu.description}</p>
                        <p>Price: ${menu.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MenuComponent;
