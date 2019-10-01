import React, { Component } from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import { Link } from "react-router-dom";
import TacoNew from '../tacos/TacoNew';
import ReviewNew from '../reviews/ReviewNew';
const { FETCH_RESTAURANT } = Queries;


class RestaurantShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
        addTaco: false,
        reviewArray: [],
        numLikes: 112,
        likeText: "Like This Restaurant",
        likeButtonClass: "rest-show-like-btn"
    };

    this.likeRestaurant = this.likeRestaurant.bind(this)
  } 


    likeRestaurant(e) {
      e.preventDefault();
      if (this.state.numLikes === 112) {
        this.setState({
          numLikes: 113, 
          likeButtonClass: "rest-show-unlike-btn",
          likeText: "Unlike This Restaurant"
        })
      } else {
        this.setState({
          numLikes: 112,
          likeButtonClass: "rest-show-like-btn",
          likeText: "Like This Restaurant"
        })
      }
    }

    render() {
      // debugger
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
                          <div 
                            key={`${taco.name}`}
                          className="rest-taco-item">
                            <img
                              alt=""
                              src={taco.photo}
                              className="rest-taco-photo"
                            ></img>
                            <Link
                              to={`/taco/${taco._id}`}
                              className="rest-taco-name"
                            >
                              {taco.name}
                            </Link>
                          </div>
                        );}
                      )}
                    </div>
                    else {
                      restTacos = <div></div>
                    }

                  // debugger
                  let reviewBodyArray = [];
                  if (data.restaurant.reviews) {
                    // debugger
                    data.restaurant.reviews.forEach(review => {
                      // debugger
                      if (review.body) {
                        reviewBodyArray.push(review)
                      }
                    })
                  }


                  // debugger
                  let reviewBody = reviewBodyArray.length > 0 ? reviewBodyArray.map((review) => {
                    if (review.user) {
                      // debugger

                      return (
                        <li className="review-body">
                          <div className="review-top">
                            <p className="review-name">{review.user.firstName} &nbsp;{review.user.lastName}</p>
                            <p className="review-rate">Rating: {review.rating}</p>
                          </div>  
                          <div className="review-bottom">
                            <p className="review-review">{review.body}</p>
                          </div>
                        </li>
                      );
                    } else {
                      return (
                        <li className="review-body">
                          <div className="review-top">
                            <p className="review-name">Anonymous User</p>
                            <p className="review-rate">Rating: {review.rating}</p>
                          </div>
                          <div className="review-bottom">
                            <p className="review-review">{review.body}</p>
                          </div>
                        </li>
                      );
                    }
                  }) : <p>Be the first to write a review!</p>
                  // debugger
                  // if (!reviewBodyArray || reviewBodyArray.length === 0) {
                  //   return (
                  //     reviewBody = <p>Be the first to write a written review!</p>
                  //   )
                  // }

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
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <p className="star-div"> ({reviewArray.length})</p>
                      </div>
                    );
                  } else if (reviewRating > 4.25) {
                    //4.5
                    stars = (
                      <div>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                        <p className="star-div"> ({reviewArray.length})</p>
                      </div>
                    );
                  } else if (reviewRating > 3.75) {
                    // 4
                    stars = (
                      <div>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                        <p className="star-div"> ({reviewArray.length})</p>
                      </div>
                    );
                  } else if (reviewRating > 3.25) {
                    //3.5
                    stars = (
                      <div>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                        <i className="far fa-star"></i>
                        <p className="star-div"> ({reviewArray.length})</p>
                      </div>
                    );
                  } else if (reviewRating > 2.75) {
                    // 3
                    stars = (
                      <div>    
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="far fa-star"></i>
                          <i className="far fa-star"></i>
                          <p className="star-div"> ({reviewArray.length})</p>
                      </div>
                    );
                  } else if (reviewRating > 2.25) {
                    //2.5
                    stars = (
                      <div>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <p className="star-div"> ({reviewArray.length})</p>
                      </div>
                    );
                  } else if (reviewRating > 1.75) {
                    // 2
                    stars = (
                      <div>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <p className="star-div"> ({reviewArray.length})</p>
                      </div>
                    );
                  } else if (reviewRating > 1.25) {
                    // 1.5
                    stars = (
                      <div>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <p className="star-div"> ({reviewArray.length})</p>
                      </div>
                    );
                  } else if (reviewRating > 0.75) {
                    // 1
                    stars = (
                      <div>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <p className="star-div"> ({reviewArray.length})</p>
                      </div>
                    );
                  } else if (reviewRating > 0) {
                    // 0.5
                    stars = (
                      <div>
                        <i className="fas fa-star-half-alt"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <p className="star-div"> ({reviewArray.length})</p>
                      </div>
                    );
                  } else {
                    // 0
                    stars = (
                      <div>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <p className="star-div"> ({reviewArray.length})</p>
                        <p className="star-rev">Be the first to review!</p>
                      </div>
                    );
                  } 
                  
                  
       
                    return (
                      <div className="rest-show-page">
                        <div className="rest-show-left">
                          <div className="rest-show-top">
                            <img
                              alt=""
                              className="rest-show-image"
                              src={data.restaurant.photo}
                            ></img>
                            <div className="rest-show-details">
                              <div className="rest-show-name">
                                {data.restaurant.name}
                              </div>
                              <a
                                href={data.restaurant.destinationLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <div className="rest-show-location">
                                  {data.restaurant.location}
                                </div>
                              </a>
                              {stars}
                            </div>
                          </div>

                          <div className="rest-show-bottom">
                            <div className="rest-show-bottom-left">
                              <div className="rest-show-desc">
                                {data.restaurant.description}
                              </div>
                              <ReviewNew
                                restaurantId={this.props.match.params.id}
                              />
                            </div>
                            <div className="rest-show-social">
                              <div className="social-top">
                                <a
                                  href={data.restaurant.facebookLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <i className="fab fa-facebook-f"></i>
                                </a>
                                <a
                                  href={data.restaurant.twitterLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <i className="fab fa-twitter"></i>
                                </a>
                                <a
                                  href={data.restaurant.instagramLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <i className="fab fa-instagram"></i>
                                </a>
                                <a
                                  href={data.restaurant.homepageLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <i className="fas fa-link"></i>
                                </a>
                              </div>
                              <div
                                className="add-taco-flex"
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
                          <div className="new-taco-container">{taco}</div>
                          <div className="rest-show-tacos">
                            <div className="rest-taco-feat">Featured Tacos</div>
                            {restTacos}
                          </div>
                          <div className="rest-show-tacos">
                            <div className="rest-taco-feat">Reviews</div>
                            <ul className='review-body-ul'>{reviewBody}</ul>
                          </div>
                        </div>
                        <div className="rest-show-right">
                          <div className="rest-show-r-top">
                            <div className="rest-show-num-likes">{this.state.numLikes}</div>
                            <div className="rest-show-likes-text">
                              People Like This Restaurant
                            </div>
                          </div>
                          <div className="rest-show-r-mid">
                            <button 
                              onClick={this.likeRestaurant}
                              className={this.state.likeButtonClass}>
                              {this.state.likeText}
                            </button>
                          </div>
                          <div className="rest-show-r-bottom">
                            <img
                              alt=""
                              src="http://s129178457.onlinehome.us/celebritieseating/uploaded_images/119-700469.jpg"
                              className="rest-show-like-image"
                            ></img>
                            <img
                              alt=""
                              src="https://pbs.twimg.com/media/CeTqmD3W8AAEsBc.jpg"
                              className="rest-show-like-image"
                            ></img>
                            <img
                              alt=""
                              src="https://food.fnr.sndimg.com/content/dam/images/food/fullset/2013/4/22/0/DV1701_Guy-Fieri-Tacos-and-Tots_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371614297393.jpeg"
                              className="rest-show-like-image"
                            ></img>
                            <img
                              alt=""
                              src="https://assets.dnainfo.com/generated/chicago_photo/2015/07/taco-dog-1436995610.png/larger.jpg"
                              className="rest-show-like-image"
                            ></img>
                            <img
                              alt=""
                              src="http://tacocleanse.com/wp-content/uploads/2015/05/chinese-taco.jpg"
                              className="rest-show-like-image"
                            ></img>
                            <img
                              alt=""
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW2AF6ZaSnVoDzrnarfVQRKuVsUZX2VTl3zAWdS9Dg2dSp2tG1Cw"
                              className="rest-show-like-image"
                            ></img>
                            <img
                              alt=""
                              src="http://blog.fuzzystacoshop.com/wp-content/uploads/2015/07/fuzzys_1631-300x200.jpg"
                              className="rest-show-like-image"
                            ></img>
                            <img
                              alt=""
                              src="https://www.ocregister.com/wp-content/uploads/2019/09/Rams-Cementing-Cornerstone-Football-1.jpg?w=552"
                              className="rest-show-like-image"
                            ></img>
                            <img
                              alt=""
                              src="https://i.pinimg.com/originals/ee/c3/db/eec3dbbadb5adfc8e18a8ef811cfe337.jpg"
                              className="rest-show-like-image"
                            ></img>
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

