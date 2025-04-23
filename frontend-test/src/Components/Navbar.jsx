import { Link } from "react-router-dom";

const NavbarComponent = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top py-3"> 
            <div className="container-fluid"> 
                <Link className="navbar-brand fw-bold fs-2" to="/">Resto-En-Ligne</Link> 
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link fs-4" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fs-4" to="/contacts">Contacts</Link> 
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavbarComponent;
