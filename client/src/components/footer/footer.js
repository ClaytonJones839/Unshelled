import React from "react";
import { Link } from "react-router-dom";


class Footer extends React.Component {

    render() {
        
        return (
            <footer className="unshelled-footer">
                <div className="footer-nav">
                    <div className="footer-inner">
                        <ul className="footer-top">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/restaurants">Restaurants</Link>
                            </li>
                            <li>
                                <Link to="/tacos">Tacos</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <ul className="social">
                    <li>
                        <a href="https://github.com/ClaytonJones839/Unshelled">
                            <i className="fab fa-github"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.yelp.com/search?find_desc=Best+Tacos&find_loc=San+Jose%2C+CA">
                            <i className="fas fa-utensils"></i>
                        </a>
                    </li>

                </ul>
            </footer>
        )
    }
}

export default Footer;