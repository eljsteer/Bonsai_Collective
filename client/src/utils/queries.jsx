// >>------------------------>>
// GraphQl Query Functions
// >>------------------------>>

import { gql } from '@apollo/client';

export const QUERY_ME =gql`
  query me {
    me {
      _id
      email 
      firstName
      lastName
      userBonzai {
        _id
        userId
        title
        dateGrown
        treeType
        scientificName
        description
        price
        imageBonzai
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($email: String!) {
    user(email: $email) {
      _id
      email 
      firstName
      lastName
      userBonzai {
        _id
        userId
        title
        dateGrown
        treeType
        scientificName
        description
        price
        imageBonzai
      }
    }
  }
`;

export const QUERY_BONZAI = gql`
  {
    userBonzai {
      _id
      userId
      title
      dateGrown
      treeType
      scientificName
      description
      price
      imageBonzai
    }
  }
`;

export const QUERY_SINGLE_BONZAI = gql`
  query singleBonzai($bonzaiId: ID!) {
    singleBonzai(bonzaiId: $bonzaiId) {
      _id
      userId
      title
      dateGrown
      treeType
      scientificName
      description
      price
      imageBonzai
    }
  }
`;
