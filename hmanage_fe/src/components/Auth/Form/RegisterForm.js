
import React from "react";
import { request, setAuthToken } from "../../../helper/axios_helper";
import Popup from "../../Notification/js/Popup";
export default class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            username: '',
            password: '',
            status: null,
            popup: null,
        };
    }

    onChangeHandler = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { first_name, last_name, username, password } = this.state;
        if (!first_name || !last_name || !password || !username) {
        this.setState({
            popup: { type: "error", message: "Vui lòng điền đầy đủ thông tin." },
        });
        return;
        }
        request("POST", "/register", {
            first_name,
            last_name,
            username,
            password
        }).then((response) => {
            this.setState({
                popup: { type: "success", message: "Đăng ký thành công!" },
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
            });
            console.log("Đăng ký thành công", response.data);
            setAuthToken(response.data.token);
        }).catch((error) => {
        let message = "Đăng ký thất bại. Vui lòng thử lại.";
        if (error.response && error.response.data && error.response.data.message) {
            message = error.response.data.message;
        }
        this.setState({
            popup: { type: "error", message },
        });
            console.error("Lỗi đăng ký", error);
        });
    }
    closePopup = () => {
        this.setState({ popup: null });
    };
    render() {
        const { status,popup  } = this.state;

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
                <button className="login-btn" type="submit">Register</button>
                
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
