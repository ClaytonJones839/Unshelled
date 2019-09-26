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
import Home from './home/home';
// import ReviewNew from './reviews/ReviewNew';

import { Route, HashRouter, Switch } from 'react-router-dom';
import Footer from "./footer/footer";




const App = (props) => {
  return (
    <HashRouter>
      <AuthRoute exact path={["/", "/restaurants", "/tacos", "/restaurant/:id"]} component={Nav} />

      <Switch>
          <AuthRoute exact path="/" component={Home} />
          <AuthRoute path="/restaurants" component={RestaurantIndex} />
          <AuthRoute path="/tacos" component={TacoIndex} />
          <Route exact path="/newrestaurant" component={RestaurantNew} />
          <AuthRoute path="/restaurant/:id" component={RestaurantShow} />
          <Route exact path="/newtaco" component={TacoNew} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <AuthRoute path="/taco/:id" component={TacoShow} />
          <AuthRoute path="/users/:id" component={UserProfile} />
      </Switch>
      <AuthRoute path={["/", "/restaurants", "/tacos", "/restaurant/:id"]} component={Footer} />
    </HashRouter>
  );
};

export default App;
