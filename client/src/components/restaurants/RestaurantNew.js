import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import Queries from "../../graphql/queries";

import Mutations from "../../graphql/mutations";
// import { FETCH_RESTAURANTS } from "../../graphql/queries";

const { NEW_RESTAURANT } = Mutations;

class RestaurantNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      location: "",
      message: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(type) {
    return e => {
      this.setState({ [type]: e.target.value });
    };
  }

  handleSubmit(e, newRestaurant) {
    e.preventDefault();
    let name = this.state.name;

    // our newRestaurant function will accept an object with the key of "variables" pointing to an object with all our passed in variables.
    newRestaurant({
      variables: {
        name: name,
        description: this.state.description,
        location: this.state.location
      }
    })
      // after our mutation has run we want to reset our state and show our user the success message
      .then(data => {
        this.setState({
          message: `New restaurant "${name}" created successfully`,
          name: "",
          description: "",
          location: ""
        });
      });
  }

  updateCache(
    cache,
    {
      data: { newRestaurant }
    }
  ) {
    let restaurants;
    try {
      // we'll try to read from our cache but if the query isn't in there no sweat!
      // We only want to update the data if it's in the cache already - totally fine if the data will
      // be fetched fresh later
      restaurants = cache.readQuery({ query: Queries.FETCH_RESTAURANTS });
    } catch (err) {
      return;
    }

    // then our writeQuery will only run IF the cache already has data in it
    if (restaurants) {
      let restaurantArray = restaurants.restaurants;

      cache.writeQuery({
        query: Queries.FETCH_RESTAURANTS,
        data: { restaurants: restaurantArray.concat(newRestaurant) }
      });
    }
  }

  render() {
    return (
      <Mutation
        mutation={NEW_RESTAURANT}
        update={(cache, data) => this.updateCache(cache, data)}
      >
        {(newRestaurant, { data }) => (
          <div>
            <form onSubmit={e => this.handleSubmit(e, newRestaurant)}>
              <input
                onChange={this.update("name")}
                value={this.state.name}
                placeholder="Name"
              />
              <input
                onChange={this.update("location")}
                value={this.state.location}
                placeholder="Location"
              />
              <textarea
                value={this.state.description}
                onChange={this.update("description")}
                placeholder="Description"
              />
              <button type="submit">Create Restaurant</button>
            </form>
            <p>{this.state.message}</p>
          </div>
        )}
      </Mutation>
    );
  }
}

export default RestaurantNew;
