import React from "react";
import { FETCH_RESTAURANTS } from "../../graphql/queries";
import { Query } from "react-apollo";

class RestaurantIndex extends React.Component {
  render() {
    return (
      <Query query={FETCH_RESTAURANTS}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          // debugger;
          return (
            <ul>
              {data.restaurants.map((restaurant, i) => {
                let tacos = restaurant.tacos.map(taco => (
                  <li>
                    {taco.name}
                  </li>
                ))
                return (
                  <div>
                    {/* <li key={taco._id}>
                  {taco._id}
                </li> */}
                    <li key={`${restaurant.name}`}>Name: {restaurant.name}</li>
                    <li key={`${restaurant.description}` + `${i}`}>
                      Description: {restaurant.description}
                    </li>
                    {/* <li>
                      Tacos: {restaurant.tacos}
                    </li> */}
                    <li>Featured Tacos: </li>
                    <ul>
                      {tacos}
                    </ul>
                    <br />
                  </div>
                );
              })}
            </ul>
          );
        }}
      </Query>
    );
  }
}

export default RestaurantIndex;
