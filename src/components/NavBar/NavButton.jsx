import React from "react";
import { useLocation, Link } from "react-router-dom";
import '../../assets/buttons.css'

const NavButton = ({ to, children }) => {
    const location = useLocation()
    const isActive = location.pathname === to;

    return (
        <Link className={`nav-button ${isActive && 'btn-highlight'}`} to={to}>
            {children}
        </Link>
    )
}

export default NavButton