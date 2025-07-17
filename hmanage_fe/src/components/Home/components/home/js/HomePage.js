import React from "react";
import Header from "../../common/js/header";
import Navbar from "../../common/js/navbar";
import "../css/homePage.css";

function HomePage() {
    return (
        <div className="layout">
            <Header />
            <div className="content">
                <Navbar />
                <main className="main">
                    <h2>Welcome to the Home Page</h2>
                    <p>This is your main content.</p>
                </main>
            </div>
        </div>
    );
}

export default HomePage;