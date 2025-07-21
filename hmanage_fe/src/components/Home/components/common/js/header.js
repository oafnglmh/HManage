import React from "react";
import "../css/same.css";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
    const { pathname } = useLocation();

    const getNavItemClass = (path) => {
        return `nav-item${pathname === path ? ' active' : ''}`;
    };
    return (
        <header className="header">
            <div className="logo">HManage</div>
            <nav className="nav">
                <Link to="/home" className={getNavItemClass('/home')}>Trang chủ</Link>
                <Link to="/questions" className={getNavItemClass('/questions')}>Trắc nghiệm</Link>
            </nav>
        </header>
    );
};

export default Header;
