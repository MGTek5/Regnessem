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
      lastMessage
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
      lastMessage
      members {
        _id
        profileGif
        username
      }
    }
  }
`;

const DELETE_CHAT = gql`
  mutation($chatId: String!) {
    deleteChat(id: $chatId) {
      _id
    }
  }
`;

const CHAT_CREATED = gql`
  subscription {
    chatCreated {
      _id
      name
      lastMessage
      members {
        _id
        username
        profileGif
      }
    }
  }
`;

const CHAT_DELETED = gql`
  subscription {
    chatDeleted {
      _id
    }
  }
`;

const GET_MESSAGES = gql`
  query ($chatId: String!) {
    getMessages(chatId: $chatId) {
      _id
      message
      height
      width
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
      width
      height
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

const UPDATE_USER = gql`
  mutation ($userUpdateData: UserUpdateInput!) {
    updateUser(userUpdateData: $userUpdateData) {
      _id
      username
      email
      profileGif
    }
  }
`;

export {
  REGISTER,
  LOGIN,
  GET_USERS,
  GET_CHATS,
  CREATE_CHAT,
  DELETE_CHAT,
  CHAT_CREATED,
  CHAT_DELETED,
  GET_MESSAGES,
  MESSAGE_CREATED,
  CREATE_MESSAGE,
  UPDATE_USER,
};
