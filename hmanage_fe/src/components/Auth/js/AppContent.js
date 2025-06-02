// AppContent.js
import React from "react";
import "../css/AppContent.css";
import { request } from "../../../helper/axios_helper";
import LoginForm from "../Form/LoginForm";
import RegisterForm from "../Form/RegisterForm";

export default class AppContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true,
            onLogin: props.onLogin,
            onRegister: props.onRegister
        };
    }

    toggleForm = () => {
        this.setState((prevState) => ({ isLogin: !prevState.isLogin }));
    }

    componentDidMount() {
        request("GET", "/messages", {}).then((response) => {
            this.setState({ data: response.data });
        });
    }

    render() {
        const { isLogin, onLogin, onRegister } = this.state;
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
                                    <>Don't have an account? <a href="#" onClick={this.toggleForm}>Sign up</a></>
                                ) : (
                                    <>Already have an account? <a href="#" onClick={this.toggleForm}>Log in</a></>
                                )}
                            </p>
                        </div>

                        {isLogin ? (
                            <LoginForm onLogin={onLogin} />
                        ) : (
                            <RegisterForm onRegister={onRegister} />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
