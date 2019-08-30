import React from 'react';
import Queries from '../../graphql/queries';
import { Link, withRouter } from "react-router-dom";
import { ApolloConsumer } from "react-apollo";
import { Query } from 'react-apollo';

const TacoIndex = props => {
        return(
            <div>
            <Query query={Queries.FETCH_TACOS}>
                {({ loading, error, data }) => {
                    if (loading) return "Loading...";
                    if (error) return `Error! ${error.message}`;
                  // debugger
                    return (
                        <ul>
                            {data.tacos.map(taco => (
                                <li key={taco._id}>{taco.name}</li>
                            ))}
                        </ul>
                    );
                }}
            </Query>
            {/* Just putting this here for testing purposes */}
            <ApolloConsumer>
                {client => (
                    <Query query={Queries.IS_LOGGED_IN}>
                        {({ data }) => {
                            if (data.isLoggedIn) {
                                return (
                                    <div>
                                        <button
                                            onClick={e => {
                                                e.preventDefault();
                                                localStorage.removeItem("auth-token");
                                                client.writeData({ data: { isLoggedIn: false } });
                                                props.history.push("/");
                                            }}
                                        >
                                            Logout
                                    </button>
                                    </div>
                                );
                            } else {
                                return (
                                    <div>
                                        <Link to="/login">Login</Link>
                                        <Link to="/register">Register</Link>
                                    </div>
                                );
                            }
                        }}
                    </Query>
                )}
            </ApolloConsumer>
            </div>
        )
    }


export default withRouter(TacoIndex);
