// >>------------------------>>
// GraphQl Mutation Functions
// >>------------------------>>

import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
    createUser(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const UPDATE_USER = gql`
mutation updateUser($updateData: UserInput!) {
  updateUser(updateData: $updateData) {
    bio
  }
} 
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const UPDATE_BONSAI = gql`
mutation updateBonsai($updateData: BonsaiInput!) {
  updateBonsai(updateData: $updateData) {
    chapters
  }
} 
`;

export const ADD_BONSAI = gql`
  mutation addBonsai($title: String!, $dateGrown: String!, $treeFamily: String, $scientificName: String, $description: String!, $price: String, $imageBonsai: String) {
    addBonsai(title: $title, dateGrown: $dateGrown, treeFamily: $treeFamily, scientificName: $scientificName, description: $description, price: $price, imageBonsai: $imageBonsai) {
      _id
      userId
      title
      treeFamily
      scientificName
      description
      price
      imageBonsai
    }
  }
`;

export const REMOVE_BONSAI = gql`
  mutation removeBonsai($bonsaiId: ID!) {
    removeBonsai(bonsaiId: $bonsaiId) {
      _id
      title
      dateGrown
      treeFamily
      scientificName
      description
      imageBonsai
      price
    }
  }  
`;