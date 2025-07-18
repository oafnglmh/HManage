import React from "react";
import Header from "../../common/js/header";
import Navbar from "../../common/js/navbar";
import "../css/homePage.css";
import { Outlet } from "react-router-dom";

function HomePage() {
    return (
        <div className="layout">
            <Header />
            <div className="content">
                <Navbar />
                <main className="main">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default HomePage;