import gql from "graphql-tag";

  export default {
    FETCH_TACOS: gql`
    {
      tacos {
        _id
        name
      }
    }`, 
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `
  };
