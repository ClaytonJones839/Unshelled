import React from "react";
import Queries from "../../graphql/queries";
import { withRouter, Link } from "react-router-dom";
import { Query } from "react-apollo";
const { FETCH_RESTAURANTS } = Queries;

class RestaurantIndex extends React.Component {
  render() {
    return (
      <Query query={FETCH_RESTAURANTS}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return (
            <div className="rest-index-container">
              <ul className="rest-index-list">
                {data.restaurants.map((restaurant, i) => {
                  let tacos = restaurant.tacos.map(taco => (
                    <Link 
                      className="rest-taco-link"
                      to={`/tacoshow/${taco._id}`}>
                      {taco.name}
                    </Link>
                  ))
                return (
                  <div className="rest-index-item">
                    <div className="rest-item-top2">
                      <img className="rest-index-image"
                        src={restaurant.photo}></img>
                      <div className="rest-index-details">
                          <Link to={`/restaurant/${restaurant._id}`}
                            className="rest-item-name">{restaurant.name}</Link>
                      <div className="rest-item-loc">{restaurant.location}</div>
                      <div className="rest-item-desc">{restaurant.description}</div>
                      </div>
                    </div>
                    <div className="rest-item-bottom2">
                      <div className="rest-item-tacos">Featured Tacos: </div>
                      <ul className="rest-item-taco-list">
                        {tacos}
                      </ul>
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

export default RestaurantIndex;
