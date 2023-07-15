import { gql } from '@apollo/client';



export const QUERY_USERS = gql`query GetAllUsers {
    getAllUsers {
      _id
      email
      password
    }
  }`