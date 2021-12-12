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

const GET_USERS = gql`
  query {
    getUsers {
      _id
      username
      profileGif
    }
  }
`;

const GET_CHATS = gql`
  query {
    getChats {
      _id
      name
      members {
        _id
        profileGif
        username
      }
    }
  }
`;

export {
  REGISTER,
  LOGIN,
  GET_USERS,
  GET_CHATS,
};
