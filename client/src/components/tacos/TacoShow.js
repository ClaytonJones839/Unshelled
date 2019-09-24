import "../../TacoShow.scss";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import Modal from "./TacoModal";
const { FETCH_TACO, IS_LOGGED_IN, FETCH_USER } = Queries;


class TacoShow extends Component {

    state = { show: false };

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };


    render() {

        return (
            <Query query={FETCH_TACO} variables={{ id: this.props.match.params.id }}>
            {({ loading: loadingOne, error, data }) => {
                if (loadingOne) return <p>Loading...</p>
                return (
                  <Query query={IS_LOGGED_IN}>
                    {({ loading: loadingTwo, error, data: rdata }) => {
                  if (loadingTwo) return <p>Loading...</p>;
                  if (error) return <p>Error</p>;
                
                return (
                <Query query={FETCH_USER} variables={{id: rdata._id}}>
                    {({ loading: loadingThree, error, data: udata }) => {
                if (loadingThree) return <p>Loading...</p>;
                if (error) return <p>Error</p>;
                            console.log("string", rdata);
                let tacoCheckins;
                tacoCheckins = data.taco.tacoCheckin.map((checkin) => {
                    return (
                        <div className="taco-checkin-box">
                            <img className="profile-pic"
                            src={checkin.user.photo}></img>
                            <div className="checkin-info">
                                <Link>{checkin.name}</Link> is eating a 
                                <Link to={`/tacoshow/${data.taco._id}`}> {data.taco.name}</Link> by
                                <Link to={`/restaurant/${data.taco.restaurant._id}`}> {data.taco.restaurant.name}</Link>
                            </div>
                            
                            <div className="description-and-rating">
                              <div class="speech-bubble">
                                {checkin.description}
                              </div>
                          </div>
                        </div>
                    )
                });
                let totalCheckins;
                totalCheckins = tacoCheckins.length; 
                
                let userCheckins;
                userCheckins = [];
                udata.user.tacoCheckin.forEach(checkin => {
                  if (checkin.taco._id === data.taco._id) {
                    userCheckins.push(checkin);
                  }
                });
                      
                let uniqueCheckins;
                uniqueCheckins = {};
                data.taco.tacoCheckin.forEach(checkin => {
                  if (!uniqueCheckins[checkin.user._id]) {
                    uniqueCheckins[checkin.user._id] = true;
                  }
                })

                return (
                    
                  <div className="detail">
                    <div className="center-boxes">
                      <div className="taco-info-box">

                        <div className="header">
                          <img className="logo-box"
                          src={data.taco.photo}></img>
                          <div className="taco-info">
                            <div className="taco-name">{data.taco.name}</div>
                            <Link to={`/restaurant/${data.taco.restaurant._id}`}>
                              <div className="restaurant-name">
                                {data.taco.restaurant.name}
                              </div>
                            </Link>
                            <div className="taco-style">{data.taco.style}</div>
                          </div>
                          <div className="taco-check-ins">
                            <div className="total">TOTAL
                              <div className="total-number">{totalCheckins}</div>
                            </div>
                            <div className="unique">UNIQUE
                              <div className="unique-number">{Object.keys(uniqueCheckins).length}</div>
                            </div>
                            <div className="monthly">MONTHLY
                              <div className="monthly-number">{totalCheckins}</div>
                            </div>
                            <div className="you">YOU
                              <div className="you-number">{userCheckins.length}</div>
                            </div>
                          </div>
                        </div>
                        <div className="info-bar">
                          <div className="rating">Avg rating: {data.taco.rating}</div>
                          <div className="total-ratings">Ratings</div>
                        </div>
                        <div className="description">
                          <div className="description-text">
                            Description: {data.taco.description}
                          </div>
                          <div className="taco-buttons">
                            <Modal tacoId={this.props.match.params.id} userId={rdata._id} show={this.state.show} handleClose={this.hideModal.bind(this)}>
                                
                            </Modal>
                            <button className="check-in" onClick={this.showModal}>✓</button>         
                            <button className="add-to-list">+</button>
                          </div>
                        </div>
                      </div>

                      <div className="taco-activity-box">
                        <div className="header">Global Recent Activity</div>
                        <div className="activity-box">
                          {tacoCheckins}
                        </div>
                        <div className="footer">
                          <button className="show-more">Show More</button>
                        </div>
                      </div>
                    </div>

                    <div className="right-boxes">
                      <div className="proposal-box">
                        <Link to={`/taco/propose_edit/${data.taco._id}`}>
                          Propose Edit
                        </Link>
                        <Link to={`/taco/propose_dupe/${data.taco._id}`}>
                          Propose Duplicate
                        </Link>
                      </div>
                      <div className="taco-loyalists-box">
                        <div className="header">Loyal Tacoists</div>
                        <div className="tacoists-index">
                          <div className="tacoist">Tacoist x12</div>
                        </div>
                      </div>

                      <div className="similar-tacos-box">
                        <div className="header">Similar Tacos</div>
                        <div className="similar-tacos-index">
                          <div className="similar-taco">A similar taco x5</div>
                        </div>
                      </div>

                      <div className="nearby-locations-box">
                        <div className="header">Nearby Verified Locations</div>
                        <div className="nearby-locations-index">
                          <div className="nearby-location">
                            Nearby Location x3
                          </div>
                        </div>
                      </div>

                      <div className="popular-locations-box">
                        <div className="header">Popular Locations</div>
                        <div className="popular-locations-index">
                          <div className="popular-location">
                            Popular Location x10
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
                        }}
                </Query>)      
    }}
            </Query>
        );
    }
            }
            </Query>
        );
    }
}

export default TacoShow;
