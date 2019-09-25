import React, { Component } from "react";
import { Mutation } from "react-apollo";
// import gql from "graphql-tag";

import Queries from "../../graphql/queries";

import Mutations from "../../graphql/mutations";

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


    newRestaurant({
      variables: {
        name: name,
        description: this.state.description,
        location: this.state.location
      }
    })
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

      restaurants = cache.readQuery({ query: Queries.FETCH_RESTAURANTS });
    } catch (err) {
      return;
    }

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
