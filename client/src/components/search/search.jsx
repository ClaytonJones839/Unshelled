import React from 'react';
import { Link } from 'react-router-dom';
import Queries from '../../graphql/queries';
import { Query } from 'react-apollo';
const { All_TACOS_SEARCH } = Queries;

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      results: []
    }

  }

  render() {
    return (
      <Query query={All_TACOS_SEARCH} variables={{ search: this.state.search}}>
        {
          ({ loading, error, data }) => {
            if (loading) return <p>Loading</p>;
            if (error) return <p>Error</p>;
            return (
              <div>
                <form>
                  <input
                    type="text"
                    onChange={ (e) => this.setState({search: e.target.value})}
                  />
                  <button type="submit">Search</button>

                </form>

                {this.state.results.map(result => <Link link={result}>{result.name}</Link>)}
              </div>
            )
          }
        }

      </Query>
    )
  }
}



export default Search;