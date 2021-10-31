import { gql } from '@apollo/client';

const LOGIN = gql`
  mutation($loginData: LoginInput!) {
    loginGodView(loginData: $loginData) {
      access_token
      user {
        email
        username
      }
    }
  }
`;

export { LOGIN };
