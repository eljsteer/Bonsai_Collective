const { GraphQLError } = require("graphql");
const { ApolloServerErrorCode } = require('@apollo/server/errors');
const { User, Product, Bonsai } = require("../models");
const { signToken } = require("../utils/authServer");
const { mongoose } = require("mongoose")


// ------------------------------------------------------------------------------------------------------


//// --------------------------------------------------------------------------------------------------------------////
//// ------ Apollo GraphQL Resolvers to hold all the functional API logic for database queries and mutations ------////
//// --------------------------------------------------------------------------------------------------------------////
const resolvers = {
  Query: {

////------ Query to return a single Product ------>>
//// --------------------------------------------->>
    singleProduct: async (parent, { productId }) => {
      if (!productId) {
        throw new GraphQLError("No product exists");
      }

      //--- Using "mongoose.Types.ObjectId.isValid" to check if the provided productId is a valid ObjectId --->>
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new GraphQLError( "Invalid productId");
      }

      return Product.findOne({ _id: productId });
    },


//// ------ Query to return all Products ------>>
//// ------------------------------------------>>
    allProducts: async () => {
      const productData = await Product.find();
      return productData;
    },


//// ------ Query to return product/s by their Id ------>>
//// --------------------------------------------------->>
    cartProductsByIds: async (_, { ids }) => {
      try {
        const products = await Product.find({ '_id': { $in: ids } });
        return products;
      } catch (error) {
        console.error(error);
        throw new Error('Error fetching products');
      }
    },


//// ------ Query to return a single Bonsai by Id ------>>
//// --------------------------------------------------->>
    singleBonsai: async (parent, { bonsaiId }) => {
      return Bonsai.findOne({ _id: bonsaiId });
    },


//// ------ Query to return all Bonsai ------>>
//// ---------------------------------------->>
    allBonsai: async () => {
      const bonsaiData = await Bonsai.find().sort({ createdAt: -1 });
      return bonsaiData;
    },


//// ------ Query to return a single User by their email ------>>
//// ---------------------------------------------------------->>
    user: async (parent, { email }) => {
      return User.findOne({ email }).populate('userBonsai');
    },


//// ------ Query to return the Logged in User's data ------>>
//// ------------------------------------------------------->>
    me: async (parent, args, context) => {
      console.log("Context Object:", context);
      try {
        //--- Checks to see if User exists, then return the user by their Id. and all the user's Bonsai --->>
        if (context.user) {
          console.log("Context User ID:", context.user._id);
          const user = await User.findOne({ _id: context.user._id }).populate('userBonsai');
          console.log("Found User:", user);
          return user;
        } else {
          throw new Error('You need to be logged in!');
        }
      //--- Throw errors if GraphQL encounters an error when logging in --->>
      } catch (error) {
        console.error("GraphQL Error:", error);
        console.error("GraphQL Error Details:", JSON.stringify(error, null, 2));
        throw error;
      }
    },
  },


  Mutation: {
//// ------ Mutation to create a new User ------>>
//// ------------------------------------------->>
    createUser: async (parent, args) => {
      try {
        const user = await User.create(args);
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error("User creation failed with error", error);

        if (error.code === 11000 && error.keyPattern.email) {
          throw new GraphQLError('Email already exists. Please use a different email.', {
            extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT }
          });
        } else {
          // Handle other types of errors
          throw new GraphQLError('User creation failed.', {
            extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR }
          });
        }
      }
    },

//// ------ Mutation to add a Bio to User ------>>
//// ---------------------------------------------------------->>
    updateBio: async (parent, { updateBio }, context) => {
      if (!context.user) {
        throw new GraphQLError('You must be logged in to perform this action', {
          extensions: {
            code: 'UNAUTHENTICATED',
          },
        });
      }
          const updatedUser = await User.findByIdAndUpdate(
              { _id: context.user._id },
              { $set: { ...updateBio } },
              { new: true }
          );
            console.log(updatedUser);
          return updatedUser;
      },

