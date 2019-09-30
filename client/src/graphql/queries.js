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
          taco {
            _id
          }
          description
          rating
        }
      }
    }
  `,

  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
      _id @client
      photo @client
      firstName @client
      lastName @client
      username @client
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
        reviews {
          _id
          body
          rating
          user {
            _id
            firstName
            lastName
          }
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
        facebookLink
        instagramLink
        twitterLink
        homepageLink
        destinationLink
        photo
        tacos {
          _id
          name
          photo
        }
        reviews {
          _id
          body
          rating
          user {
            _id
            firstName
            lastName
          }
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
          taco {
            _id
            photo
          }
          user {
            _id
            photo
            tacoCheckin {
              _id
            }
          }
          description
          rating
        }
      }
    }
  `,

  FETCH_REVIEW: gql`
    query fetchReview($id: ID!) {
      review(_id: $id) {
        _id
        body
        rating
        restaurant {
          _id
          name
        }
        user {
          _id
          firstName
          lastName
        }
      }
    }
  `,

  FETCH_REVIEWS: gql`
    {
      reviews {
        _id
        body
        rating
        restaurant {
          _id
          name
        }
        user {
          _id
          firstName
          lastName
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
          taco {
            _id
            name
            restaurant {
              _id
              name
            }
          }
          description
          rating
        }
      }
    }
  `

  // ALL_TACOS_SEARCH: gql`
  // query search($search: String!) {
  //   tacos()
  // }
};

