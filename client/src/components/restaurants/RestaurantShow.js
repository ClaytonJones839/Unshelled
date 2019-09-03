import React, { Component } from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
const { FETCH_RESTAURANT } = Queries;


class RestaurantShow extends Component {



    render() {
        return (
            <Query query={FETCH_RESTAURANT} variables={{ id: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error</p>;
                    return (
                        <div className="detail">
                            <div>{data.restaurant._id}</div>
                            <div>{data.restaurant.name}</div>
                            <div>{data.restaurant.description}</div>
                            <div>{data.restaurant.rating}</div>
                            <div>{data.restaurant.location}</div>
                            {/* <div>{data.restaurant.restaurant._id}</div>
                            <div>{data.restaurant.restaurant.name}</div>
                            <div>{data.restaurant.restaurant.location}</div> */}
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default RestaurantShow;

