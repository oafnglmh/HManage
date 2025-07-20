import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "../../Notification/js/Popup";
import authService from "../Services/AuthService";
import { useAuth } from "../../../context/AuthContext";
export default function LoginForm() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [popup, setPopup] = useState(null);
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const { isLoggedIn, login, register } = useAuth();
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await authService.login(formData.username, formData.password);
            login(token);
            setPopup({ type: "success", message: "Đăng nhập thành công!" });
            navigate("/home");
        } catch (error) {
            setPopup({ type: "error", message: "Đăng nhập thất bại!" });
            console.error("Lỗi đăng nhập", error);
        }
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username or Email"
                    onChange={onChangeHandler}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={onChangeHandler}
                />
                <div className="options">
                    <a href="#">Forgot Password?</a>
                </div>
                <button className="login-btn" type="submit">Log in</button>
            </form>

            {popup && (
                <Popup
                    type={popup.type}
                    message={popup.message}
                    onClose={() => setPopup(null)}
                />
            )}
        </>
    );
}
