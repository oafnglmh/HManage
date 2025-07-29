import React from "react";
import "../css/same.css";
import { Link, useLocation } from "react-router-dom";
import { FaGlobe, FaHome, FaQuestionCircle, FaUser } from "react-icons/fa";

const Header = () => {
    const { pathname } = useLocation();
    const userId = localStorage.getItem("userId");
    const getNavItemClass = (path) => {
        return `nav-item${pathname === path ? ' active' : ''}`;
    };
    return (
        <header className="header">
            <div className="logo">HManage</div>
            <nav className="nav">
                <Link to="/home" className={getNavItemClass('/home')}>
                    <FaHome className="icon" />
                    <span className="label">Trang chủ</span>
                </Link>
                <Link to="/questions" className={getNavItemClass('/questions')}>
                    <FaQuestionCircle className="icon" />
                    <span className="label">Trắc nghiệm</span>
                </Link>
                <Link to="/socials" className={getNavItemClass('/socials')}>
                    <FaGlobe className="icon" />
                    <span className="label">Mạng xã hội</span>
                </Link>
                <Link
                    to={`/users/${userId}`} 
                    className={getNavItemClass(`/users/${userId}`)}
                    >
                    <FaUser className="icon" />
                    <span className="label">Tài khoản</span>
                </Link>

            </nav>
        </header>
    );
};

export default Header;
