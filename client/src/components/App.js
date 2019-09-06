import React from "react";
import TacoIndex from './tacos/TacoIndex';
import TacoNew from './tacos/TacoNew';
import Login from "./Login";
import Register from "./Register";
import Nav from "./navbar/nav"
import AuthRoute from "./AuthRoute"
import RestaurantIndex from './restaurants/RestaurantIndex';
import RestaurantNew from "./restaurants/RestaurantNew";
import RestaurantShow from "./restaurants/RestaurantShow";
import UserProfile from "./users/UserProfile";
import TacoShow from './tacos/TacoShow';
// import ReviewNew from './reviews/ReviewNew';

import { Route, HashRouter } from 'react-router-dom';
import Footer from "./footer/footer";




const App = (props) => {
  return (
      <HashRouter>
        <Route exact path="/restaurants" component={RestaurantIndex} />
        <AuthRoute path="/" component={Nav} />
        <Route exact path="/" component={TacoIndex} />
        <Route exact path="/newrestaurant" component={RestaurantNew} />
        <Route exact path="/restaurant/:id" component={RestaurantShow} />
        <Route exact path="/newtaco" component={TacoNew} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/taco/:id" component={TacoShow} />
        <Route exact path="/users/:id" component={UserProfile} />
        <AuthRoute path="/" component={Footer} />
      </HashRouter>
  );
};

export default App;
