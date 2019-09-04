import React, { Component } from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import RestaurantCSS from "./RestaurantCSS.css"
import TacoNew from '../tacos/TacoNew';
const { FETCH_RESTAURANT } = Queries;


class RestaurantShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
        addTaco: false
    };
  } 

    render() {
      return (
        <Query query={FETCH_RESTAURANT} variables={{ id: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                  if (loading) return <p>Loading...</p>;
                  if (error) return <p>Error</p>;

                  let taco;
                  if (this.state.addTaco) {
                    taco = <TacoNew restaurantId={this.props.match.params.id} />;
                  } else {
                    taco = <div></div>
                  }
                    return (
                      <div className="rest-show-page">
                        <div className="rest-show-left">
                          <div className="rest-show-top">
                            <img className="rest-show-image"
                              src={data.restaurant.photo}></img>
                            <div className="rest-show-details">
                              <div className="rest-show-name">{data.restaurant.name}</div>
                              <div className="rest-show-location">{data.restaurant.location}</div>
                              <div className="rest-show-rating">
                                ### restaurant rating? {data.restaurant.rating}</div>
                            </div>
                          </div>


                          <div className="rest-show-bottom">
                            <div className="rest-show-desc">{data.restaurant.description}</div>
                            <div className="rest-show-social">
                              <div className="social-top">
                                <i class='fab fa-facebook-f'></i>
                                <i class='fab fa-twitter'></i>
                                <i class='fab fa-instagram'></i>
                                <i class='fas fa-link'></i>
                              </div>
                              <div className="add-taco-flex"
                                  onClick={e => {
                                  e.preventDefault();
                                  this.setState({ addTaco: true });
                                }}
                              >
                                <div className="add-taco-btn">
                                  <h2 className="add-taco">Add A Taco</h2>
                                  <i className="fas fa-plus-circle"></i>
                                </div>
                              </div>
                          </div>
                            

                        </div>
                          <div className="new-taco-container">
                            {taco}
                          </div>
                          <div className="rest-show-tacos">
                          </div>
                        </div>




                        <div className="rest-show-right">
                            <div className="rest-show-r-top">
                                <div className="rest-show-num-likes">
                                    ###
                                </div>
                                <div className="rest-show-likes-text">
                                    People Like This Restaurant
                                </div>
                            </div>
                            <div className="rest-show-r-mid">
                                <button className="rest-show-like-btn">
                                    Like This Restaurant
                                </button>
                            </div>
                            <div className="rest-show-r-bottom">
                                <img src="https://cdn.shopify.com/s/files/1/2584/0356/products/taco_800x.jpg?v=1537876074" className="rest-show-like-image"></img>
                                <img src="https://cdn.shopify.com/s/files/1/2584/0356/products/taco_800x.jpg?v=1537876074" className="rest-show-like-image"></img>
                                <img src="https://cdn.shopify.com/s/files/1/2584/0356/products/taco_800x.jpg?v=1537876074" className="rest-show-like-image"></img>
                                <img src="https://cdn.shopify.com/s/files/1/2584/0356/products/taco_800x.jpg?v=1537876074" className="rest-show-like-image"></img>
                                <img src="https://cdn.shopify.com/s/files/1/2584/0356/products/taco_800x.jpg?v=1537876074" className="rest-show-like-image"></img>
                                <img src="https://cdn.shopify.com/s/files/1/2584/0356/products/taco_800x.jpg?v=1537876074" className="rest-show-like-image"></img>
                                <img src="https://cdn.shopify.com/s/files/1/2584/0356/products/taco_800x.jpg?v=1537876074" className="rest-show-like-image"></img>
                                <img src="https://cdn.shopify.com/s/files/1/2584/0356/products/taco_800x.jpg?v=1537876074" className="rest-show-like-image"></img>
                                <img src="https://cdn.shopify.com/s/files/1/2584/0356/products/taco_800x.jpg?v=1537876074" className="rest-show-like-image"></img>
                            </div>
                        </div>
                    </div>
                    );
                }}
            </Query>
        );
    }
}

export default RestaurantShow;

