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
                        <div className="taco-index-page">
                            <div className="taco-index-right">
                                <ul className="taco-index-list">
                                    {data.tacos.map((taco, i) => {
                                        return (
                                            <div className="taco-index-item">
                                                <img src={taco.photo} className="taco-index-image"></img>
                                                <div className="taco-index-details">
                                                    <div className="taco-item-top">
                                                        <Link to={`/taco/${taco._id}`}
                                                            className="taco-item-name">{taco.name}</Link>
                                                        <Link to={`/restaurant/${taco.restaurant._id}`}
                                                            className="taco-item-rest">{taco.restaurant.name}</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    );
                }}

            </Query>
        )
    }
}



export default withRouter(TopTacos)