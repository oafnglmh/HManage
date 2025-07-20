import React, { useState } from "react";
import "../css/AppContent.css";
import LoginForm from "../Form/LoginForm";
import RegisterForm from "../Form/RegisterForm";
import { useAuth } from "../../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function AppContent() {
    const [isLogin, setIsLogin] = useState(true);
    const { isLoggedIn, login, register } = useAuth();

    const toggleForm = () => setIsLogin((prev) => !prev);

    if (isLoggedIn) {
        return <Navigate to="/home" replace />;
    }

    return (
        <div className="container">
        <div className="left">
            <img
            src="https://cdn.pixabay.com/animation/2022/11/15/11/37/11-37-03-576_512.gif"
            alt="Illustration"
            className="illustration"
            />
        </div>

        <div className="right">
            <div className="login-box">
            <div className="header_login">
                <h2>{isLogin ? "Log in" : "Sign up"}</h2>
                <p>
                {isLogin ? (
                    <>
                    Don't have an account?{" "}
                    <a href="#" onClick={toggleForm}>
                        Sign up
                    </a>
                    </>
                ) : (
                    <>
                    Already have an account?{" "}
                    <a href="#" onClick={toggleForm}>
                        Log in
                    </a>
                    </>
                )}
                </p>
            </div>

            {isLogin ? (
                <LoginForm onLogin={login} />
            ) : (
                <RegisterForm onRegister={register} />
            )}
            </div>
        </div>
        </div>
    );
}
