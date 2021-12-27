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

const CREATE_CHAT = gql`
  mutation ($chatCreateData: ChatCreateInput!) {
    createChat(chatCreateData: $chatCreateData) {
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

const CHAT_CREATED = gql`
  subscription {
    chatCreated {
      _id
      name
      members {
        _id
        username
        profileGif
      }
    }
  }
`;

const GET_MESSAGES = gql`
  query ($chatId: String!) {
    getMessages(chatId: $chatId) {
      _id
      message
      author {
        _id
        username
        profileGif
      }
    }
  }
`;

const MESSAGE_CREATED = gql`
  subscription {
    messageCreated {
      _id
      chat {
        _id
      }
      message
      author {
        _id
        username
        profileGif
      }
    }
  }
`;

const CREATE_MESSAGE = gql`
  mutation($messageCreateData: MessageCreateInput!) {
    createMessage(messageCreateData: $messageCreateData) {
      _id
    }
  }
`;

export {
  REGISTER,
  LOGIN,
  GET_USERS,
  GET_CHATS,
  CREATE_CHAT,
  CHAT_CREATED,
  GET_MESSAGES,
  MESSAGE_CREATED,
  CREATE_MESSAGE,
};
