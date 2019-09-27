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
          <div className="taco-index-right">
        <ul className="taco-index-list">
            {data.tacos.map((taco, i) => {
              
              let rating;
              if (taco.rating) {
                rating = <li key={`${taco.name}`}>Rating: {taco.rating} / 5</li>;
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
                Top Restaurants
                <div className="top-rest-border"></div>
              </div>
              <TopRestaurants />
            </div>
        </div>
        );
      }}

</Query>
)} }



export default withRouter(TacoIndex)
