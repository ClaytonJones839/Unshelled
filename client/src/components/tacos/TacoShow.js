import React, { Component } from "react";
import { Query } from "react-apollo";
// import Queries from "../../graphql/queries";
import { FETCH_TACO } from "../../graphql/queries";


class TacoShow extends Component {

   

    render() {
        // debugger;
          return (
            // there we are getting the `id` for our query from React Router
            <Query query={FETCH_TACO} variables={{ id: this.props.match.params.id }}>
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error</p>;
                // debugger;
                return (
                  <div className="detail">
                    hello im a taco
                    <div>{data.taco._id}</div>
                    <div>{data.taco.name}</div>
                    <div>{data.taco.description}</div>
                    <div>{data.taco.style}</div>
                    <div>{data.taco.rating}</div>
                    <div>{data.taco.price}</div>
                    <div>{data.taco.restaurant._id}</div>
                    <div>{data.taco.restaurant.name}</div>
                    <div>{data.taco.restaurant.location}</div>
                  </div>
                );
            }}
            </Query>
        );
    }
}

export default TacoShow;

// id: props.match.params.id;