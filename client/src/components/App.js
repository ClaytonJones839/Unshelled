import React, { Component } from "react";
import gql from "graphql-tag";
import TacoIndex from './tacos/TacoIndex';
import Login from "./Login";
import Register from "./Register";
import { Route, HashRouter, Switch } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <h1>UNSHELLED</h1>
      <HashRouter>
        <Route exact path="/" component={TacoIndex} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </HashRouter>
    </div>
  );
};

export default App;
