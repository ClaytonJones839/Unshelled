import React, { Component } from "react";
import gql from "graphql-tag";
import TacoIndex from './tacos/TacoIndex';
import TacoShow from './tacos/TacoShow';
import { Route, HashRouter, Switch } from 'react-router-dom';


const App = () => {
  return (
    <div>
      <h1>UNSHELLED</h1>
      <HashRouter>
        <Route exact path="/" component={TacoIndex} />
        <Route exact path="/tacoshow/:id" component={TacoShow} />
      </HashRouter>
    </div>
  );
};

export default App;
