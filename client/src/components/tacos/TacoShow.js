import React, { Component } from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";


class TacoShow extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        debugger;
          return (
            // there we are getting the `id` for our query from React Router
            <Query query={Queries.FETCH_TACO} variables={{ id: this.props.match.params.id }}>
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error</p>;
                // debugger;

                return (
                <div className="detail">
                    hello
                </div>
                );
            }}
            </Query>
        );
    }
}

export default TacoShow;

// id: props.match.params.id;