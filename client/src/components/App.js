import React from "react";
// import gql from "graphql-tag";
import { Route, HashRouter } from 'react-router-dom';
import TacoIndex from './tacos/TacoIndex';
import Nav from './navbar/nav';
import Login from "./Login";
import Register from "./Register";
import RestuarantIndex from './restaurants/RestaurantIndex';
import TacoShow from './tacos/TacoShow';
import UserProfile from "./users/UserProfile";

const App = () => {
  return (
      <HashRouter>
        <Route path="/" component={Nav} />
        <Route exact path="/" component={RestuarantIndex} />
        <Route exact path="/" component={TacoIndex} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      <Route exact path="/tacoshow/:id" component={TacoShow} />
      <Route exact path="/users/:id" component={UserProfile} />
      </HashRouter>
  );
};

export default App;
