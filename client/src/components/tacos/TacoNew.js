import React, { Component } from "react";
import { Mutation } from "react-apollo";
import TacoCSS from "./Taco.css";
import gql from "graphql-tag";
import Queries from "../../graphql/queries";
import Mutations from "../../graphql/mutations";
// import { FETCH_TACOS } from "../../graphql/queries";
const { FETCH_TACOS } = Queries;
const { NEW_TACO, UPDATE_REST_TACOS } = Mutations;

class TacoNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      style: "",
      price: 0,
      description: "",
      photo: "https://i.pinimg.com/474x/75/80/b0/7580b09940eed1450661b4856eac0c24.jpg",
      restaurantId: this.props.restaurantId,
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


    newTaco({
      variables: {
        name: name,
        style: this.state.style,
        price: parseInt(this.state.price),
        description: this.state.description,
        photo: this.state.photo,
        restaurantId: this.state.restaurantId
      }
    // }).then(data => {
    //   <Mutation 
    //     mutation={UPDATE_REST_TACOS}
    //     variables={
    //       {restaurantId: this.state.restaurantId, tacoId: data.taco._id }
    //     }
    //     >
    //     </Mutation>
    }) 
      .then(data => {
        this.setState({
          message: `New taco "${name}" created successfully`,
          name: "",
          style: "",
          photo: "https://i.pinimg.com/474x/75/80/b0/7580b09940eed1450661b4856eac0c24.jpg",
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
      tacos = cache.readQuery({ query: FETCH_TACOS });
    } catch (err) {
      return;
    }

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
        {(newTaco, { data }) => (
          <div className="new-taco-form">
            <div className="taco-form-text">
              New Taco
            </div>
            <form
              onSubmit={e => this.handleSubmit(e, newTaco)}
              className="inner-taco-form"
            >
              <input
                className="taco-form-input"
                onChange={this.update("name")}
                value={this.state.name}
                placeholder="Name"
              />
              <input
                className="taco-form-input"
                onChange={this.update("style")}
                value={this.state.style}
                placeholder="Style (Optional)"
              />
              <input
                className="taco-form-input"
                type="number"
                onChange={this.update("price")}
                value={this.state.price}
                placeholder="0"
              />
              <input
                className="taco-form-input"
                type="text"
                onChange={this.update("photo")}
                value={this.state.photo}
                placeholder="photo url"
              />
              <textarea
                className="taco-form-textarea"
                value={this.state.description}
                onChange={this.update("description")}
                placeholder="Description"
              />
              <button type="submit">Create Taco</button>
            </form>
            <p>{this.state.message}</p>
          </div>
        )}
      </Mutation>
    );
  }


}




export default TacoNew;
