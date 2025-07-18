import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/same.css'

const Navbar = () => {
    const { pathname } = useLocation();

    const getNavItemClass = (path) => {
        return `nav-item${pathname === path ? ' active' : ''}`;
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/home" className={getNavItemClass('/home')}>Home</Link>
                <Link to="/questions" className={getNavItemClass('/questions')}>Trắc nghiệm</Link>
                <Link to="/contact" className={getNavItemClass('/contact')}>Contact</Link>
            </div>
        </nav>
    );
};

export default Navbar;
