import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Query, ApolloConsumer } from 'react-apollo'
import Queries from "../../graphql/queries";
// import Search from '../search/search';

const { IS_LOGGED_IN } = Queries;

const Nav = (props) => {
    return (
        <ApolloConsumer>
            {client => {
                return (
                    <div className="navbar-container">
                        <nav className="navbar">
                            <div className="leftside-nav">
                                <div className="nav-logo">
                                    <Link to="/home" className="animated flipInY nav-logo-title">Unshelled</Link>
                                    <span className="animated fadeInLeftBig nav-logo-span ">Eat Socially</span>
                                </div>
                                <div className="navlink">
                                    <Link className="navlink-item" to="/restaurants">Restaurants</Link>
                                    <Link className="navlink-item" to="/tacos">Tacos</Link>
                                </div>
                            </div>
                            <Query query={IS_LOGGED_IN}>
                                {
                                    ({ loading, error, data }) => {
                                        if (loading) return <p>Loading</p>;
                                        if (error) return <p>Error</p>;
                                        if (data.isLoggedIn) {
                                            return (
                        
                                                <div className="rightside-nav">
                                                    <div className="nav-dropdown">
                                                        <img className="nav-avatar" src={data.photo} alt="" />

                                                        <div className="dropdown-content">
                                                            <ul className="dropdown-list">
                                                                <Link className="dropdown-link" to="/">Recent Activity</Link>
                                                                <Link className="dropdown-link" to={`/users/${data._id}`}>Profile</Link>
                                                                <div onClick={e => {
                                                                    e.preventDefault();
                                                                    localStorage.removeItem("auth-token");
                                                                    localStorage.removeItem("currentUserId");
                                                                    localStorage.removeItem("currentUserFName");
                                                                    localStorage.removeItem("currentUserLName");
                                                                    localStorage.removeItem("currentUserUsername");
                                                                    localStorage.removeItem("currentUserPhoto");
                                                                    client.writeData({ data: { isLoggedIn: false } });
                                                                    props.history.push("/");
                                                                }}>Logout</div>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                
                                                    <button
                                                        className="logout-btn"
                                                        onClick={e => {
                                                            e.preventDefault();
                                                            localStorage.removeItem("auth-token");
                                                            localStorage.removeItem("currentUserId");
                                                            localStorage.removeItem("currentUserFName");
                                                            localStorage.removeItem("currentUserLName");
                                                            localStorage.removeItem("currentUserUsername");
                                                            localStorage.removeItem("currentUserPhoto");
                                                            client.writeData({ data: { isLoggedIn: false } });
                                                            props.history.push("/login");
                                                        }}
                                                    > Logout </button>
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <div className="rightside-nav">
                                                    <Link to="/login" className="nav-login"> Login </Link>
                                                </div>
                                            );
                                        }
                                    }
                                }
                            </Query>
                        </nav>
                    </div>
                )}}
        </ApolloConsumer>
    );
    
};

export default withRouter(Nav);