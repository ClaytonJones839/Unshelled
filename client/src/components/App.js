import React from "react";
import { Route, HashRouter } from 'react-router-dom';
import TacoIndex from './tacos/TacoIndex';
import TacoNew from './tacos/TacoNew';
import Login from "./Login";
import Register from "./Register";
import RestuarantIndex from './restaurants/RestaurantIndex';
import RestuarantNew from "./restaurants/RestaurantNew";
import UserProfile from "./users/UserProfile";
import TacoShow from './tacos/TacoShow';

import { Route, HashRouter, Switch } from 'react-router-dom';

const App = () => {
  return (
      <HashRouter>
      <Route exact path="/restaurants" component={RestuarantIndex} />
        <Route path="/" component={Nav} />
        <Route exact path="/" component={TacoIndex} />
        <Route exact path="/new-restaurant" component={RestuarantNew} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      <Route exact path="/tacoshow/:id" component={TacoShow} />
      <Route exact path="/users/:id" component={UserProfile} />
      </HashRouter>
  );
};

export default App;
