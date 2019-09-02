import React, { Component } from "react";
import { Mutation } from "react-apollo";

import Mutations from "../../graphql/mutations";
const { NEW_TACO } = Mutations;

class TacoNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      style: "",
      price: 0,
      description: "",
      message: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(type) {
    return e => {
      this.setState({ [type]: e.target.value });
    };
  }

  handleSubmit(e, newTaco) {
    e.preventDefault();
    let name = this.state.name;

    // our newTaco function will accept an object with the key of "variables" pointing to an object with all our passed in variables.
    newTaco({
      variables: {
        name: name,
        style: this.state.style,
        price: this.state.price,
        description: this.state.description
      }
    })
      // after our mutation has run we want to reset our state and show our user the success message
      .then(data => {
        console.log(data);
        this.setState({
          message: `New taco "${name}" created successfully`,
          name: "",
          style: "",
          price: 0,
          description: ""
        });
      });
  }

  updateCache(
    cache,
    {
      data: { newTaco }
    }
  ) {
    let tacos;
    try {
      // we'll try to read from our cache but if the query isn't in there no sweat!
      // We only want to update the data if it's in the cache already - totally fine if the data will
      // be fetched fresh later
      tacos = cache.readQuery({ query: FETCH_TACOS });
    } catch (err) {
      return;
    }

    // then our writeQuery will only run IF the cache already has data in it
    if (tacos) {
      let tacoArray = tacos.tacos;

      cache.writeQuery({
        query: FETCH_TACOS,
        data: { tacos: tacoArray.concat(newTaco) }
      });
    }
  }


  render() {
    return (
      <Mutation
        mutation={NEW_TACO}
        update={(cache, data) => this.updateCache(cache, data)}
      >
        {(newTaco, { data })} => (
        <div>
          <form onSubmit={e => this.handleSubmit(e, newGod)}>
            <input
              onChange={this.update("name")}
              value={this.state.name}
              placeholder="Name"
            />
            <input
              onChange={this.update("style")}
              value={this.state.style}
              placeholder="Style"
            />
            <input
              type="number"
              onChange={this.update("style")}
              value={this.state.style}
              placeholder="Style"
            />
            <textarea
              value={this.state.description}
              onChange={this.update("description")}
              placeholder="description"
            />
            <button type="submit">Create Taco</button>
          </form>
          <p>{this.state.message}</p>
        </div>
        )
      </Mutation>
    );
  }


}




export default TacoNew;
