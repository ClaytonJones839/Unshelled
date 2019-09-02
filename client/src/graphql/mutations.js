import gql from "graphql-tag";

export default {
  LOGIN_USER: gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      _id
      loggedIn
    }
  }
`,
VERIFY_USER: gql`
  mutation VerifyUser($token: String!) {
    verifyUser(token: $token) {
      loggedIn
    }
  }
`,
 
REGISTER_USER: gql`
  mutation RegisterUser($username: String!, 
    $email: String!, 
    $password: String!,
    $firstName: String!,
    $lastName: String!) {
    register(username: $username, email: $email, password: $password
        firstName: $firstName, lastName: $lastName){
      token
      loggedIn
    }
  }
`,

NEW_TACO: gql`
  mutation NewTaco($name: String, $style: String, $price: Int, $description: String) {
    newTaco(name: $name, style: $style, price: $price, description: $description) {
      _id
      name
      style
      price
      description
    }
  }
`,

NEW_RESTAURANT: gql`
  mutation NewRestaurant($name: String, $description: String, $location: String) {
    newRestaurant(name: $name, description: $description, location: $location) {
      _id
      name
      description
      location
    }
  }
`


}