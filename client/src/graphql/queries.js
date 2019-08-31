import gql from "graphql-tag";

export default {
  FETCH_TACOS: gql`
  query fetchTacos {
    tacos {
      _id
      name
    }
  }
  `,
  
  FETCH_TACO: gql`
    query fetchTaco($id: ID!) {
      taco(id: $id) {
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
  
}
