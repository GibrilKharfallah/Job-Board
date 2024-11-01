import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/"); // Redirection vers la page d'accueil
        window.scrollTo(0, 0); // Amener en haut de la page
    };

    return (
        <header className="header">
            <NavLink to="/">
                {" "}
                {/* Redirection vers la page d'accueil */}
                <img src="../../assets/img/icon-logo.png" alt="Logo" />
            </NavLink>
            <nav className="header__nav">
                <ul>
                    <NavLink to="/about-us">
                        <li>About us</li>
                    </NavLink>
                    <NavLink to="/q-a">
                        <li>Q&A</li>
                    </NavLink>
                    <NavLink to="/contact-us">
                        <li>Contact us</li>
                    </NavLink>
                </ul>
            </nav>

            {user ? (
                <div>
                    <NavLink to="/profile">
                        <button type="button">Profile</button>
                    </NavLink>
                    <button type="button" onClick={handleLogout}>
                        Log out
                    </button>
                </div>
            ) : (
                <div>
                    <NavLink to="/" onClick={() => window.scrollTo(0, 0)}>
                        <button type="button">Log in</button>
                    </NavLink>
                    <NavLink to="/" onClick={() => window.scrollTo(0, 0)}>
                        <button type="button">Sign in</button>
                    </NavLink>
                </div>
            )}
        </header>
    );
};

export default Header;
