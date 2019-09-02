import React from "react";
// import gql from "graphql-tag";
import TacoIndex from './tacos/TacoIndex';
import { Route, HashRouter } from 'react-router-dom';
import Nav from './navbar/nav';
import Login from "./Login";
import Register from "./Register";
import RestuarantIndex from './restaurants/RestaurantIndex';
import TacoShow from './tacos/TacoShow';
import { Route, HashRouter, Switch } from 'react-router-dom';


const App = () => {
  return (
      <HashRouter>
        <Route exact path="/restaurants" component={RestuarantIndex} />
        <Route path="/" component={Nav} />
        <Route exact path="/" component={TacoIndex} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/tacoshow/:id" component={TacoShow} />
      </HashRouter>
  );
};

export default App;
