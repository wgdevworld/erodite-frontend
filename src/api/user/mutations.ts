import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($email: String!, $firebaseUid: String!) {
    createUser(email: $email, firebaseUid: $firebaseUid) {
      id
      email
      createdAt
      updatedAt
    }
  }
`;

export const GET_OR_CREATE_USER_MUTATION = gql`
  mutation GetOrCreateUser($email: String!, $firebaseUid: String!) {
    getOrCreateUser(email: $email, firebaseUid: $firebaseUid) {
      id
      email
      createdAt
      updatedAt
    }
  }
`;
