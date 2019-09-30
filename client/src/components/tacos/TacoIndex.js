import React from 'react';

import Queries from '../../graphql/queries';
import { withRouter, Link } from "react-router-dom";
import { Query } from 'react-apollo';
import TopRestaurants from "./TopRestaurants"
const { FETCH_TACOS } = Queries;



class TacoIndex extends React.Component {

  render() {
    return(
      <Query query={FETCH_TACOS}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
      return (
        <div className="taco-index-page">
          <div className="taco-index-wrapper">
            <div className="taco-index-right">
              <h2 className="taco-label">The Best Tacos</h2>
          <ul className="taco-index-list">
              {data.tacos.map((taco) => {
                let avgRating = taco.tacoCheckin.map(checkin => checkin.rating).reduce((a,b) => a + b, 0)/ taco.tacoCheckin.length;

                let rating;
                if (avgRating) {
                  rating = <li key={`${taco.name}`}>Rating: {avgRating.toFixed(2)}</li>;
                } else {
                  rating = <li key={`${taco.name}`}>No Reviews Yet!</li>
                }

                let price;
                if (taco.price <= 2) {
                  price = <i className='fas fa-dollar-sign'></i>;
                } else if (taco.price <= 4) {
                  price = <div><i className='fas fa-dollar-sign'></i> <i className='fas fa-dollar-sign'></i></div>
                } else if (taco.price <= 6) {
                  price = <div><i className='fas fa-dollar-sign'></i> <i className='fas fa-dollar-sign'></i> <i className='fas fa-dollar-sign'></i></div>
                } else {
                  price = <div><i className='fas fa-dollar-sign'></i> <i className='fas fa-dollar-sign'></i> <i className='fas fa-dollar-sign'></i> <i className='fas fa-dollar-sign'></i></div>
                };

                return (
                  <div
                    key={`${taco.name}`}
                    className="taco-index-item">
                    <img 
                    alt=""
                    src={taco.photo}
                    className="taco-index-image">
                    </img>
                    <div className="taco-index-details">
                    <div className="taco-item-top">
                      <Link to={`/taco/${taco._id}`} 
                        className="taco-item-name">{taco.name}</Link>
                      <Link to={`/restaurant/${taco.restaurant._id}`}
                        className="taco-item-rest">{taco.restaurant.name}</Link>
                    </div>
                      <div className="taco-item-stats">
                        <div className="taco-item-desc">{taco.description}</div>
                        <div className="taco-item-stats-btn">
                          <div className="taco-index-rating">{rating}</div>
                          <div className="taco-index-price">{price}</div>
                        </div>
                      </div>
                  </div>

                  </div>
                );})}
            </ul>
              </div>
              <div className="taco-index-left">
                <div className="top-rest-text">
                  <h2>Top Restaurants</h2>
                  <div className="top-rest-border"></div>
                </div>
                <TopRestaurants />
              </div>

          </div>
        </div>
        );
      }}

</Query>
)} }



export default withRouter(TacoIndex)
