import React, { Component } from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import RestaurantCSS from "./RestaurantCSS.css"
import { Link } from "react-router-dom";
import TacoNew from '../tacos/TacoNew';
import ReviewNew from '../reviews/ReviewNew';
const { FETCH_RESTAURANT } = Queries;


class RestaurantShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
        addTaco: false,
        reviewArray: []
    };
  } 

    render() {
      return (
        <Query query={FETCH_RESTAURANT} variables={{ id: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                  if (loading) return <p>Loading...</p>;
                  if (error) return <p>Error</p>;
                  
                  let restTacos;
                  if (data.restaurant.tacos) 
                    restTacos = <div className="rest-taco-list"> 
                      {data.restaurant.tacos.map((taco) => {
                        return (
                          <div className="rest-taco-item">
                            <img 
                              src={taco.photo}
                              className="rest-taco-photo"></img>
                            <Link 
                              to={`/taco/${taco._id}`}
                              className="rest-taco-name">
                              {taco.name}
                            </Link>
                          </div>
                        )}
                      )}
                    </div>
                    else {
                      restTacos = <div></div>
                    }

                  let taco;
                  if (this.state.addTaco) {
                    taco = <TacoNew restaurantId={this.props.match.params.id} />;
                  } else {
                    taco = <div></div>
                  }
                  let reviewArray = [];
                  let reviewSum;
                  let reviewRating;
                  if (data.restaurant.reviews) {
                    data.restaurant.reviews.forEach(review => {
                      reviewArray.push(review.rating)
                    }
                    );
                    reviewSum = reviewArray.reduce((a, b) => a + b, 0);
                    reviewRating = reviewSum / reviewArray.length;
                  } else {
                    reviewRating = <div>0</div>
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
                  
                  
       
                    return (
                      <div className="rest-show-page">
                        <div className="rest-show-left">
                          <div className="rest-show-top">
                            <img className="rest-show-image"
                              src={data.restaurant.photo}></img>
                            <div className="rest-show-details">
                              <div className="rest-show-name">{data.restaurant.name}</div>
                              <div className="rest-show-location">{data.restaurant.location}</div>
                              {/* <div className="rest-show-rating">
                                Rating: {reviewRating}</div> */}
                              {stars}
                            </div>
                          </div>


                          <div className="rest-show-bottom">
                            <div className="rest-show-bottom-left">
                              <div className="rest-show-desc">{data.restaurant.description}</div>
                              <ReviewNew restaurantId={this.props.match.params.id} />
                            </div>
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
                                  if (this.state.addTaco) {
                                    this.setState({ addTaco: false });
                                  } else {
                                    this.setState({ addTaco: true });
                                  }

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
                            <div className="rest-taco-feat">
                              Featured Tacos
                            </div>
                            {restTacos}
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

