const { gql } = require("graphql-tag");

const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    bio: String
    userBonsai: [Bonsai]
  }

  type Product {
    _id: ID!
    productName: String!
    productDescription: String!
    category: String!
    imageProduct: [String!]!
    productImgUrl: String
    price: String!
    stock: Float!
  }

  type Bonsai {
    _id: ID!
    title: String
    dateGrown: String
    treeFamily: String!
    scientificName: String
    description: String!
    imageBonsai: [String!]
    price: String!
    chapters: [Chapter!]!
    userId: String
  }

  type Chapter {
    _id: ID!,
    chapterIMG: [String!], 
    age: String!, 
    chapterStage: String!,
    chapterDescription: String!
  }

  input ChapterInput {
    _id: ID!,
    chapterIMG: [String!], 
    age: String!, 
    chapterStage: String!,
    chapterDescription: String!
  }

  input UserBioInput {
    bio: String
  }

  input UserInput {
    firstName: String
    lastName: String
    bio: String
  }

  input UserEmailInput {
    email: String
  }

  input ProductImageInput {
    _id: ID!
    productImgUrl: String!
  }
  
  input BonsaiImageInput {
    _id: ID!
    bonsaiImgUrl: String!
  }

  input ProductInput {
    productName: String!
    productDescription: String!
    category: String!
    imageProduct: [String!]
    productImgUrl: String!
    price: String!
    stock: Float!
  }

  input BonsaiInput {
    title: String
    treeFamily: String!
    scientificName: String
    description: String!
    imageBonsai: [String!]
    price: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(email: String!): User
    singleProduct(productId: ID!): Product
    allProducts: [Product]
    cartProductsByIds(ids: [ID!]): [Product]
    singleBonsai(bonsaiId: ID!): Bonsai
    allBonsai: [Bonsai]
    me: User
  }

  type Mutation {
    createUser(email: String!, password: String!, firstName: String!, lastName: String!): Auth
    updateBio(updateBio: UserBioInput!): User
    updateUser(updateUserData: UserInput!): User
    updateUserEmail(updateUserEmail: UserEmailInput): User
    login(email: String!, password: String!): Auth
    addProduct(productName: String!, summary: String!, imageProduct: [String!], price: String!, stock: Int!): Product
    updateProductImgUrl(ProductImgUrl: String!): Product
    removeProduct(productId: ID!): Product
    addBonsai(title: String!, treeFamily: String!, scientificName: String, description: String, imageBonsai: [String!], price: Float!, chapters: [ChapterInput!]): Bonsai
    updateBonsai(bonsaiId: ID!, updateBonsaiData: BonsaiInput!): Bonsai
    updateBonsaiImageUrl(bonsaiId: ID!, updateBonsaiImgUrlData: BonsaiImageInput!): Bonsai
    removeBonsai(bonsaiId: ID!): Bonsai
  }
`;

module.exports = typeDefs