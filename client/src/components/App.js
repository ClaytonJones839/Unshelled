import React, { Component } from "react";
import gql from "graphql-tag";
import TacoIndex from './tacos/TacoIndex';
import Login from "./Login";
import Register from "./Register";
import RestuarantIndex from './restaurants/RestaurantIndex';
import { Route, HashRouter, Switch } from 'react-router-dom';

const App = () => {
  return (
      <HashRouter>
        <Route exact path="/" component={RestuarantIndex} />
        <Route exact path="/" component={TacoIndex} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </HashRouter>
  );
};

export default App;
