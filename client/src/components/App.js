import React from "react";
import TacoIndex from './tacos/TacoIndex';
import TacoNew from './tacos/TacoNew';
import Login from "./sessions/Login";
import Register from "./sessions/Register";
import Nav from "./navbar/nav"
import AuthRoute from "./AuthRoute"
import RestaurantIndex from './restaurants/RestaurantIndex';
import RestaurantNew from "./restaurants/RestaurantNew";
import RestaurantShow from "./restaurants/RestaurantShow";
import UserProfile from "./users/UserProfile";
import TacoShow from './tacos/TacoShow';
import ProposeEdit from "./static_pages/ProposeEdit"
import ProposeDupe from "./static_pages/ProposeDupe"
import Home from './home/home';

import { Route, HashRouter } from 'react-router-dom';
import Footer from "./footer/footer";




const App = (props) => {
  return (
      <HashRouter>
        <Route exact path="/restaurants" component={RestaurantIndex} />
        <AuthRoute path="/" component={Nav} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/" component={RestaurantIndex} />
        <Route exact path="/tacos" component={TacoIndex} />
        <Route exact path="/newrestaurant" component={RestaurantNew} />
        <Route exact path="/restaurant/:id" component={RestaurantShow} />
        <Route exact path="/newtaco" component={TacoNew} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/taco/:id" component={TacoShow} />
        <Route exact path="/users/:id" component={UserProfile} />
        <Route exact path="/taco/propose_edit/:tacoid" component={ProposeEdit} />
        <Route exact path="/taco/propose_dupe/:tacoid" component={ProposeDupe} />
        <AuthRoute path="/" component={Footer} />
      </HashRouter>
  );
};

export default App;
