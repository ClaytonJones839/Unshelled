import React, { Component } from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import RestaurantCSS from "./RestaurantCSS.css"
import TacoNew from '../tacos/TacoNew';
const { FETCH_RESTAURANT } = Queries;


class RestaurantShow extends Component {

    render() {
      return (
        <Query query={FETCH_RESTAURANT} variables={{ id: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                  if (loading) return <p>Loading...</p>;
                  if (error) return <p>Error</p>;
                  // debugger
                    return (
                      <div>
                        <div className="rest-show-page">
                          <div className="rest-show-top">
                            <img
                              className="rest-show-image"
                              src="https://i.redd.it/l85uj6f0hfa01.jpg"
                            ></img>
                            <div className="rest-show-details">
                              <div className="rest-show-name">
                                {data.restaurant.name}
                              </div>
                              <div className="rest-show-location">
                                {data.restaurant.location}
                              </div>
                              <div className="rest-show-rating">
                                ### resturant rating? {data.restaurant.rating}
                              </div>
                            </div>
                          </div>
                          <div className="rest-show-bottom">
                            <div className="rest-show-desc">
                              {data.restaurant.description}
                            </div>
                            <div className="rest-show-social">
                              <i className="fab fa-facebook-f"></i>
                              <i className="fab fa-twitter"></i>
                              <i className="fab fa-instagram"></i>
                              <i className="fas fa-link"></i>
                            </div>
                          </div>
                          <div className="add-taco-btn">
                              <h2>Add A Taco</h2>
                              <i className="fas fa-plus-circle"></i>
                          </div>
                        </div>
                        <TacoNew restaurantId={this.props.match.params.id} />
                      </div>
                    );
                }}
            </Query>
        );
    }
}

export default RestaurantShow;

