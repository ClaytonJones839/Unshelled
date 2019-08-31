import React from 'react';
// import { FETCH_TACOS } from '../../graphql/queries';
import Queries from "../../graphql/queries";
import { Query } from 'react-apollo';


class TacoIndex extends React.Component {

    render() {
        return(
            <Query query={Queries.FETCH_TACOS}>
                {({ loading, error, data }) => {
                    if (loading) return "Loading...";
                    if (error) return `Error! ${error.message}`;
                  // debugger
                    return (
                        <ul>
                            {data.tacos.map(taco => (
                                <li key={taco._id}>{taco.name}</li>
                            ))}
                        </ul>
                    );
                }}
            </Query>
        )
    }
}

export default TacoIndex;