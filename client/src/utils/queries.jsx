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
        treeFamily
        scientificName
        description
        price
        imageBonzai
        chapters {
          _id
          chapterIMG
          age
          chapterStage
          chapterDescription
        }
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
        treeFamily
        scientificName
        description
        price
        imageBonzai
        chapters {
          _id
          chapterIMG
          age
          chapterStage
          chapterDescription
        }
      }
    }
  }
`;

export const QUERY_PRODUCTS = gql`
  query allProducts {
    allProducts{
      _id
      productName
      productDescription
      category
      imageProduct
      price
      stock
    }
  }
`;

export const QUERY_BONZAI = gql`
  {
    allBonzai {
      _id
      userId
      title
      dateGrown
      treeFamily
      scientificName
      description
      price
      imageBonzai
      chapters {
        _id
        chapterIMG
        age
        chapterStage
        chapterDescription
      }
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
      treeFamily
      scientificName
      description
      price
      imageBonzai
      chapters {
        _id
        chapterIMG
        age
        chapterStage
        chapterDescription
      }
    }
  }
`;

export const QUERY_SINGLE_PRODUCT = gql`
  query singleProduct($productId: ID!) {
    singleProduct(productId: $productId) {
      _id
      productName
      productDescription
      category
      imageProduct
      price
      stock
    }
  }
`;
