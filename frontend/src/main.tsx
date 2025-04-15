import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// FontAwesome imports
import "@fortawesome/fontawesome-free/css/all.min.css";

// Axios import
import axios from "axios";

// Ensure Axios includes credentials by default
axios.defaults.withCredentials = true;

// Function to fetch CSRF cookie & render app
const initializeApp = async () => {
  try {
    await axios.get("http://localhost:8000/sanctum/csrf-cookie");
    console.log("CSRF cookie successfully fetched.");
  } catch (error) {
    console.error("Failed to fetch CSRF cookie:", error);
  }

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
};

// Initialize app
initializeApp();
