import React from "react";
import { Link } from "react-router-dom";
import { Query, ApolloConsumer } from 'react-apollo'
import Queries from "../../graphql/queries";
import { LocalState } from "apollo-client/core/LocalState";
const { IS_LOGGED_IN } = Queries;

const Nav = props => {



    return (
        <ApolloConsumer>
            {client => (
                <div className="navbar-container">
                    <nav className="navbar">
                        <div className="leftside-nav">
                            <div className="nav-logo">
                                <Link to="/" className="nav-logo-title">Unshelled</Link>
                                <span className="nav-logo-span">Eat Socially</span>
                            </div>
                            <div className="navlink">
                                <Link className="navlink-item" to="/restaurants">Restaurants</Link>
                            </div>
                        </div>
                                
                        <div className="rightside-nav">
                            <Query query={IS_LOGGED_IN}>
                                    {
                                        ({data}) => {
                                            if (data.isLoggedIn) {
                                            return (
                                                <div className="nav-dropdown">
                                                    <img className="nav-avatar" src="https://gravatar.com/avatar/80b1bf3f675731ac5dd63a7f8144610f?size=100&d=https%3A%2F%2Funtappd.akamaized.net%2Fsite%2Fassets%2Fimages%2Fdefault_avatar_v3_gravatar.jpg%3Fv%3D2"/>
                                
                                                    <div className="dropdown-content">
                                                        <ul className="dropdown-list">
                                                            <Link className="dropdown-link" to="/">Recent Activity</Link>
                                                            <Link className="dropdown-link" to="/">Profile</Link>
                                                        </ul>
                                                    </div>
                                                    
                                                    <button
                                                    className="logout-btn"
                                                    onClick={e => {
                                                    e.preventDefault();
                                                    localStorage.removeItem("auth-token");
                                                    client.writeData({ data: { isLoggedIn: false } });
                                                    props.history.push("/");
                                                    }}
                                                    > Logout </button>
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <Link to="/login" className="nav-login"> Login </Link>
                                            );
                                        }
                                    }
                                }
                            </Query>
                        </div>
                    </nav>
                </div>
            )}
        </ApolloConsumer>
    );
};

export default Nav;