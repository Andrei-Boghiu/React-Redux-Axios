import React from "react";
import { useLocation, Link } from "react-router-dom";
import '../../assets/buttons.css'

const NavButton = ({ to, children }) => {
    const location = useLocation()
    const isActive = location.pathname === to ? 'btn-highlight' : null
    const outline = to === '/register' || to === '/login' ? 'btn-outline' : null

    return (
        <Link className={`nav-button ${isActive} ${outline}`}
            to={to}>
            {children}
        </Link>
    )
}

export default NavButton