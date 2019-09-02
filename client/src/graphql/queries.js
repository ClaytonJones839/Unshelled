import gql from "graphql-tag";


export const FETCH_TACOS = gql`
         {
           tacos {
             _id
             name
             description
             rating
             price
             restaurant {
               name
               description
             }
           }
         }
       `;

export const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `;

export const FETCH_RESTAURANTS = gql`

  {
    restaurants {
      _id
      name
      description
      location
      tacos {
        _id
        name
      }
    }
  }

  `;
  export const IS_LOGGED_IN = gql `
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `     
  
  export const FETCH_TACO = gql`
    query fetchTaco($id: ID!) {
      taco(_id: $id) {
        _id
        name
        style
        description
        rating
        price
        restaurant {
          _id
          name
          location
        }
      }
    }
    `
  


