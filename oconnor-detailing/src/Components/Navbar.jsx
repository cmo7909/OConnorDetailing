import React from "react";
import { Link, useLocation } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
    const {pathname} = useLocation();

    return(
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">Detailing Co.</Link>
            </div>
            <ul className="navbar-links">
                {["Home", "Pricing", "Gallery", "Contact"].map((name) => (
                    <li key={name}>
                        <Link
                            to={name === "Home" ? "/" : `/${name.toLowerCase()}`}
                            className={pathname === (name === "Home" ? "/" : `/${name.toLowerCase()}`) ? "active" : ""}
                        >
                            {name}
                        </Link> 
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Navbar;