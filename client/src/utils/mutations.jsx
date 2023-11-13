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

export const UPDATE_BONZAI = gql`
mutation updateBonzai($updateData: BonzaiInput!) {
  updateBonzai(updateData: $updateData) {
    github
    linkedin
    skills
  }
} 
`;

export const ADD_BONZAI = gql`
  mutation addBonzai($title: String!, $dateGrown: String!, $treeFamily: String, $scientificName: String, $description: String!, $price: String, $imageBonzai: String) {
    addBonzai(title: $title, dateGrown: $dateGrown, treeFamily: $treeFamily, scientificName: $scientificName, description: $description, price: $price, imageBonzai: $imageBonzai) {
      _id
      userId
      title
      treeFamily
      scientificName
      description
      price
      imageBonzai
    }
  }
`;

export const REMOVE_BONZAI = gql`
  mutation removeBonzai($bonzaiId: ID!) {
    removeBonzai(bonzaiId: $bonzaiId) {
      _id
      title
      dateGrown
      treeFamily
      scientificName
      description
      imageBonzai
      price
    }
  }  
`;