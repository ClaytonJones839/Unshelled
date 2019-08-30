import gql from "graphql-tag";

export default {
  LOGIN_USER: gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
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
}