import React, { Component } from "react";
import gql from "graphql-tag";
import TacoIndex from './tacos/TacoIndex';
import RestuarantIndex from './restaurants/RestaurantIndex';
import { Route, HashRouter, Switch } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <h1>UNSHELLED</h1>
      <HashRouter>
        <Route path="/" component={RestuarantIndex} />
        <Route exact path="/" component={TacoIndex} />
      </HashRouter>
    </div>
  );
};

export default App;