//// ------ Mutation to update a User with editable data ------>>
//// ---------------------------------------------------------->>
    updateUser: async (parent, { updateData }, context) => {
      if (!context.user) {
        throw new GraphQLError('You must be logged in to perform this action', {
          extensions: {
            code: 'UNAUTHENTICATED',
          },
        });
      }
          const updatedUser = await User.findByIdAndUpdate(
              { _id: context.user._id },
              { $set: { ...updateData } },
              { new: true }
          );
            console.log(updatedUser);
          return updatedUser;
      },

//// ------ Mutation to update a Users email ------>>
//// ---------------------------------------------->>
updateUserEmail: async (parent, { updateData }, context) => {
  if (!context.user) {
    throw new GraphQLError('You must be logged in to perform this action', {
      extensions: {
        code: 'UNAUTHENTICATED',
      },
    });
  }
      const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $set: { ...updateData } },
          { new: true }
      );
        console.log(updatedUser);
      return updatedUser;
  },

//// ------ Mutation to Login User ------>>
//// ------------------------------------>>
    login: async (parent, { email, password }, context) => {
      const user = await User.findOne({ email });

      //--- Function to check if there is both a User Email and password match or return an Authentication error --->>
      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError('Incorrect email or password. Please try again');
      }

        // if (user) {
        //   context.user = {
        //     _id: user._id,
        //     email: user.email
        //   }
        // }

      //--- Function to assign the Logged in User a JsonWebToken --->>
      const token = signToken(user);

      return { token, user };
    },


//// ------ Mutation to for a User to Add a Bonsai to their profile ------>>
//// --------------------------------------------------------------------->>
    addBonsai: async (parent, { title, treeFamily, scientificName, description, price }, context) => {
      //--- Function to check if User is logged in then to create bonsai and assign the User's Id ---//
      if (context.user) {
        const newBonsai = await Bonsai.create({
          title,
          treeFamily,
          scientificName, 
          description, 
          price,
          imageBonsai,
          userId : context.user._id
        });

        //--- Function to find the user and update their data with the newly created bonsai and assign a new Bonsai Id --->>
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { userBonsai: newBonsai._id } }
        );

        //--- Return newly created Bonsai after pushing it to userBonsai's array --->>
        return newBonsai;
      }
      throw new AuthenticationError('You must to be logged in!');
    },


//// ------ Mutation to Update the User's Bonsai's details ------>> 
//// ------------------------------------------------------------>>
    updateBonsai: async (parent, { updateBonsaiData }, context) => {
      //--- Function to check if User is logged in then to update bonsai and with the returned bonsai data to update --->>
      if (context.user) {
          const updatedBonsai = await Bonsai.findByIdAndUpdate(
              { _id: context.user._id },
              { $set: { userBonsai: updateBonsaiData } },
              { new: true }
          );

        //--- Return the newly updated bonsai following the update --->>
        return updatedBonsai;
      }
      throw new AuthenticationError('You must to be logged in!');
    }, 


//// ------ Mutation to delete a specific Bonsai for the logged in User ------>> 
//// ------------------------------------------------------------------------->>
    removeBonsai: async (parent, { bonsaiId }, context) => {
      //--- Function to check if User is logged in then to return the specific bonsai from it's Id --->>
      if (context.user) {
        const bonsai = await Bonsai.findOne(
          { _id: bonsaiId}
        );

        //--- Then, a function to throw an error if the Bonsai's Id is not stored under the logged in User's "userBonsai" --->>
        if (bonsai.userId != context.user._id) {
          throw new AuthenticationError('You can only remove your own Bonsai!');
        }

        //--- Then, a function to delete the bonsai attached to the specific bonsaiId --->>
        const deletedBonsai = await Bonsai.findOneAndDelete(
          { _id: bonsaiId}
        );

        //--- Lastly, a function to update the user with the removal of the Bonsai from their List --->>
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { userBonsai: { bonsaiId }}},
          { new: true }
        );
        //--- Return data of deleted Bonsai --->>
        return deletedBonsai;        
      }

      throw new AuthenticationError('You must to be logged in!');
    },
  },
};

module.exports = resolvers;
