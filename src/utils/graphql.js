import { gql } from '@apollo/client';

const LOGIN = gql`
  mutation ($loginData: LoginInput!) {
    login(loginData: $loginData) {
      access_token
      user {
        _id
        email
        username
      }
    }
  }
`;

const REGISTER = gql`
  mutation($registerData: RegisterInput!) {
      register(registerData: $registerData) {
          access_token
          user {
              _id
              email
              username
          }
      }
  }
`;

export { REGISTER, LOGIN };
