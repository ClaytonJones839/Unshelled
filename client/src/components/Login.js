import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../graphql/mutations";
import { Link } from "react-router-dom";
import SessionCSS from "./session.css"

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };

    }

    update(field) {
        return e => this.setState({ [field]: e.target.value });
    }


    updateCache(client, { data }) {
        // console.log(data.login);
        // debugger;
        client.writeData({
            data: { isLoggedIn: data.login.isLoggedIn, _id: data.login._id, photo: data.login.photo, firstName: data.login.firstName, lastName: data.login.lastName }
        });
        // debugger;
    }


    render() {
        return (
            <Mutation
                mutation={Mutations.LOGIN_USER}
                onCompleted={data => {
                    const { token } = data.login;
                    console.log("wof", data);
                    localStorage.setItem("auth-token", token);
                    // localStorage.setItem("currentUserId", data.login._id)
                    // console.log(localStorage);
                    this.props.history.push("/");
                }}
                update={(client, data) => this.updateCache(client, data)}
            >
                {loginUser => (
                    <div className="login-page-wrap">
                        <div className="login-form-container">
                            <div className="login-form-top">
                                <div className="login-logo">
                                    UNSHELLED
                                </div>
                                <div className="login-logo-bottom">
                                    EAT SOCIALLY 
                                </div>
                            </div>
                            <form className="login-form-middle"
                                onSubmit={e => {
                                    e.preventDefault();
                                    loginUser({
                                        variables: {
                                            email: this.state.email,
                                            password: this.state.password
                                        }
                                    });
                                }}
                            >
                                <button className="login-form-demo" onClick={e => {
                                      e.preventDefault();
                                    this.setState({ email: "carne@asada.com", password: "password" }, () => {
                                          loginUser({
                                            variables: {
                                              email: this.state.email,
                                              password: this.state.password
                                            }
                                          });
                                      });
                                      
                                }}>Demo Login</button>
                                <div className="demo-or-login">
                                    OR
                                </div>
                                <div className="login-inputs">
                                <input
                                    className="login-input"
                                    value={this.state.email}
                                    onChange={this.update("email")}
                                    placeholder="Email"
                                />
                                <input
                                    className="login-input"
                                    value={this.state.password}
                                    onChange={this.update("password")}
                                    type="password"
                                    placeholder="Password"
                                />
                                </div>
                                <button className="login-form-button" type="submit">Sign In</button>
                            </form>
                            <div className="login-form-bottom">
                                New around here? &nbsp;
                                <Link className="login-link" to="/register">Sign Up!</Link>
                            </div>
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}
