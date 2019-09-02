import React from "react";
// import gql from "graphql-tag";
import TacoIndex from './tacos/TacoIndex';
import { Route, HashRouter } from 'react-router-dom';
import Nav from './navbar/nav';

const App = () => {
  return (
      <HashRouter>
        <Route path="/" component={Nav} />
        <Route exact path="/" component={TacoIndex} />
      </HashRouter>
  );
};

export default App;
