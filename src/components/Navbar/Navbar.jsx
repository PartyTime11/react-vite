import "./Navbar.css"

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-brand">
                <img src='/Logo.svg' />
            </div>
            <nav className="navbar-links">
                <a href="#">Houses</a>
                <a href="#">Shop</a>
                <a href="#">Gifts</a>
            </nav>
        </div>
    )
}

export default Navbar