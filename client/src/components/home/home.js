import React from 'react';
import { Query } from 'react-apollo';
import Queries from '../../graphql/queries';
import { Link } from 'react-router-dom';
const { IS_LOGGED_IN } = Queries;

class Home extends React.Component {

    render() {
        return (
            <Query query={IS_LOGGED_IN} >
                {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error</p>;

                    return (
                      <div className="homepage">
                        <div className="home-left">
                          <div className="recent-activity">
                            <h3>Recent Friend Activity</h3>
                            <div className="activity-content">
                              <p className="no-activity">
                                You don't seem to have any recent activity.
                              </p>
                              <p className="no-activity">
                                Get out there and eat some tacos!
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="home-right">
                          <div className="home-profile">
                            <div className="user-info">
                              <div className="user-avatar">
                                <Link to={`/users/${data._id}`}>
                                  <img alt="" src={data.photo}></img>
                                </Link>
                              </div>
                              <div className="info">
                                <h2>{data.firstName + " " + data.lastName}</h2>
                                <p>{data.username}</p>
                              </div>
                            </div>
                            <div className="prof-stats">
                              <div className="total">
                                <span className="stat">Count</span>
                                <span className="title">Total</span>
                              </div>
                              <div className="unique">
                                <span className="stat">Count</span>
                                <span className="title">Unique</span>
                              </div>
                              <div className="badges">
                                <span className="stat">0</span>
                                <span className="title">Badges</span>
                              </div>
                              <div className="friends">
                                <span className="stat">0</span>
                                <span className="title">Friends</span>
                              </div>
                            </div>
                          </div>
                          <div className="home-lists">
                            <h3>Lists</h3>
                          </div>
                        </div>
                      </div>
                    );
                }}

            </Query>
        )
    }
}

export default Home;