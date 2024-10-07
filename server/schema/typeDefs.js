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
    bonsaiImgUrl: String
    price: String!
    chapters: [Chapter!]!
    userId: String
  }

  type Chapter {
    chapterId: Int!,
    chapterIMG: [String!], 
    age: String!, 
    chapterStage: String!,
    chapterDescription: String!
  }

  input ChapterInput {
    chapterId: Int!,
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
    singleBonsai(bonsaiId: ID!): Bonsai
    allProducts: [Product]
    allBonsai: [Bonsai]
    cartProductsByIds(ids: [ID!]): [Product]
    me: User
  }

  type Mutation {
    createUser(email: String!, password: String!, firstName: String!, lastName: String!): Auth
    updateBio(updateBio: UserBioInput!): User
    updateUser(updateUserData: UserInput!): User
    updateUserEmail(updateUserEmail: UserEmailInput): User
    login(email: String!, password: String!): Auth
    addProduct(productName: String!, summary: String!, imageProduct: [String!], price: String!, stock: Int!): Product
    updateProductImageUrl(updateProductImgUrlData: [ProductImageInput!]!): [Product]
    removeProduct(_id: ID!): Product
    addBonsai(title: String!, treeFamily: String!, scientificName: String, description: String, imageBonsai: [String!], price: Float!, chapters: [ChapterInput!]): Bonsai
    updateBonsai(_id: ID!, updateBonsaiData: BonsaiInput!): Bonsai
    updateBonsaiImageUrl(updateBonsaiImgUrlData: [BonsaiImageInput!]!): [Bonsai]
    addChapter(addChapterData: ChapterInput!): Chapter
    removeBonsai(_id: ID!): Bonsai
  }
`;

module.exports = typeDefs