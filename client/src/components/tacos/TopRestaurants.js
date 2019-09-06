import React from "react";
import Queries from "../../graphql/queries";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
// import TopRestaurantsCSS from "./"
const { FETCH_RESTAURANTS } = Queries;

class TopRestaurants extends React.Component {
    render() {
        return (
            <Query query={FETCH_RESTAURANTS}>
                {({ loading, error, data }) => {
                    if (loading) return "Loading...";
                    if (error) return `Error! ${error.message}`;
                    return (
                        <div className="top-rest-container">
                            <ul className="top-rest-list">
                                {data.restaurants.map((restaurant, i) => {
                                    // let tacos = restaurant.tacos.map(taco => (
                                    //     <Link
                                    //         className="rest-taco-link"
                                    //         to={`/taco/${taco._id}`}>
                                    //         {taco.name}
                                    //     </Link>
                                    // ))
                                    return (
                                      <div className="top-index-item">
                                        <img
                                          className="top-index-image"
                                          alt=""
                                          src={restaurant.photo}
                                        ></img>
                                        <div className="top-index-details">
                                          <Link
                                            to={`/restaurant/${restaurant._id}`}
                                            className="top-item-name"
                                          >
                                            {restaurant.name}
                                          </Link>
                                          <div className="top-item-loc">
                                            {restaurant.location}
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
        );
    }
}

export default TopRestaurants;