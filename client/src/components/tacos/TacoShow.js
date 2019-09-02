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
                        <div className="taco-name">{data.taco.name}</div>
                        <div className="taco-description">
                          {data.taco.description}
                        </div>
                        <div className="taco-style">{data.taco.style}</div>
                        <div className="taco-rating">{data.taco.rating}</div>
                        <div className="taco-price">{data.taco.price}</div>
                        {/* <div>{data.taco.restaurant._id}</div> */}
                        <div className="restaurant-name">
                          {data.taco.restaurant.name}
                        </div>
                        <div className="restaurant-location">
                          {data.taco.restaurant.location}
                        </div>
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
                        <Link to={`/taco/propose_edit/${data.taco._id}`}>Propose Edit</Link>
                        <Link to={`/taco/propose_dupe/${data.taco._id}`}>Propose Duplicate</Link>
                      </div>
                      <div className="taco-loyalists-box">taco loyalists</div>

                      <div className="similar-tacos-box">similar tacos</div>

                      <div className="nearby-locations-box">
                        nearby locations
                      </div>

                      <div className="popular-locations-box">
                        popular locations
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