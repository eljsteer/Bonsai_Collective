////------------------------------------////
////------ GraphQL Apollo queries ------////
////------------------------------------////

import { gql } from '@apollo/client';

export const QUERY_ME =gql`
  query me {
    me {
      _id
      email 
      firstName
      lastName
      bio
      userBonsai {
        _id
        userId
        title
        dateGrown
        treeFamily
        scientificName
        description
        price
        imageBonsai
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
      bio
      userBonsai {
        _id
        userId
        title
        dateGrown
        treeFamily
        scientificName
        description
        price
        imageBonsai
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

export const QUERY_PRODUCTS_BY_IDS = gql`
  query cartProductsByIds($ids: [ID!]) {
    cartProductsByIds(ids: $ids) {
      _id
      productName
      price
    }
  }
`;

export const QUERY_BONSAI = gql`
  {
    allBonsai {
      _id
      userId
      title
      dateGrown
      treeFamily
      scientificName
      description
      price
      imageBonsai
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

export const QUERY_SINGLE_BONSAI = gql`
  query singleBonsai($bonsaiId: ID!) {
    singleBonsai(bonsaiId: $bonsaiId) {
      _id
      userId
      title
      dateGrown
      treeFamily
      scientificName
      description
      price
      imageBonsai
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
