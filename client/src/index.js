import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import Mutations from "./graphql/mutations";
// import { persistCache } from 'apollo-cache-persist';
// import AsyncStorage from '@react-native-community/async-storage';

import "./css/loader.css";

const cache = new InMemoryCache({
  dataIdFromObject: object => object._id || null
});


let uri;
if (process.env.NODE_ENV === "production") {
  uri = `/graphql`;
} else {
  uri = "http://localhost:5000/graphql";
}

const httpLink = createHttpLink({
  uri,
  headers: {
    // heroku can get a little buggy with headers and
    // localStorage so we'll just ensure a value is always in the header
    authorization: localStorage.getItem("auth-token") || ""
  }
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});


const { VERIFY_USER } = Mutations;

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache,
  resolvers: {},
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  },
  connectToDevTools: true
});

const token = localStorage.getItem("auth-token");

// to avoid components async problems where
// a component would try to read the cache's value of isLoggedIn
// before our mutation goes through we can set it up here
cache.writeData({
  data: {
    _id: localStorage.getItem("currentUserId"),
    isLoggedIn: token ? true : false,
    firstName: localStorage.getItem("currentUserFName"),
    lastName: localStorage.getItem("currentUserLName"),
    photo: localStorage.getItem("currentUserPhoto"),
    username: localStorage.getItem("currentUserUsername"),
  }
});

// then if we do have a token we'll go through with our mutation
if (token) {
  client
    // use the VERIFY_USER mutation directly use the returned data to know if the returned
    // user is loggedIn
    .mutate({ mutation: VERIFY_USER, variables: { token } })
    .then(({ data }) => {
      cache.writeData({
        data: {
          _id: data.verifyUser._id,
          isLoggedIn: data.verifyUser.isLoggedIn,
          firstName: data.verifyUser.firstName,
          lastName: data.verifyUser.lastName,
          photo: data.verifyUser.photo,
          username: data.verifyUser.username,
        }
      });
    });
   
} else {
  // otherwise we can just set isLoggedIn to false
  cache.writeData({
    data: {
      isLoggedIn: false,
      _id: null,
      firstName: "",
      lastName: "",
      photo: "",
      username:"",
      tacoCheckin: ""
    }
  });
}

const Root = () => {
   
  // const isLoggedIn = client.cache.data.data.ROOT_QUERY.lastName;
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

