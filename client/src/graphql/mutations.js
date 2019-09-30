import gql from "graphql-tag";

export default {
  LOGIN_USER: gql`
    mutation LoginUser($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        _id
        isLoggedIn
        photo
        firstName
        lastName
        username
      }
    }
  `,
  VERIFY_USER: gql`
    mutation VerifyUser($token: String!) {
      verifyUser(token: $token) {
        _id
        isLoggedIn
        firstName
        lastName
        photo
        username
      }
    }
  `,

  REGISTER_USER: gql`
    mutation RegisterUser(
      $username: String!
      $email: String!
      $password: String!
      $firstName: String!
      $lastName: String!
      $photo: String!
    ) {
      register(
        username: $username
        email: $email
        password: $password
        firstName: $firstName
        lastName: $lastName
        photo: $photo
      ) {
        token
        isLoggedIn
        _id
        photo
        username
        firstName
        lastName
        email
      }
    }
  `,

  NEW_TACO: gql`
    mutation NewTaco(
      $name: String
      $style: String
      $price: Int
      $photo: String
      $description: String
      $restaurantId: ID
    ) {
      newTaco(
        name: $name
        style: $style
        photo: $photo
        price: $price
        description: $description
        restaurantId: $restaurantId
      ) {
        _id
        name
        style
        price
        description
        restaurant {
          _id
          name
        }
      }
    }
  `,

  NEW_REVIEW: gql`
    mutation NewReview($body: String, $rating: Int, $restaurantId: ID, $userId: ID) {
      newReview(body: $body, rating: $rating, restaurantId: $restaurantId, userId: $userId) {
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
  UPDATE_REST_TACOS: gql`
    mutation UpdateRestTacos($restaurantId: ID!, $tacoId: ID!) {
      updateTacoRestaurant(restaurantId: $restaurantId, tacoId: $tacoId) {
        _id
        restaurant {
          name
          _id
        }
      }
    }
  `,
  NEW_RESTAURANT: gql`
    mutation NewRestaurant(
      $name: String
      $description: String
      $location: String
    ) {
      newRestaurant(
        name: $name
        description: $description
        location: $location
      ) {
        _id
        name
        description
        location
      }
    }
  `,

  NEW_TACO_CHECKIN: gql`
    mutation NewTacoCheckin(
      $name: String
      $description: String
      $rating: Int
      $tacoId: ID
      $userId: ID
    ) {
      newTacoCheckin(
        name: $name
        description: $description
        rating: $rating
        tacoId: $tacoId
        userId: $userId
      ) {
        _id
        name
        description
        rating
        taco {
          _id
        }
        user {
          _id
        }
      }
    }
  `
};
