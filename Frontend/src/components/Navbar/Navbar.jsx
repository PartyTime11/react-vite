import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    console.log('Navbar rendered, isAuthenticated:', isAuthenticated);
    
    const handleLogout = (e) => {
        e.preventDefault();
        logout();
    };

  return (
    <div className="navbar">
        <div className="navbar-brand">
            <Link to="/">
                <img src='/Logo.png' className="img-harry"/>
            </Link>
        </div>
        <nav className="navbar-links">
            {isAuthenticated && (
            <Link to="/auth/basket">
                <img src="/Basket.png" className="img-basket"/>
             </Link>
            )}
            <Link to="/catalogue">Catalogue</Link>
            {!isAuthenticated ? (
            <>
                <Link to="/auth/login">Login</Link>
                <Link to="/auth/register">Registration</Link>
            </>
            ) : (
            <a 
                href="#logout" 
                onClick={handleLogout}
                className="navbar-link"
                style={{ cursor: 'pointer' }}
             >
                Logout
            </a>
            )}
        </nav>
    </div>
    )
}

export default Navbar;