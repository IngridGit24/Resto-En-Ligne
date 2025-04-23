const FooterComponent = () => {
    return (
        <footer className="bg-dark text-light text-center p-3 fixed-bottom">
            <p>&copy; {new Date().getFullYear()} Resto-En-Ligne. All rights reserved.</p>
            <p>Follow us on: 
                <a href="#" className="text-light ms-2">Facebook</a> |
                <a href="#" className="text-light ms-2">Twitter</a>
            </p>
        </footer>
    );
};

export default FooterComponent;
