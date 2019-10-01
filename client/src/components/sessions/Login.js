import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import { Link } from "react-router-dom";


export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            errors: ""
        };
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value });
    }


    updateCache(client, { data }) {
        client.writeData({
            data: { isLoggedIn: data.login.isLoggedIn, _id: data.login._id, photo: data.login.photo, firstName: data.login.firstName, lastName: data.login.lastName, username: data.login.username }
        });
    }


    render() {
      const errors = this.state.errors ? (
        <li className='li-errors'>{this.state.errors.graphQLErrors[0].message}</li>
      ) : (
        <li className='li-errors'></li>
      );

        return (
            <Mutation
                mutation={Mutations.LOGIN_USER}
                onCompleted={data => {
                    const { token, _id, firstName, lastName, photo, username } = data.login;
                    localStorage.setItem("auth-token", token);
                    localStorage.setItem("currentUserId", _id);
                    localStorage.setItem("currentUserFName", firstName);
                    localStorage.setItem("currentUserLName", lastName);
                    localStorage.setItem("currentUserPhoto", photo);
                    localStorage.setItem("currentUserUsername", username);
                    this.props.history.push("/");
                }}
                onError={ err => {
                  this.setState({errors: err})
                  }
                }
                update={(client, data) => {
                  return (this.updateCache(client, data))}}
            >
                {loginUser => (
                    <div className="login-page-wrap">
                <div className="animated fadeInRightBig login-form-container">
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
                                  <ul className='ul-errors'>
                                    {errors}
                                  </ul>
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
