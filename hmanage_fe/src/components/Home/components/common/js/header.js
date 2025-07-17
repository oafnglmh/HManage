import React from "react";
import "../css/same.css";

const Header = () => {
    return (
        <header className="header">
            <div className="logo">HManage</div>
            <nav className="nav">
                <a href="/home" className="nav-link">Home</a>
                <a href="/about" className="nav-link">About</a>
                <a href="/contact" className="nav-link">Contact</a>
            </nav>
        </header>
    );
};

export default Header;
