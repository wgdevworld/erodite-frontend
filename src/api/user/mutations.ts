import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($email: String!, $firebaseUid: String!) {
    createUser(email: $email, firebaseUid: $firebaseUid) {
      id
      email
    }
  }
`;
