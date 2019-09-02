import React from 'react';
import Queries from '../../graphql/queries';
import { Link, withRouter } from "react-router-dom";
import { ApolloConsumer } from "react-apollo";
import { Query } from 'react-apollo';
import { FETCH_TACOS } from '../../graphql/queries'

class TacoIndex extends React.Component {

  render() {
    return(
      <Query query={FETCH_TACOS}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
    
      return (
        <ul>
            {data.tacos.map((taco, i) => {
              
              let rating;
              if (taco.rating) {
                rating = <li key={`${taco.rating}`}>Rating: {taco.rating} / 5</li>;
              } else {
                rating = <li>No Reviews Yet!</li>
              }

              let price;
              if (taco.price <= 2) {
                price = "$";
              } else if (taco.price <= 4) {
                price = "$$";
              } else if (taco.price <= 6) {
                price = "$$$"
              } else {
                price = "$$$$"
              };
              

              return (
                <div>
                  {/* <li key={taco._id}>
                  {taco._id}
                </li> */}
                  <li key={`${taco.name}`}>Name: {taco.name}</li>
                  <li key={`${taco.description}` + `${i}`}>
                    Description: {taco.description}
                  </li>
                  {rating}
                  <li>Price: {price}</li>
                  <li>Restaurant: {taco.restaurant.name}</li>
                  <br />
                </div>
              );})}
          </ul>
        );
    }}
</Query>
)} }



export default withRouter(TacoIndex)
