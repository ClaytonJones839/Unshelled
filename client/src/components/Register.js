import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../graphql/mutations";
// import SessionCSS from "../Session.css"
import { Link } from "react-router-dom";

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            username: "",
            firstName: "",
            lastName: ""
        };
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    updateCache(client, { data }) {
        // console.log(data);
        client.writeData({
            data: { isLoggedIn: data.register.loggedIn, id: data.register._id }
        });
    }

    render() {
        return (
            <Mutation
                mutation={Mutations.REGISTER_USER}
                onCompleted={data => {
                    const { token } = data.register;
                    localStorage.setItem("auth-token", token);
                    this.props.history.push("/");
                }}
                update={(client, data) => this.updateCache(client, data)}
            >
                {registerUser => (
                    <div className="login-page-wrap">
                        <div className="signup-form-container">
                        <div className="login-form-top">
                            <div className="login-logo">
                                UNSHELLED
                                </div>
                            <div className="login-logo-bottom">
                                EAT SOCIALLY
                                </div>
                        </div>
                            <form className="signup-form-middle"
                            onSubmit={e => {
                                e.preventDefault();
                                registerUser({
                                    variables: {
                                        email: this.state.email,
                                        password: this.state.password,
                                        username: this.state.username,
                                        firstName: this.state.firstName,
                                        lastName: this.state.lastName,
                                    }
                                });
                            }}
                        >
                        <div className="signup-inputs">
                            <input
                                className="signup-input"
                                value={this.state.username}
                                onChange={this.update("username")}
                                placeholder="Username"
                            />
                            <input
                                className="signup-input"
                                value={this.state.firstName}
                                onChange={this.update("firstName")}
                                placeholder="First Name"
                            />
                            <input
                                className="signup-input"
                                value={this.state.lastName}
                                onChange={this.update("lastName")}
                                placeholder="Last Name"
                            />
                            <input
                                className="signup-input"
                                value={this.state.email}
                                onChange={this.update("email")}
                                placeholder="Email"
                            />
                            <input
                                className="signup-input"
                                value={this.state.password}
                                onChange={this.update("password")}
                                type="password"
                                placeholder="Password"
                            />
                            <button className="signup-form-button" type="submit">Sign Up</button>
                        </div>
                        </form>
                            <div className="login-form-bottom">
                                Already a member? &nbsp;
                                <Link className="login-link" to="/login">Log In!</Link>
                            </div>
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}
