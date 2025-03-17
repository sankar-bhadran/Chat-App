import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(createUserInput: $input) {
      id
      username
      email
    }
  }
`;

export const LOGIN = gql`
  mutation LoginUser($loginInput: LoginDTO!) {
    login(loginInput: $loginInput) {
      status
      message
      user {
        id
        email
        username
      }
    }
  }
`;

export const GET_ALL_USERS_EXCEPT_CURRENT = gql`
  query GetAllUsersExceptCurrent($userId: String!) {
    getAllUsersExceptCurrent(userId: $userId) {
      id
      username
      email
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($createMessageInput: CreateMessageInput!) {
    sendMessage(createMessageInput: $createMessageInput) {
      text
      senderId
      receiverId
    }
  }
`;

export const GET_MESSAGES_BETWEEN_USERS = gql`
  query GetMessagesBetweenUsers($userId: String!, $receiverId: String!) {
    getMessagesBetweenUsers(userId: $userId, receiverId: $receiverId) {
      _id
      senderId
      receiverId
      text
    }
  }
`;

export const SUMMARIZE_TEXT = gql`
  mutation summarizeText($text: String!) {
    summarizeText(text: $text)
  }
`;
export const CORRECT_GRAMMAR = gql`
  mutation correctGrammar($text: String!) {
    correctGrammar(text: $text)
  }
`;
