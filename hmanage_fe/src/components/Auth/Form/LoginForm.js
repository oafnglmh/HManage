import React from "react";
import { request, setAuthToken } from "../../../helper/axios_helper";
import Popup from "../../Notification/js/Popup";
export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            status: null,
            popup: null
        };
    }

    onChangeHandler = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { username, password } = this.state;

        request("POST", "/login", {
            username: username,
            password: password
        }).then((response) => {
            this.setState({
                popup: { type: "success", message: "Đăng nhập thành công!" },
            });
            setAuthToken(response.data.token);
        }).catch((error) => {
            this.setState({
                popup: { type: "error", message: "Đăng nhập thất bại!" },
            });
            console.error("Lỗi đăng nhập", error);
        });
    }
    closePopup = () => {
        this.setState({ popup: null });
    };
    render() {
        const { status,popup } = this.state;

        return (
            <>
            <form onSubmit={this.onSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username or Email"
                    onChange={this.onChangeHandler}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.onChangeHandler}
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
                    onClose={this.closePopup}
                />
                )}
            </>
        );
    }
}
