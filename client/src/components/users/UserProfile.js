import React from 'react';
import { Query } from 'react-apollo';
import Queries from '../../graphql/queries';
import { Link } from 'react-router-dom';
const {FETCH_USER} = Queries;

class UserProfile extends React.Component {
   

    render() {
        return (
            <Query query={FETCH_USER} variables={{ id: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error</p>;
                    console.log(data);
                    return (
                        <div className="profile-container">
                            <div className="profile-header">
                                <img className="profile-img" src={data.user.photo}></img>
                                <div className="profile-info">
                                    
                                    <p>{data.user.firstName} {data.user.lastName}</p>
                                    <span>{data.user.username}</span>
                                    <div className="user-stats">
                                        <Link to={`/users/${data.user._id}`} className="user-stat">
                                            <span className="stat-count">0</span>
                                            <span className="stat-name">TOTAL</span>
                                        </Link>
                                        <Link to={`/users/${data.user._id}`} className="user-stat">
                                            <span className="stat-count">0</span>
                                            <span className="stat-name">UNIQUE</span>
                                        </Link>
                                        <Link to={`/users/${data.user._id}`} className="user-stat">
                                            <span className="stat-count">0</span>
                                            <span className="stat-name">BADGES</span>
                                        </Link>
                                        <Link to={`/users/${data.user._id}`} className="user-stat">
                                            <span className="stat-count">0</span>
                                            <span className="stat-name">FRIENDS</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="profile-main">
                                <div className="profile-activity">
                                    <div className="profile-activity-title">Your Recent Activity</div>
                                </div>

                                <div className="profile-sidebar">
                                    <div className="profile-sidebar-item">
                                        <p>Lists</p>
                                    </div>
                                    <div className="profile-sidebar-item">
                                        <p>Your Events</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </Query>
        )
    }
}

export default UserProfile;