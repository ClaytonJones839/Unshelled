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
            photo
            restaurant {
              _id
              name
              description
            }
          tacoCheckin {
            _id
            name
            restaurant
            description
            rating
          }
          
            
          }
        }
      `,
  
  // FETCH_TACO_CHECKINS: gql`
    
  //     query fetchTacoCheckins($id: ID!) {
  //       tacoCheckins(_id: $id) {
  //         _id
  //         name
  //         description
  //         rating
  //       }
  //     }
    
  // `,

  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
      _id @client
      photo @client
      firstName @client
      lastName @client
    }

  `,

 FETCH_RESTAURANTS: gql`
  {
    restaurants {
      _id
      name
      description
      location
      photo
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
        photo
        tacos {
          _id
          name
          photo
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
        photo
        restaurant {
          _id
          name
          location

        }
        tacoCheckin {
          _id
          name
          restaurant
          description
          rating
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
        photo
        tacoCheckin {
          _id
          name
          restaurant
          description
          rating
        }
      }
    }
  `
  
}

