import React from "react";
// import gql from "graphql-tag";
import TacoIndex from './tacos/TacoIndex';
import { Route, HashRouter } from 'react-router-dom';
import Nav from './navbar/nav';

const App = () => {
  return (
    <div>
      <h1>UNSHELLED</h1>
      <HashRouter>
        <Route exact path="/" component={TacoIndex} />
        <Route path="/" component={Nav} />
      </HashRouter>
    </div>
  );
};

export default App;
