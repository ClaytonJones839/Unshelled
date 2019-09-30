import React, { Component } from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
// import RestaurantCSS from "./RestaurantCSS.css"
// import { Link } from "react-router-dom";
// import { userInfo } from "os";
const mongoose = require('mongoose');
const User = mongoose.model("users")
const { FETCH_USERS, IS_LOGGED_IN } = Queries;

class RestaurantLikers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            likers: []
        }

    }


    render() {
        return (
            <Query query={IS_LOGGED_IN}>
                {({ loading, error, data }) => {
                     if (loading) return "Loading...";
                    if (error) return `Error! ${error.message}`;
                    return (
                        
            <div className="rest-show-right">
                <div className="rest-show-r-top">
                    <div className="rest-show-num-likes">
                        {this.state.likers.length}
                    </div>
                    <div className="rest-show-likes-text">
                        People Like This Restaurant
                    </div>
                </div>
                <div className="rest-show-r-mid">
                        <button
                            className="rest-show-like-btn"
                            onClick={(e) => {
                                e.preventDefault();
                                this.state.likers.push(data._id)
                            }}
                        >
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
                </div>
                </div>
                    )
                }}
                </Query>
        );
    }
}

export default RestaurantLikers;