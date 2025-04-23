import { BrowserRouter } from "react-router-dom";
import RouterComponent from "./router";
import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import './App.css'


function App() {
    return (
        <BrowserRouter>
            <ToastContainer position="top-center" autoClose={2000} />
            <RouterComponent />
        </BrowserRouter>
    );
}

export default App;