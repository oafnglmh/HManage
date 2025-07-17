import React from "react";
import authService from "../Services/AuthService";
import Popup from "../../Notification/js/Popup";
import { useNavigate } from "react-router-dom";
export default class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        popup: null,
        };
    }

    onChangeHandler = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    onSubmit = async (e) => {
        const navigator = useNavigate;
        e.preventDefault();
        const { first_name, last_name, username, password } = this.state;

        if (!first_name || !last_name || !password || !username) {
        this.setState({
            popup: { type: "error", message: "Vui lòng điền đầy đủ thông tin." },
        });
        return;
        }

        try {
            await authService.register({ first_name, last_name, username, password });
            console.log("đăng kí nè haha")
            this.setState({
                popup: { type: "success", message: "Đăng ký thành công!" },
                username: "",
                password: "",
                first_name: "",
                last_name: "",
            });
            navigator("/home")
        } catch (error) {
            let message = "Đăng ký thất bại. Vui lòng thử lại.";
            if (error.response?.data?.message) {
                message = error.response.data.message;
            }
            this.setState({
                popup: { type: "error", message },
            });
            console.error("Lỗi đăng ký", error);
            }
    };

    closePopup = () => {
        this.setState({ popup: null });
    };

    render() {
        const { popup } = this.state;

        return (
        <>
            <form onSubmit={this.onSubmit}>
            <input
                type="text"
                name="first_name"
                placeholder="First Name"
                onChange={this.onChangeHandler}
            />
            <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                onChange={this.onChangeHandler}
            />
            <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={this.onChangeHandler}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.onChangeHandler}
            />
            <button className="login-btn" type="submit">
                Register
            </button>
            </form>

            {popup && (
            <Popup
                type={popup.type}
                message={popup.message}
                onClose={this.closePopup}
            />
            )}
        </>
        );
    }
}
