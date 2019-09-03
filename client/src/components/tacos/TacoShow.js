import React, { Component } from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import "../../TacoShow.scss";
import { Link } from "react-router-dom";

class TacoShow extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        // debugger;
          return (
            // there we are getting the `id` for our query from React Router
            <Query query={Queries.FETCH_TACO} variables={{ id: this.props.match.params.id }}>
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error</p>;
                // debugger;
                return (
                  <div className="detail">
                    <div className="center-boxes">
                      <div className="taco-info-box">
                        {/* <div>{data.taco._id}</div> */}

                        <div className="header">
                          <div className="logo-box">Im logo</div>
                          <div className="taco-info">
                            <div className="taco-name">{data.taco.name}</div>
                            <div className="restaurant-name">{data.taco.restaurant.name}</div>
                            {/* <div className="taco-description">{data.taco.description}</div> */}
                            <div className="taco-style">{data.taco.style}</div>
                            <div className="taco-rating">{data.taco.rating}</div>
                            {/* <div className="taco-price">{data.taco.price}</div> */}
                            {/* <div>{data.taco.restaurant._id}</div> */}
                            {/* <div className="restaurant-location">{data.taco.restaurant.location}</div> */}
                          </div>
                          <div className="taco-check-ins">
                              <div className="total">TOTAL</div>
                              <div className="unique">UNIQUE</div>
                              <div className="monthly">MONTHLY</div>
                              <div className="you">YOU</div>
                          </div>
                        </div>
                        
                        <div className="info-bar">Info bar</div>
                        
                        <div className="description">Show more</div>
                      </div>

                      <div className="taco-pics">taco pics</div>

                      <div className="taco-activity-box">
                        <div className="header">Global Recent Activity</div>
                        <div className="activity-box">
                          activity box index goes here
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
            </Query>
        );
    }
}

export default TacoShow;

// id: props.match.params.id;