import React from "react";
import "./AppContent.css";
import { request } from "../helper/axios_helper";

export default class AppContent extends React.Component {
    constructor(props){
        super(props)
        this.state={
            username : '',
            first_name: '',
            last_name :'',
            email     :'',
            password  :'',
            onLogin:props.onLogin,
            onRegister:props.onRegister
        };
    };
    onChangeHanler= (event)=>{
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]:value})
    }
    onSubmitLogin = (e) =>{
        this.state.onLogin(e,this.state.username,this.state.password)
    }
    componentDidMount(){
        request(
            "GET",
            "/messages",
            {}
        ).then((Response)=>{
            this.setState({data :Response.data})
        });
    }
    render() {
        return (
            <div className="container">
                <div className="left">
                    <img
                        src="https://cdn.pixabay.com/animation/2022/11/09/13/06/13-06-21-906_512.gif"
                        alt="Illustration"
                        className="illustration"
                    />
                </div>

                <div className="right">
                    <div className="login-box">
                        <div className="header_login">
                            <h2>Log in</h2>
                            <p>
                                Don't have an account? <a href="#">Sign up</a>
                            </p>
                        </div>

                    {/* <div className="social-login">
                        <button className="google-btn">Sign in with Google</button>
                        <button className="microsoft-btn">Sign in with Microsoft</button>
                    </div> */}


                    <form>
                        <input
                            type="email"
                            placeholder="Email"
                            defaultValue=""
                        />
                        <div className="password-wrapper">
                            <input type="password" placeholder="Password" />
                        </div>

                        <div className="options">
                            <a href="#">Forgot Password?</a>
                        </div>

                        <button className="login-btn">Log in</button>
                    </form>
                    </div>
                </div>
            </div>
        );
    }
}
