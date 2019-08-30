import gql from "graphql-tag";

export const FETCH_TACOS = gql`
  {
    tacos {
      _id
      name
    }
  }
`;
