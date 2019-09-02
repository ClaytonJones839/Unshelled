import React from 'react';
import { Query } from 'react-apollo';
import Queries from '../../graphql/queries';
const { FETCH_TACOS } = Queries;

class TacoIndex extends React.Component {

    render() {
        return(
            <Query query={FETCH_TACOS}>
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