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


export const FETCH_RESTAURANTS = gql`
  {
    restaurants {
      _id
      name
      description
      location
      tacos {
        name
      }
    }
  }
`
