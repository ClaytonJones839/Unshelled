import React from 'react';

import Queries from '../../graphql/queries';
import { withRouter, Link } from "react-router-dom";
import { Query } from 'react-apollo';
const { FETCH_TACOS } = Queries;



class TopTacos extends React.Component {

    render() {
        return (
            <Query query={FETCH_TACOS}>
                {({ loading, error, data }) => {
                    if (loading) return "Loading...";
                    if (error) return `Error! ${error.message}`;

                    return (
                            <div className="top-taco">
                                <ul className="top-taco-list">
                                <h2>Top Tacos</h2>
                                <div className="top-rest-border"></div>
                                    {data.tacos.map((taco, i) => {
                                        return (
                                            <div 
                                                key={`${taco.name}`}
                                            className="top-taco-item">
                                                <img alt="" src={taco.photo} className="top-taco-image"></img>
                                                <div className="top-taco-details">
                                                    <div className="top-taco-top">
                                                        <Link to={`/taco/${taco._id}`}
                                                            className="top-taco-name">{taco.name}</Link>
                                                        <Link to={`/restaurant/${taco.restaurant._id}`}
                                                            className="top-taco-rest">{taco.restaurant.name}</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </ul>
                            </div>
                    );
                }}

            </Query>
        )
    }
}



export default withRouter(TopTacos)