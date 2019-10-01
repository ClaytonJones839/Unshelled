import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import { Link } from "react-router-dom";

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            username: "",
            firstName: "",
            lastName: "",
            photo: "https://unshelled-dev.s3-us-west-1.amazonaws.com/users/untapped-avatar.jpg",
            errors: ""
        };
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    updateCache(client, { data }) {
        client.writeData({
            data: { isLoggedIn: data.register.isLoggedIn, _id: data.register._id, photo: data.register.photo, firstName: data.register.firstName, lastName: data.register.lastName, username: data.register.username }
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
                mutation={Mutations.REGISTER_USER}
                onCompleted={data => {
                    const { token, _id, firstName, lastName, photo, username } = data.register;
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
                update={(client, data) => this.updateCache(client, data)}
            >
                {registerUser => (
                    <div className="login-page-wrap">
                        <div className="animated fadeInRightBig signup-form-container">
                        <div className="login-form-top">
                            <div className="login-logo">
                                UNSHELLED
                                </div>
                            <div className="login-logo-bottom">
                                EAT SOCIALLY
                                </div>
                        </div>
                        <ul className='ul-errors ul-errors-register'>
                                    {errors}
                                  </ul>
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
                                        photo: this.state.photo
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
                            <input
                                className="signup-input"
                                value={this.state.photo}
                                onChange={this.update("photo")}
                                type="text"
                                placeholder="Photo Url"
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
