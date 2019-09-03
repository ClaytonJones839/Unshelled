import gql from "graphql-tag";


export default {
  FETCH_TACOS: gql`
        {
          tacos {
            _id
            name
            description
            rating
            price
            restaurant {
              _id
              name
              description
            }
          }
        }
      `,
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
      id @client
    }

  `,


 FETCH_RESTAURANTS: gql`
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
  `,

  FETCH_RESTAURANT: gql`
    query fetchRestaurant($id: ID!) {
      restaurant(_id: $id) {
        _id
        name
        description
        rating
        location
        tacos {
          _id
          name
        }
      }
    }
    `,
  
  FETCH_TACO: gql`
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
    `,

  FETCH_USER: gql`
    query fetchUser($id: ID!) {
      user(_id: $id) {
        _id
        firstName
        lastName
        username
        email
      }
    }
  `
  
}

