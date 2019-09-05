import React from "react";
import Queries from "../../graphql/queries";
import { withRouter, Link } from "react-router-dom";
import { Query } from "react-apollo";
import TopTacos from "./TopTacos"
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
            <div className="rest-index-right">
              <ul className="rest-index-list">
                {data.restaurants.map((restaurant, i) => {
            // debugger


                  let reviewArray = [];
                  let reviewSum;
                  let reviewRating;
                  if (restaurant.reviews) {
                    restaurant.reviews.forEach(review => {
                      // debugger
                      reviewArray.push(review.rating);
                    });
                    reviewSum = reviewArray.reduce((a, b) => a + b, 0);
                    reviewRating = reviewSum / reviewArray.length;
                  } else {
                    reviewRating = <div></div>;
                  }

                  let stars;
                  if (reviewRating > 4.75) {
                    // 5
                    stars = (
                      <div>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                      </div>
                    );
                  } else if (reviewRating > 4.25) {
                    //4.5
                    stars = (
                      <div>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                      </div>
                    );
                  } else if (reviewRating > 3.75) {
                    // 4
                    stars = (
                      <div>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="far fa-star"></i>
                      </div>
                    );
                  } else if (reviewRating > 3.25) {
                    //3.5
                    stars = (
                      <div>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                        <i class="far fa-star"></i>
                      </div>
                    );
                  } else if (reviewRating > 2.75) {
                    // 3
                    stars = (
                      <div>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                      </div>
                    );
                  } else if (reviewRating > 2.25) {
                    //2.5
                    stars = (
                      <div>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                      </div>
                    );
                  } else if (reviewRating > 1.75) {
                    // 2
                    stars = (
                      <div>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                      </div>
                    );
                  } else if (reviewRating > 1.25) {
                    // 1.5
                    stars = (
                      <div>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                      </div>
                    );
                  } else if (reviewRating > 0.75) {
                    // 1
                    stars = (
                      <div>
                        <i class="fas fa-star"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                      </div>
                    );
                  } else if (reviewRating > 0) {
                    // 0.5
                    stars = (
                      <div>
                        <i class="fas fa-star-half-alt"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                      </div>
                    );
                  } else {
                    // 0
                    stars = (
                      <div>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                        <p className="star-rev">Be the first to review!</p>
                      </div>
                    );
                  } 










                  let tacos = restaurant.tacos.map(taco => (
                    <Link 
                      className="rest-taco-link"
                      to={`/taco/${taco._id}`}>
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
                      {stars}
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
            <div className="rest-index-left">
              <TopTacos />
            </div>
            </div>
          );
        }}

      </Query>
    );
  }
}

export default RestaurantIndex;
