import "../../UserProfile.scss";
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

                    let checkIns = [];
                    let uniqueCheckins = {};
                    checkIns = data.user.tacoCheckin.map(checkin => {
                        if (!uniqueCheckins[checkin.taco._id]) {
                            uniqueCheckins[checkin.taco._id] = true;
                        }
                    return (
                        <div 
                            id={checkin._id}
                            className="taco-checkin-box">
                            <img 
                                alt=""
                                className="profile-pic"
                                src={data.user.photo}>
                            </img>
                            <div className="checkin-info">
                                <div>{checkin.name}</div> is eating a 
                                <Link to={`/taco/${checkin.taco._id}`}> {checkin.taco.name}</Link> by
                                <Link to={`/restaurant/${checkin.taco.restaurant._id}`}> {checkin.taco.restaurant.name}</Link>
                            </div>
                            
                            <div className="description-and-rating">{checkin.description}</div>
                            <div className="taco-pic"></div>
                        </div>
                        )
                    }
                    );
                    return (
                        <div className="profile-container">
                            <div className="profile-header">
                                <img alt="" className="profile-img" src={data.user.photo}></img>
                                <div className="profile-info">
                                    
                                    <p>{data.user.firstName} {data.user.lastName}</p>
                                    <span>{data.user.username}</span>
                                    <div className="user-stats">
                                        <Link to={`/users/${data.user._id}`} className="user-stat">
                                            <span className="stat-count">{data.user.tacoCheckin.length}</span>
                                            <span className="stat-name">TOTAL</span>
                                        </Link>
                                        <Link to={`/users/${data.user._id}`} className="user-stat">
                                            <span className="stat-count">{Object.keys(uniqueCheckins).length}</span>
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
                                    {/* <div className="profile-activity-title">Your Recent Activity */}
                                        <div className="taco-activity-box">
                                            <div className="header">Your Recent Activity</div>
                                            <div className="activity-box">
                                            {checkIns}
                                            </div>
                                            <div className="footer">
                                            <button className="show-more">Show More</button>
                                            </div>
                                        </div>
                                    {/* </div> */}
                                </div>
    
 
                                {/* <div className="taco-activity-box">
                                    <div className="header">Global Recent Activity</div>
                                    <div className="activity-box">
                                    {checkIns}
                                    </div>
                                    <div className="footer">
                                    <button className="show-more">Show More</button>
                                    </div>
                                </div> */}

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